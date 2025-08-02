package models

import (
	"time"

	"gorm.io/gorm"
)

// Ebook represents downloadable e-books and documents
type Ebook struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	Title         string         `json:"title" gorm:"not null"`
	Slug          string         `json:"slug" gorm:"uniqueIndex;not null"`
	Description   string         `json:"description" gorm:"type:text"`
	FileURL       string         `json:"file_url" gorm:"not null"`
	FileSize      int64          `json:"file_size"` // in bytes
	FileType      string         `json:"file_type"` // pdf, doc, docx, etc.
	Thumbnail     string         `json:"thumbnail"`
	DownloadCount int            `json:"download_count" gorm:"default:0"`
	IsActive      bool           `json:"is_active" gorm:"default:true"`
	CategoryID    uint           `json:"category_id"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Category Category `json:"category" gorm:"foreignKey:CategoryID"`
	// Ratings  []Rating `json:"ratings,omitempty" gorm:"foreignKey:EbookID"`
}

// Video represents educational videos
type Video struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title" gorm:"not null"`
	Slug        string         `json:"slug" gorm:"uniqueIndex;not null"`
	Description string         `json:"description" gorm:"type:text"`
	VideoURL    string         `json:"video_url" gorm:"not null"` // YouTube URL or direct link
	Thumbnail   string         `json:"thumbnail"`
	Duration    int            `json:"duration"` // in seconds
	ViewCount   int            `json:"view_count" gorm:"default:0"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	CategoryID  uint           `json:"category_id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Category Category `json:"category" gorm:"foreignKey:CategoryID"`
	// Ratings  []Rating `json:"ratings,omitempty" gorm:"foreignKey:VideoID"`
}

// Rating represents user ratings for ebooks and videos
type Rating struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Rating    int            `json:"rating" gorm:"not null"` // 1-5 stars
	Comment   string         `json:"comment" gorm:"type:text"`
	UserID    uint           `json:"user_id"`
	EbookID   *uint          `json:"ebook_id"`
	VideoID   *uint          `json:"video_id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// User  User   `json:"user" gorm:"foreignKey:UserID"`
	// Ebook *Ebook `json:"ebook,omitempty" gorm:"foreignKey:EbookID"`
	// Video *Video `json:"video,omitempty" gorm:"foreignKey:VideoID"`
}

// TableName specifies the table name for Ebook
func (Ebook) TableName() string {
	return "ebooks"
}

// TableName specifies the table name for Video
func (Video) TableName() string {
	return "videos"
}

// TableName specifies the table name for Rating
func (Rating) TableName() string {
	return "ratings"
}
