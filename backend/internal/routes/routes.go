package routes

import (
	"taxonomy-hub/internal/config"
	"taxonomy-hub/internal/handlers"
	"taxonomy-hub/internal/middleware"
	"taxonomy-hub/internal/services"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all routes for the application
func SetupRoutes(router *gin.Engine, services *services.Services, cfg *config.Config) {
	// Add services to context middleware
	router.Use(func(c *gin.Context) {
		c.Set("services", services)
		c.Next()
	})

	// API group
	api := router.Group("/api")
	{
		// Health check
		api.GET("/health", handlers.HealthCheck)

		// Public routes
		public := api.Group("")
		{
			// Auth routes
			auth := public.Group("/auth")
			{
				auth.POST("/register", handlers.Register)
				auth.POST("/login", handlers.Login)
				auth.POST("/logout", handlers.Logout)
				auth.POST("/refresh", handlers.RefreshToken)
			}

			// Public content routes
			articles := public.Group("/articles")
			{
				articles.GET("", handlers.GetArticles)
				articles.GET("/:slug", handlers.GetArticleBySlug)
				articles.GET("/category/:slug", handlers.GetArticlesByCategory)
				articles.GET("/tag/:slug", handlers.GetArticlesByTag)
			}

			categories := public.Group("/categories")
			{
				categories.GET("", handlers.GetCategories)
				categories.GET("/:slug", handlers.GetCategoryBySlug)
			}

			tags := public.Group("/tags")
			{
				tags.GET("", handlers.GetTags)
				tags.GET("/:slug", handlers.GetTagBySlug)
			}

			// Education routes
			education := public.Group("/education")
			{
				education.GET("/ebooks", handlers.GetEbooks)
				education.GET("/ebooks/:slug", handlers.GetEbookBySlug)
				education.GET("/videos", handlers.GetVideos)
				education.GET("/videos/:slug", handlers.GetVideoBySlug)
			}

			// Site settings
			public.GET("/settings", handlers.GetSiteSettings)
			public.GET("/advertisements", handlers.GetAdvertisements)

			// Chat routes (public for now, will be protected later)
			chat := public.Group("/chat")
			{
				chat.POST("/sessions", handlers.CreateChatSession)
				chat.POST("/sessions/:sessionID/messages", handlers.SendChatMessage)
				chat.GET("/sessions/:sessionID/messages", handlers.GetChatMessages)
			}

			// AI Assistant routes (enhanced)
			ai := api.Group("/ai")
			{
				ai.GET("/capabilities", handlers.GetAICapabilities)
				ai.POST("/query", handlers.AIQuery)
				ai.POST("/analyze", handlers.AIAnalyze)
				ai.GET("/suggestions", handlers.GetAISuggestions)
				ai.POST("/learn", handlers.AILearningPath)
			}
		}

		// Protected routes (require authentication)
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// User profile
			profile := protected.Group("/profile")
			{
				profile.GET("", handlers.GetProfile)
				profile.PUT("", handlers.UpdateProfile)
				profile.PUT("/password", handlers.ChangePassword)
			}

			// User comments
			comments := protected.Group("/comments")
			{
				comments.POST("", handlers.CreateComment)
				comments.PUT("/:id", handlers.UpdateComment)
				comments.DELETE("/:id", handlers.DeleteComment)
			}

			// User ratings
			ratings := protected.Group("/ratings")
			{
				ratings.POST("/ebooks/:id", handlers.RateEbook)
				ratings.POST("/videos/:id", handlers.RateVideo)
			}

			// User chat sessions
			userChat := protected.Group("/user/chat")
			{
				userChat.GET("/sessions", handlers.GetUserChatSessions)
				userChat.DELETE("/sessions/:sessionID", handlers.DeleteChatSession)
			}
		}

		// Admin routes (require admin role)
		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware(), middleware.RoleMiddleware("admin", "super_admin"))
		{
			// User management
			users := admin.Group("/users")
			{
				users.GET("", handlers.GetUsers)
				users.GET("/:id", handlers.GetUser)
				users.POST("", handlers.CreateUser)
				users.PUT("/:id", handlers.UpdateUser)
				users.DELETE("/:id", handlers.DeleteUser)
			}

			// Article management
			adminArticles := admin.Group("/articles")
			{
				adminArticles.POST("", handlers.CreateArticle)
				adminArticles.PUT("/:id", handlers.UpdateArticle)
				adminArticles.DELETE("/:id", handlers.DeleteArticle)
				adminArticles.PUT("/:id/status", handlers.UpdateArticleStatus)
			}

			// Category management
			adminCategories := admin.Group("/categories")
			{
				adminCategories.POST("", handlers.CreateCategory)
				adminCategories.PUT("/:id", handlers.UpdateCategory)
				adminCategories.DELETE("/:id", handlers.DeleteCategory)
			}

			// Tag management
			adminTags := admin.Group("/tags")
			{
				adminTags.POST("", handlers.CreateTag)
				adminTags.PUT("/:id", handlers.UpdateTag)
				adminTags.DELETE("/:id", handlers.DeleteTag)
			}

			// Education management
			adminEducation := admin.Group("/education")
			{
				adminEducation.POST("/ebooks", handlers.CreateEbook)
				adminEducation.PUT("/ebooks/:id", handlers.UpdateEbook)
				adminEducation.DELETE("/ebooks/:id", handlers.DeleteEbook)

				adminEducation.POST("/videos", handlers.CreateVideo)
				adminEducation.PUT("/videos/:id", handlers.UpdateVideo)
				adminEducation.DELETE("/videos/:id", handlers.DeleteVideo)
			}

			// Advertisement management
			ads := admin.Group("/advertisements")
			{
				ads.POST("", handlers.CreateAdvertisement)
				ads.PUT("/:id", handlers.UpdateAdvertisement)
				ads.DELETE("/:id", handlers.DeleteAdvertisement)
			}

			// Site settings management
			admin.PUT("/settings", handlers.UpdateSiteSettings)

			// Analytics
			analytics := admin.Group("/analytics")
			{
				analytics.GET("/articles", handlers.GetArticleAnalytics)
				analytics.GET("/users", handlers.GetUserAnalytics)
				analytics.GET("/education", handlers.GetEducationAnalytics)
			}
		}

		// Super admin routes (require super admin role)
		superAdmin := api.Group("/super-admin")
		superAdmin.Use(middleware.AuthMiddleware(), middleware.RoleMiddleware("super_admin"))
		{
			// Role management
			roles := superAdmin.Group("/roles")
			{
				roles.GET("", handlers.GetRoles)
				roles.POST("", handlers.CreateRole)
				roles.PUT("/:id", handlers.UpdateRole)
				roles.DELETE("/:id", handlers.DeleteRole)
			}

			// Permission management
			permissions := superAdmin.Group("/permissions")
			{
				permissions.GET("", handlers.GetPermissions)
				permissions.POST("", handlers.CreatePermission)
				permissions.PUT("/:id", handlers.UpdatePermission)
				permissions.DELETE("/:id", handlers.DeletePermission)
			}

			// System management
			superAdmin.GET("/system/status", handlers.GetSystemStatus)
			superAdmin.POST("/system/backup", handlers.CreateBackup)
		}
	}

	// Serve static files (for uploaded content)
	router.Static("/uploads", "./uploads")

	// Root handler
	router.GET("/", handlers.RootHandler)

	// API Documentation
	router.GET("/docs", handlers.APIDocumentation)

	// Handle 404
	router.NoRoute(handlers.NotFound)
}
