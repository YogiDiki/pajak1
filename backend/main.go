package main

import (
	"log"
	"os"

	"taxonomy-hub/internal/config"
	"taxonomy-hub/internal/database"
	"taxonomy-hub/internal/middleware"
	"taxonomy-hub/internal/routes"
	"taxonomy-hub/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Initialize configuration
	cfg := config.Load()

	// Set Gin mode
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize database
	db, err := database.InitDB(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize Redis (optional for development)
	var redisClient *redis.Client
	if cfg.RedisURL != "" && cfg.RedisURL != "localhost:6379" {
		redisClient, err = database.InitRedis(cfg)
		if err != nil {
			log.Println("⚠️  Redis connection failed, continuing without Redis:", err)
		}
	} else {
		log.Println("ℹ️  Skipping Redis connection for development")
	}

	// Initialize services
	services := services.NewServices(db, redisClient, cfg)

	// Create Gin router
	router := gin.Default()

	// Add middleware
	middleware.SetupMiddleware(router, cfg)

	// Setup routes
	routes.SetupRoutes(router, services, cfg)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📊 Environment: %s", cfg.Environment)
	log.Printf("🔗 API Base URL: http://localhost:%s/api", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
