package models

import (
	"time"

	"gorm.io/gorm"
)

// Article represents a news article or blog post
type Article struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	Title           string         `json:"title" gorm:"not null"`
	Slug            string         `json:"slug" gorm:"uniqueIndex;not null"`
	Content         string         `json:"content" gorm:"type:text;not null"`
	Excerpt         string         `json:"excerpt" gorm:"type:text"`
	FeaturedImage   string         `json:"featured_image"`
	Status          string         `json:"status" gorm:"default:'draft'"` // draft, published, archived
	PublishedAt     *time.Time     `json:"published_at"`
	ViewCount       int            `json:"view_count" gorm:"default:0"`
	IsFeatured      bool           `json:"is_featured" gorm:"default:false"`
	MetaTitle       string         `json:"meta_title"`
	MetaDescription string         `json:"meta_description"`
	AuthorID        uint           `json:"author_id"`
	CategoryID      uint           `json:"category_id"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Author    User       `json:"author" gorm:"foreignKey:AuthorID"`
	// Category  Category   `json:"category" gorm:"foreignKey:CategoryID"`
	// Tags      []Tag      `json:"tags,omitempty" gorm:"many2many:article_tags;"`
	// Comments  []Comment  `json:"comments,omitempty" gorm:"foreignKey:ArticleID"`
}

// Category represents article categories
type Category struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"not null"`
	Slug        string         `json:"slug" gorm:"uniqueIndex;not null"`
	Description string         `json:"description"`
	Image       string         `json:"image"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Articles []Article `json:"articles,omitempty" gorm:"foreignKey:CategoryID"`
}

// Tag represents article tags
type Tag struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Name      string         `json:"name" gorm:"not null"`
	Slug      string         `json:"slug" gorm:"uniqueIndex;not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Articles []Article `json:"articles,omitempty" gorm:"many2many:article_tags;"`
}

// Comment represents article comments
type Comment struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Content    string         `json:"content" gorm:"type:text;not null"`
	IsApproved bool           `json:"is_approved" gorm:"default:false"`
	UserID     uint           `json:"user_id"`
	ArticleID  uint           `json:"article_id"`
	ParentID   *uint          `json:"parent_id"` // For nested comments
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// User    User      `json:"user" gorm:"foreignKey:UserID"`
	// Article Article   `json:"article" gorm:"foreignKey:ArticleID"`
	// Parent  *Comment  `json:"parent,omitempty" gorm:"foreignKey:ParentID"`
	// Replies []Comment `json:"replies,omitempty" gorm:"foreignKey:ParentID"`
}

// TableName specifies the table name for Article
func (Article) TableName() string {
	return "articles"
}

// TableName specifies the table name for Category
func (Category) TableName() string {
	return "categories"
}

// TableName specifies the table name for Tag
func (Tag) TableName() string {
	return "tags"
}

// TableName specifies the table name for Comment
func (Comment) TableName() string {
	return "comments"
}
