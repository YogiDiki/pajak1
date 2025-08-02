# Taxonomy Knowledge Hub

A comprehensive knowledge management platform for taxonomy and biological classification, featuring an advanced AI-powered assistant for real-time learning and research support.

## 🚀 Features

### 🤖 AI Assistant (Version 2.0)
- **Natural Language Processing**: Advanced understanding and response to natural language queries
- **Context Awareness**: Maintains conversation context and memory across sessions
- **Knowledge Integration**: Accesses comprehensive taxonomy knowledge base
- **Learning Adaptation**: Adapts responses based on user expertise level
- **Multilingual Support**: Full support for English and Indonesian
- **Content Analysis**: Analyzes and provides feedback on taxonomy-related content
- **Personalized Learning**: Generates customized learning paths and recommendations
- **Real-time Interaction**: Instant responses with confidence scoring

### 📚 Knowledge Management
- **Articles**: Comprehensive taxonomy articles with rich content
- **Ebooks**: Educational materials and reference guides
- **Videos**: Instructional content and demonstrations
- **Categories & Tags**: Organized content classification
- **Comments & Ratings**: Community engagement features

### 🔐 User Management
- **Role-based Access Control**: User, Admin, and Super Admin roles
- **Authentication**: JWT-based secure authentication
- **Profile Management**: User profiles and preferences
- **Progress Tracking**: Learning progress and achievements

### 📊 Analytics & Insights
- **Content Analytics**: Article and educational content performance
- **User Analytics**: User engagement and learning patterns
- **System Monitoring**: Real-time system status and health

## 🛠 Technology Stack

### Backend
- **Go (Gin Framework)**: High-performance web framework
- **PostgreSQL**: Primary database for data persistence
- **Redis**: Caching and session management
- **GORM**: Object-relational mapping
- **JWT**: Authentication and authorization

### Frontend
- **React 18**: Modern UI framework with TypeScript
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Infrastructure
- **Docker**: Containerization for consistent deployment
- **Nginx**: Reverse proxy and static file serving

## 🏗 Project Structure

```
pajak1/
├── backend/                 # Go backend application
│   ├── internal/
│   │   ├── config/         # Configuration management
│   │   ├── database/       # Database models and migrations
│   │   ├── handlers/       # HTTP request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API route definitions
│   │   └── services/       # Business logic services
│   ├── main.go            # Application entry point
│   └── Dockerfile         # Backend container configuration
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container configuration
├── docker-compose.yml     # Multi-container orchestration
└── README.md             # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Go 1.21+ (for local development)
- Node.js 18+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pajak1
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your database credentials
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/docs

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   go mod download
   go run main.go
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🤖 AI Assistant Usage

### Basic Chat
```bash
# Create a chat session
POST /api/chat/sessions

# Send a message
POST /api/chat/sessions/{sessionID}/messages
{
  "message": "What is taxonomy?",
  "user_id": 1
}
```

### Advanced AI Queries
```bash
# Get AI capabilities
GET /api/ai/capabilities

# Send a query with context
POST /api/ai/query
{
  "query": "Explain species classification",
  "context": "Teaching high school students",
  "user_level": "beginner"
}

# Analyze content
POST /api/ai/analyze
{
  "content": "Your taxonomy content here",
  "type": "text"
}

# Get personalized learning path
POST /api/ai/learn
{
  "user_id": 1,
  "interests": ["molecular taxonomy", "conservation"],
  "current_level": "intermediate",
  "goals": ["research", "teaching"]
}
```

## 📋 API Endpoints

### Public Endpoints
- `GET /` - Welcome page with AI assistant info
- `GET /docs` - Complete API documentation
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Assistant Endpoints
- `GET /api/ai/capabilities` - AI capabilities
- `POST /api/ai/query` - AI query processing
- `POST /api/ai/analyze` - Content analysis
- `GET /api/ai/suggestions` - Learning suggestions
- `POST /api/ai/learn` - Personalized learning paths

### Chat Endpoints
- `POST /api/chat/sessions` - Create chat session
- `POST /api/chat/sessions/{sessionID}/messages` - Send message
- `GET /api/chat/sessions/{sessionID}/messages` - Get messages
- `GET /api/user/chat/sessions` - User's chat sessions

### Content Endpoints
- `GET /api/articles` - Get articles
- `GET /api/education/ebooks` - Get ebooks
- `GET /api/education/videos` - Get videos
- `GET /api/categories` - Get categories
- `GET /api/tags` - Get tags

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

```bash
# Login to get token
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

# Use token in requests
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

### User
- Access to public content
- Chat with AI assistant
- Create comments and ratings
- Manage profile

### Admin
- All user permissions
- Content management (articles, ebooks, videos)
- User management
- Analytics access

### Super Admin
- All admin permissions
- Role and permission management
- System configuration
- Backup and maintenance

## 🎯 Use Cases

### Education
- **Students**: Learn taxonomy concepts through AI-guided lessons
- **Teachers**: Access educational resources and create learning materials
- **Researchers**: Get assistance with species identification and classification

### Research
- **Taxonomists**: Access comprehensive knowledge base and AI assistance
- **Biologists**: Get help with classification and identification
- **Conservationists**: Access biodiversity data and identification tools

### Professional Development
- **Scientists**: Stay updated with latest taxonomy developments
- **Educators**: Enhance teaching methods with AI-powered tools
- **Professionals**: Access specialized knowledge and training

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL=postgres://postgres:password@localhost:5432/taxonomy_hub?sslmode=disable

# Redis
REDIS_URL=localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Server
PORT=8080
ENVIRONMENT=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Taxonomy Knowledge Hub
```

## 📊 Monitoring

### Health Checks
- `GET /api/health` - Basic health status
- Database connectivity
- Redis connectivity
- System resources

### Analytics
- User engagement metrics
- Content performance
- AI assistant usage
- Learning progress tracking

## 🚀 Deployment

### Production Deployment
1. Set environment variables for production
2. Configure SSL certificates
3. Set up database backups
4. Configure monitoring and logging
5. Deploy using Docker Compose or Kubernetes

### Scaling
- Horizontal scaling with load balancers
- Database read replicas
- Redis clustering
- CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the API documentation at `/docs`
- Review the README and code comments
- Open an issue on GitHub
- Contact the development team

## 🔮 Roadmap

### Version 2.1
- [ ] Enhanced AI model integration
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-language content support

### Version 2.2
- [ ] Machine learning model training
- [ ] Advanced search capabilities
- [ ] Collaborative features
- [ ] API rate limiting improvements

### Version 3.0
- [ ] Real-time collaboration
- [ ] Advanced AI features
- [ ] Integration with external databases
- [ ] Mobile-first design 