package middleware

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"taxonomy-hub/internal/config"

	"github.com/gin-gonic/gin"
)

// SetupMiddleware configures all middleware for the application
func SetupMiddleware(router *gin.Engine, cfg *config.Config) {
	// CORS middleware
	router.Use(corsMiddleware(cfg))

	// Logger middleware
	router.Use(loggerMiddleware())

	// Recovery middleware (already included in gin.Default())
	// router.Use(gin.Recovery())

	// Rate limiting middleware
	router.Use(rateLimitMiddleware())

	log.Println("✅ Middleware configured successfully")
}

// corsMiddleware handles CORS
func corsMiddleware(cfg *config.Config) gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		
		// Check if origin is allowed
		allowed := false
		for _, allowedOrigin := range cfg.AllowedOrigins {
			if origin == allowedOrigin {
				allowed = true
				break
			}
		}

		if allowed {
			c.Header("Access-Control-Allow-Origin", origin)
		}

		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})
}

// loggerMiddleware logs HTTP requests
func loggerMiddleware() gin.HandlerFunc {
	return gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
			param.ClientIP,
			param.TimeStamp.Format(time.RFC1123),
			param.Method,
			param.Path,
			param.Request.Proto,
			param.StatusCode,
			param.Latency,
			param.Request.UserAgent(),
			param.ErrorMessage,
		)
	})
}

// rateLimitMiddleware implements basic rate limiting
func rateLimitMiddleware() gin.HandlerFunc {
	// Simple in-memory rate limiting
	// In production, use Redis for distributed rate limiting
	clients := make(map[string][]time.Time)
	
	return gin.HandlerFunc(func(c *gin.Context) {
		clientIP := c.ClientIP()
		now := time.Now()
		
		// Clean old requests (older than 1 minute)
		if times, exists := clients[clientIP]; exists {
			var validTimes []time.Time
			for _, t := range times {
				if now.Sub(t) < time.Minute {
					validTimes = append(validTimes, t)
				}
			}
			clients[clientIP] = validTimes
		}
		
		// Check rate limit (100 requests per minute)
		if len(clients[clientIP]) >= 100 {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Rate limit exceeded. Please try again later.",
			})
			c.Abort()
			return
		}
		
		// Add current request
		clients[clientIP] = append(clients[clientIP], now)
		
		c.Next()
	})
}

// AuthMiddleware checks if user is authenticated
func AuthMiddleware() gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization header required",
			})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix if present
		if len(token) > 7 && token[:7] == "Bearer " {
			token = token[7:]
		}

		// TODO: Implement JWT token validation
		// For now, just check if token exists
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
			return
		}

		// Set user info in context
		// c.Set("user_id", userID)
		// c.Set("user_role", userRole)

		c.Next()
	})
}

// RoleMiddleware checks if user has required role
func RoleMiddleware(requiredRoles ...string) gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		// TODO: Implement role checking
		// userRole := c.GetString("user_role")
		// 
		// hasRole := false
		// for _, role := range requiredRoles {
		//     if userRole == role {
		//         hasRole = true
		//         break
		//     }
		// }
		// 
		// if !hasRole {
		//     c.JSON(http.StatusForbidden, gin.H{
		//         "error": "Insufficient permissions",
		//     })
		//     c.Abort()
		//     return
		// }

		c.Next()
	})
} 