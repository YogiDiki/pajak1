package services

import (
	"taxonomy-hub/internal/config"

	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

// Services holds all service instances
type Services struct {
	DB           *gorm.DB
	Redis        *redis.Client
	Config       *config.Config
	AuthService  *AuthService
	UserService  *UserService
	ArticleService *ArticleService
	ChatService  *ChatService
	FileService  *FileService
}

// NewServices creates and returns all service instances
func NewServices(db *gorm.DB, redis *redis.Client, cfg *config.Config) *Services {
	authService := NewAuthService(db, redis, cfg)
	userService := NewUserService(db)
	articleService := NewArticleService(db)
	chatService := NewChatService(db, cfg)
	fileService := NewFileService(cfg)

	return &Services{
		DB:           db,
		Redis:        redis,
		Config:       cfg,
		AuthService:  authService,
		UserService:  userService,
		ArticleService: articleService,
		ChatService:  chatService,
		FileService:  fileService,
	}
} 