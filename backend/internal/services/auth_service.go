package services

import (
	"errors"
	"fmt"
	"time"

	"taxonomy-hub/internal/config"
	"taxonomy-hub/internal/models"

	"github.com/golang-jwt/jwt/v5"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	db    *gorm.DB
	redis *redis.Client
	cfg   *config.Config
}

func NewAuthService(db *gorm.DB, redis *redis.Client, cfg *config.Config) *AuthService {
	return &AuthService{
		db:    db,
		redis: redis,
		cfg:   cfg,
	}
}

func (s *AuthService) Register(email, password, name string) (*models.User, error) {
	// Check if user already exists
	var existingUser models.User
	if err := s.db.Where("email = ?", email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Create user
	user := &models.User{
		Email:    email,
		Password: string(hashedPassword),
		Name:     name,
		RoleID:   2, // Default role (user)
		IsActive: true,
	}

	if err := s.db.Create(user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthService) Login(email, password string) (string, error) {
	var user models.User
	if err := s.db.Where("email = ?", email).First(&user).Error; err != nil {
		return "", errors.New("invalid credentials")
	}

	// Debug: Print user info
	fmt.Printf("Found user: %+v\n", user)

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		fmt.Printf("Password comparison failed: %v\n", err)
		return "", errors.New("invalid credentials")
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"role_id": user.RoleID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(s.cfg.JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *AuthService) ValidateToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.cfg.JWTSecret), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}
