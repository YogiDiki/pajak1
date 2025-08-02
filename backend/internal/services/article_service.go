package services

import (
	"taxonomy-hub/internal/models"

	"gorm.io/gorm"
)

type ArticleService struct {
	db *gorm.DB
}

func NewArticleService(db *gorm.DB) *ArticleService {
	return &ArticleService{db: db}
}

func (s *ArticleService) GetArticles(limit, offset int) ([]models.Article, error) {
	var articles []models.Article
	if err := s.db.Limit(limit).Offset(offset).Find(&articles).Error; err != nil {
		return nil, err
	}
	return articles, nil
}

func (s *ArticleService) GetArticleByID(id uint) (*models.Article, error) {
	var article models.Article
	if err := s.db.First(&article, id).Error; err != nil {
		return nil, err
	}
	return &article, nil
}

func (s *ArticleService) CreateArticle(article *models.Article) error {
	return s.db.Create(article).Error
}

func (s *ArticleService) UpdateArticle(article *models.Article) error {
	return s.db.Save(article).Error
}

func (s *ArticleService) DeleteArticle(id uint) error {
	return s.db.Delete(&models.Article{}, id).Error
}
