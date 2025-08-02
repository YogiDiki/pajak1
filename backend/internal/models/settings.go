package models

import (
	"time"

	"gorm.io/gorm"
)

// SiteSettings represents global site settings
type SiteSettings struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	SiteName    string         `json:"site_name" gorm:"not null"`
	Tagline     string         `json:"tagline" gorm:"type:text"`
	Description string         `json:"description" gorm:"type:text"`
	Logo        string         `json:"logo"`
	Favicon     string         `json:"favicon"`
	Address     string         `json:"address"`
	Phone       string         `json:"phone"`
	Email       string         `json:"email"`
	Website     string         `json:"website"`
	Facebook    string         `json:"facebook"`
	Twitter     string         `json:"twitter"`
	Instagram   string         `json:"instagram"`
	LinkedIn    string         `json:"linkedin"`
	YouTube     string         `json:"youtube"`
	PrimaryColor string        `json:"primary_color"`
	SecondaryColor string      `json:"secondary_color"`
	GoogleAnalyticsID string   `json:"google_analytics_id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

// Advertisement represents advertisement slots
type Advertisement struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Title       string         `json:"title" gorm:"not null"`
	Description string         `json:"description"`
	ImageURL    string         `json:"image_url"`
	LinkURL     string         `json:"link_url"`
	Position    string         `json:"position" gorm:"not null"` // header, sidebar, footer, content
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	StartDate   time.Time      `json:"start_date"`
	EndDate     time.Time      `json:"end_date"`
	ClickCount  int            `json:"click_count" gorm:"default:0"`
	ViewCount   int            `json:"view_count" gorm:"default:0"`
	Advertiser  string         `json:"advertiser"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

// TableName specifies the table name for SiteSettings
func (SiteSettings) TableName() string {
	return "site_settings"
}

// TableName specifies the table name for Advertisement
func (Advertisement) TableName() string {
	return "advertisements"
} 