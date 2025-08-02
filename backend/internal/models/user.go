package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Email    string `json:"email" gorm:"uniqueIndex;not null"`
	Password string `json:"-" gorm:"not null"` // "-" means don't include in JSON
	Name     string `json:"name" gorm:"not null"`
	Avatar   string `json:"avatar"`
	Phone    string `json:"phone"`
	IsActive bool   `json:"is_active" gorm:"default:true"`
	RoleID   uint   `json:"role_id"`
	// Role      Role           `json:"role" gorm:"foreignKey:RoleID"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Articles     []Article     `json:"articles,omitempty" gorm:"foreignKey:AuthorID"`
	// Comments     []Comment     `json:"comments,omitempty" gorm:"foreignKey:UserID"`
	// ChatSessions []ChatSession `json:"chat_sessions,omitempty" gorm:"foreignKey:UserID"`
}

// Role represents user roles in the system
type Role struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name" gorm:"uniqueIndex;not null"`
	Description string `json:"description"`
	// Permissions []Permission   `json:"permissions,omitempty" gorm:"many2many:role_permissions;"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Users []User `json:"users,omitempty" gorm:"foreignKey:RoleID"`
}

// Permission represents system permissions
type Permission struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"uniqueIndex;not null"`
	Description string         `json:"description"`
	Resource    string         `json:"resource" gorm:"not null"` // e.g., "articles", "users"
	Action      string         `json:"action" gorm:"not null"`   // e.g., "create", "read", "update", "delete"
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`

	// Relationships
	// Roles []Role `json:"roles,omitempty" gorm:"many2many:role_permissions;"`
}

// TableName specifies the table name for User
func (User) TableName() string {
	return "users"
}

// TableName specifies the table name for Role
func (Role) TableName() string {
	return "roles"
}

// TableName specifies the table name for Permission
func (Permission) TableName() string {
	return "permissions"
}
