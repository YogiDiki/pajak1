package services

import (
	"os"
	"path/filepath"
	"taxonomy-hub/internal/config"
)

type FileService struct {
	cfg *config.Config
}

func NewFileService(cfg *config.Config) *FileService {
	return &FileService{cfg: cfg}
}

func (s *FileService) CreateUploadDirectory() error {
	uploadDir := "uploads"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return err
	}
	return nil
}

func (s *FileService) GetFilePath(filename string) string {
	return filepath.Join("uploads", filename)
}

func (s *FileService) FileExists(filename string) bool {
	filePath := s.GetFilePath(filename)
	_, err := os.Stat(filePath)
	return err == nil
}
