package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"taxonomy-hub/internal/config"
	"taxonomy-hub/internal/models"

	"github.com/redis/go-redis/v9"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// InitDB initializes the database connection
func InitDB(cfg *config.Config) (*gorm.DB, error) {
	// Configure GORM logger
	gormLogger := logger.Default
	if cfg.IsDevelopment() {
		gormLogger = logger.Default.LogMode(logger.Info)
	}

	// Open database connection
	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{
		Logger: gormLogger,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Get underlying sql.DB object
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get sql.DB: %w", err)
	}

	// Configure connection pool
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	// Test connection
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("✅ Database connected successfully")

	// Auto migrate models
	if err := autoMigrate(db); err != nil {
		return nil, fmt.Errorf("failed to auto migrate: %w", err)
	}

	return db, nil
}

// InitRedis initializes the Redis connection
func InitRedis(cfg *config.Config) (*redis.Client, error) {
	// Parse Redis URL (simple implementation)
	// In production, you might want to use a proper URL parser
	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.RedisURL,
		Password: "", // Add password if needed
		DB:       0,  // Use default DB
	})

	// Test connection
	ctx := context.Background()
	if err := redisClient.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect to Redis: %w", err)
	}

	log.Println("✅ Redis connected successfully")
	return redisClient, nil
}

// autoMigrate runs database migrations
func autoMigrate(db *gorm.DB) error {
	log.Println("🔄 Running database migrations...")

	// Add your models here (order matters for foreign keys)
	models := []interface{}{
		&models.Role{},
		&models.Permission{},
		&models.User{},
		&models.Category{},
		&models.Article{},
		&models.Tag{},
		&models.Comment{},
		&models.Ebook{},
		&models.Video{},
		&models.Rating{},
		&models.ChatSession{},
		&models.ChatMessage{},
		&models.Advertisement{},
		&models.SiteSettings{},
	}

	for _, model := range models {
		if err := db.AutoMigrate(model); err != nil {
			return fmt.Errorf("failed to migrate %T: %w", model, err)
		}
	}

	log.Println("✅ Database migrations completed")

	// Seed default data
	if err := seedDefaultData(db); err != nil {
		return fmt.Errorf("failed to seed default data: %w", err)
	}

	return nil
}

// seedDefaultData seeds the database with default roles and admin user
func seedDefaultData(db *gorm.DB) error {
	log.Println("🌱 Seeding default data...")

	// Create default roles
	roles := []models.Role{
		{Name: "admin", Description: "Administrator dengan akses penuh"},
		{Name: "user", Description: "User biasa"},
		{Name: "moderator", Description: "Moderator dengan akses terbatas"},
	}

	for _, role := range roles {
		if err := db.Where("name = ?", role.Name).FirstOrCreate(&role).Error; err != nil {
			return fmt.Errorf("failed to create role %s: %w", role.Name, err)
		}
	}

	// Create admin user if not exists
	adminPassword := "$2a$10$4yJWcTX5Pvp4USMibScu1./52Ms5ZiuGKA/28lePLT7CpA3tl7kyW" // admin123
	adminUser := models.User{
		Email:    "admin@pajakhub.com",
		Password: adminPassword,
		Name:     "Administrator",
		IsActive: true,
		RoleID:   1, // admin role
	}

	if err := db.Where("email = ?", adminUser.Email).FirstOrCreate(&adminUser).Error; err != nil {
		return fmt.Errorf("failed to create admin user: %w", err)
	}

	log.Println("✅ Default data seeded successfully")
	return nil
}

// CloseDB closes the database connection
func CloseDB(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}

// CloseRedis closes the Redis connection
func CloseRedis(client *redis.Client) error {
	return client.Close()
}
