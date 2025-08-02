# 🚀 Deployment Guide - Taxonomy Knowledge Hub

## 📋 Prerequisites

Sebelum melakukan deployment, pastikan Anda memiliki:

- **Docker & Docker Compose** terinstall
- **Domain name** (opsional, untuk production)
- **SSL Certificate** (untuk HTTPS)
- **VPS/Cloud Server** dengan minimal 2GB RAM, 2 vCPU, 20GB storage

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (80/443)│────│  Frontend (3000)│────│  Backend (8080) │
│   (Reverse Proxy)│    │   (React App)   │    │   (Go API)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                └───────────────────────┼───┐
                                                        │   │
                                ┌───────────────────────┼───┼───┐
                                │                       │   │   │
                        ┌───────▼──────┐    ┌───────────▼───▼───▼──┐
                        │   Redis      │    │   PostgreSQL        │
                        │   (Cache)    │    │   (Database)        │
                        └──────────────┘    └─────────────────────┘
```

## 🔧 Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd pajak1
```

### 2. Environment Variables
Buat file `.env` di root directory:

```env
# OpenAI API
OPENAI_API_KEY=your-openai-api-key

# News API
NEWS_API_KEY=your-newsapi-key

# Supabase (Knowledge Base)
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key

# Google Analytics
GOOGLE_ANALYTICS_ID=your-ga-id

# Production Settings
ENVIRONMENT=production
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### 3. SSL Certificate (Production)
Untuk production, setup SSL certificate:

```bash
# Buat direktori SSL
mkdir -p nginx/ssl

# Copy SSL certificate files
cp your-domain.crt nginx/ssl/
cp your-domain.key nginx/ssl/
```

## 🐳 Docker Deployment

### Development
```bash
# Build dan jalankan semua services
docker-compose up -d

# Lihat logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production
```bash
# Build dengan production settings
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Scale services jika diperlukan
docker-compose up -d --scale backend=3
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api/health`
- Database: `docker exec taxonomy_hub_db pg_isready`

### Monitoring Commands
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend

# Monitor resources
docker stats

# Database backup
docker exec taxonomy_hub_db pg_dump -U postgres taxonomy_hub > backup.sql
```

## 🔒 Security Configuration

### 1. Firewall Setup
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. SSL/TLS Configuration
Update `nginx/nginx.conf` untuk SSL:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/nginx/ssl/your-domain.crt;
    ssl_certificate_key /etc/nginx/ssl/your-domain.key;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # ... rest of configuration
}
```

### 3. Rate Limiting
Tambahkan rate limiting di nginx:

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    # ... proxy settings
}
```

## 📈 Performance Optimization

### 1. Database Optimization
```sql
-- Index optimization
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);

-- Connection pooling
-- Update postgresql.conf
max_connections = 200
shared_buffers = 256MB
effective_cache_size = 1GB
```

### 2. Redis Configuration
```bash
# Redis optimization
docker exec taxonomy_hub_redis redis-cli CONFIG SET maxmemory 256mb
docker exec taxonomy_hub_redis redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

### 3. Nginx Optimization
```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript;

# Cache static files
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 Backup & Recovery

### 1. Database Backup
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
docker exec taxonomy_hub_db pg_dump -U postgres taxonomy_hub > backup_$DATE.sql
gzip backup_$DATE.sql
```

### 2. File Uploads Backup
```bash
#!/bin/bash
# backup-uploads.sh
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf uploads_backup_$DATE.tar.gz uploads/
```

### 3. Automated Backup (Cron)
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
0 3 * * * /path/to/backup-uploads.sh
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check database status
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

#### 2. Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend
docker-compose up -d frontend
```

#### 3. API Not Responding
```bash
# Check backend logs
docker-compose logs backend

# Check API health
curl http://localhost:8080/api/health
```

#### 4. Memory Issues
```bash
# Monitor memory usage
docker stats

# Restart services
docker-compose restart
```

## 📊 Analytics & Monitoring

### 1. Google Analytics
Setup Google Analytics di frontend:

```javascript
// src/utils/analytics.js
export const GA_TRACKING_ID = process.env.VITE_GOOGLE_ANALYTICS_ID;

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  });
};
```

### 2. Error Monitoring
Setup Sentry untuk error tracking:

```javascript
// src/utils/errorTracking.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /path/to/taxonomy-hub
            git pull origin main
            docker-compose down
            docker-compose build
            docker-compose up -d
```

## 💰 Cost Optimization

### 1. VPS Recommendations
- **Development**: 1 vCPU, 1GB RAM, 20GB SSD
- **Production**: 2 vCPU, 4GB RAM, 40GB SSD
- **High Traffic**: 4 vCPU, 8GB RAM, 80GB SSD

### 2. Cloud Providers
- **DigitalOcean**: $12-24/month
- **Linode**: $10-20/month
- **Vultr**: $6-12/month
- **AWS EC2**: $15-30/month

### 3. CDN Setup
Setup Cloudflare untuk CDN:

```nginx
# nginx.conf
location /static/ {
    proxy_cache_valid 200 1y;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    proxy_cache_lock on;
    add_header X-Cache-Status $upstream_cache_status;
}
```

## 📞 Support

Untuk bantuan deployment:
- Email: support@taxonomyhub.com
- Documentation: docs.taxonomyhub.com
- Issues: GitHub Issues

---

**Taxonomy Knowledge Hub** - Empowering knowledge in tax, economy, business, and investment. 