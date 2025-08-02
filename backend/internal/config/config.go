package config

import (
	"os"
	"strconv"
)

// Config holds all configuration for the application
type Config struct {
	Environment     string
	ServerPort      string
	DatabaseURL     string
	RedisURL        string
	JWTSecret       string
	OpenAIAPIKey    string
	NewsAPIKey      string
	SupabaseURL     string
	SupabaseKey     string
	GoogleAnalytics string
	AllowedOrigins  []string
}

// Load loads configuration from environment variables
func Load() *Config {
	return &Config{
		Environment:     getEnv("ENVIRONMENT", "development"),
		ServerPort:      getEnv("PORT", "8080"),
		DatabaseURL:     getEnv("DATABASE_URL", "postgres://postgres:123@localhost:5432/pajakdb?sslmode=disable"),
		RedisURL:        getEnv("REDIS_URL", "localhost:6379"),
		JWTSecret:       getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
		OpenAIAPIKey:    getEnv("OPENAI_API_KEY", ""),
		NewsAPIKey:      getEnv("NEWS_API_KEY", ""),
		SupabaseURL:     getEnv("SUPABASE_URL", ""),
		SupabaseKey:     getEnv("SUPABASE_KEY", ""),
		GoogleAnalytics: getEnv("GOOGLE_ANALYTICS_ID", ""),
		AllowedOrigins:  getEnvSlice("ALLOWED_ORIGINS", []string{"http://localhost:3000", "http://localhost:5173"}),
	}
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvSlice gets an environment variable as a slice or returns default values
func getEnvSlice(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		// Simple comma-separated values for now
		// In production, you might want more sophisticated parsing
		return []string{value}
	}
	return defaultValue
}

// getEnvInt gets an environment variable as integer or returns a default value
func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

// IsDevelopment returns true if the environment is development
func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

// IsProduction returns true if the environment is production
func (c *Config) IsProduction() bool {
	return c.Environment == "production"
}
