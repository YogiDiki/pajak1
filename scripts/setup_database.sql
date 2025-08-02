-- Setup Database untuk Pajak Hub
-- Jalankan script ini di PostgreSQL

-- 1. Buat database (jika belum ada)
-- CREATE DATABASE pajakdb;

-- 2. Buat tabel roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 3. Buat tabel permissions
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 4. Buat tabel users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 5. Buat tabel articles
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft',
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 6. Buat tabel categories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 7. Buat tabel tags
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 8. Buat tabel chat_sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 9. Buat tabel chat_messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'user' atau 'assistant'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 10. Insert default roles
INSERT INTO roles (name, description) VALUES 
('admin', 'Administrator dengan akses penuh'),
('user', 'User biasa'),
('moderator', 'Moderator dengan akses terbatas')
ON CONFLICT (name) DO NOTHING;

-- 11. Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES 
('create_articles', 'Membuat artikel', 'articles', 'create'),
('read_articles', 'Membaca artikel', 'articles', 'read'),
('update_articles', 'Mengupdate artikel', 'articles', 'update'),
('delete_articles', 'Menghapus artikel', 'articles', 'delete'),
('manage_users', 'Mengelola user', 'users', 'manage'),
('manage_system', 'Mengelola sistem', 'system', 'manage')
ON CONFLICT (name) DO NOTHING;

-- 12. Insert admin user (password: admin123)
-- Password di-hash dengan bcrypt
INSERT INTO users (email, password, name, is_active, role_id) VALUES 
('admin@pajakhub.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', true, 1)
ON CONFLICT (email) DO NOTHING;

-- 13. Insert sample categories
INSERT INTO categories (name, slug, description) VALUES 
('Pajak Penghasilan', 'pajak-penghasilan', 'Artikel tentang PPh'),
('Pajak Pertambahan Nilai', 'pajak-pertambahan-nilai', 'Artikel tentang PPN'),
('Ekonomi', 'ekonomi', 'Artikel tentang ekonomi'),
('Bisnis', 'bisnis', 'Artikel tentang bisnis'),
('Investasi', 'investasi', 'Artikel tentang investasi')
ON CONFLICT (slug) DO NOTHING;

-- 14. Insert sample tags
INSERT INTO tags (name, slug) VALUES 
('PPh 21', 'pph-21'),
('PPh 23', 'pph-23'),
('PPN', 'ppn'),
('UMKM', 'umkm'),
('Saham', 'saham'),
('Obligasi', 'obligasi'),
('Reksa Dana', 'reksa-dana')
ON CONFLICT (slug) DO NOTHING;

-- 15. Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, status, author_id) VALUES 
('Panduan Lengkap PPh 21', 'panduan-lengkap-pph-21', 'Konten artikel tentang PPh 21...', 'Panduan lengkap cara menghitung dan melaporkan PPh 21', 'published', 1),
('Tips Investasi untuk Pemula', 'tips-investasi-untuk-pemula', 'Konten artikel tentang investasi...', 'Panduan investasi untuk pemula yang aman dan menguntungkan', 'published', 1),
('Strategi Bisnis UMKM', 'strategi-bisnis-umkm', 'Konten artikel tentang bisnis UMKM...', 'Strategi mengembangkan bisnis UMKM di era digital', 'published', 1)
ON CONFLICT (slug) DO NOTHING;

-- Tampilkan hasil
SELECT 'Database setup selesai!' as status;
SELECT 'Admin user: admin@pajakhub.com / admin123' as login_info;
SELECT 'Role admin ID: ' || id as role_info FROM roles WHERE name = 'admin'; 