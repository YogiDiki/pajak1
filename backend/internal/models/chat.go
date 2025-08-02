package models

import (
	"time"

	"gorm.io/gorm"
)

// ChatSession represents a chat session between user and AI
type ChatSession struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	SessionID string         `json:"session_id" gorm:"uniqueIndex;not null"`
	UserID    uint           `json:"user_id"`
	Title     string         `json:"title"` // Auto-generated from first message
	IsActive  bool           `json:"is_active" gorm:"default:true"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// User     User          `json:"user,omitempty" gorm:"foreignKey:UserID"`
	// Messages []ChatMessage `json:"messages,omitempty" gorm:"foreignKey:SessionID;references:SessionID"`
}

// ChatMessage represents individual messages in a chat session
type ChatMessage struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	SessionID string         `json:"session_id" gorm:"not null"`
	Role      string         `json:"role" gorm:"not null"` // user, assistant, system
	Content   string         `json:"content" gorm:"type:text;not null"`
	Tokens    int            `json:"tokens"` // Token count for billing/analytics
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Session ChatSession `json:"session,omitempty" gorm:"foreignKey:SessionID;references:SessionID"`
}

// TableName specifies the table name for ChatSession
func (ChatSession) TableName() string {
	return "chat_sessions"
}

// TableName specifies the table name for ChatMessage
func (ChatMessage) TableName() string {
	return "chat_messages"
}
