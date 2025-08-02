#!/bin/bash

# Taxonomy Knowledge Hub - Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Taxonomy Knowledge Hub Development Environment"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_warning "Node.js is not installed. Installing Node.js..."
        # You can add Node.js installation logic here
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    print_status "Node.js and npm are installed"
}

# Check if Go is installed
check_go() {
    if ! command -v go &> /dev/null; then
        print_warning "Go is not installed. Installing Go..."
        # You can add Go installation logic here
        exit 1
    fi
    
    print_status "Go is installed"
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p uploads
    mkdir -p logs
    mkdir -p nginx/ssl
    
    print_status "Directories created successfully"
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ ! -f backend/.env ]; then
        cp backend/env.example backend/.env
        print_status "Created backend/.env from template"
    else
        print_warning "backend/.env already exists, skipping..."
    fi
    
    # Frontend environment
    if [ ! -f frontend/.env ]; then
        cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Taxonomy Knowledge Hub
EOF
        print_status "Created frontend/.env"
    else
        print_warning "frontend/.env already exists, skipping..."
    fi
}

# Install frontend dependencies
install_frontend_deps() {
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    print_status "Frontend dependencies installed"
}

# Install backend dependencies
install_backend_deps() {
    print_status "Installing backend dependencies..."
    cd backend
    go mod download
    cd ..
    print_status "Backend dependencies installed"
}

# Build Docker images
build_docker() {
    print_status "Building Docker images..."
    docker-compose build
    print_status "Docker images built successfully"
}

# Start services
start_services() {
    print_status "Starting services..."
    docker-compose up -d postgres redis
    print_status "Database and Redis started"
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    print_status "Running database migrations..."
    cd backend
    go run main.go &
    cd ..
    
    print_status "Services started successfully"
}

# Display setup information
display_info() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "=================================="
    echo ""
    echo "📊 Services Status:"
    echo "  - Frontend: http://localhost:3000"
    echo "  - Backend API: http://localhost:8080"
    echo "  - Database: localhost:5432"
    echo "  - Redis: localhost:6379"
    echo ""
    echo "🔧 Next Steps:"
    echo "  1. Update environment variables in backend/.env and frontend/.env"
    echo "  2. Run 'docker-compose up -d' to start all services"
    echo "  3. Access the application at http://localhost:3000"
    echo ""
    echo "📚 Documentation:"
    echo "  - README.md - Project overview"
    echo "  - DEPLOYMENT.md - Deployment guide"
    echo ""
    echo "🛠️  Useful Commands:"
    echo "  - docker-compose up -d          # Start all services"
    echo "  - docker-compose down           # Stop all services"
    echo "  - docker-compose logs -f        # View logs"
    echo "  - docker-compose restart        # Restart services"
    echo ""
}

# Main setup function
main() {
    echo "Starting setup process..."
    
    check_docker
    check_node
    check_go
    create_directories
    setup_env
    install_frontend_deps
    install_backend_deps
    build_docker
    start_services
    display_info
}

# Run main function
main "$@" 