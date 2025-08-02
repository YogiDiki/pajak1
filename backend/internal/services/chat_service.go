package services

import (
	"taxonomy-hub/internal/config"
	"taxonomy-hub/internal/models"

	"gorm.io/gorm"
)

type ChatService struct {
	db  *gorm.DB
	cfg *config.Config
}

func NewChatService(db *gorm.DB, cfg *config.Config) *ChatService {
	return &ChatService{
		db:  db,
		cfg: cfg,
	}
}

func (s *ChatService) CreateChatSession(userID uint) (*models.ChatSession, error) {
	session := &models.ChatSession{
		UserID: userID,
	}
	if err := s.db.Create(session).Error; err != nil {
		return nil, err
	}
	return session, nil
}

func (s *ChatService) AddMessage(sessionID string, content string, role string) (*models.ChatMessage, error) {
	message := &models.ChatMessage{
		SessionID: sessionID,
		Content:   content,
		Role:      role,
	}
	if err := s.db.Create(message).Error; err != nil {
		return nil, err
	}
	return message, nil
}

func (s *ChatService) GetChatHistory(sessionID string) ([]models.ChatMessage, error) {
	var messages []models.ChatMessage
	if err := s.db.Where("session_id = ?", sessionID).Order("created_at asc").Find(&messages).Error; err != nil {
		return nil, err
	}
	return messages, nil
}
