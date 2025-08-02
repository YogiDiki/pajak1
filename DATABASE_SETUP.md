# Setup Database dan Akun Admin - Pajak Hub

## Langkah Setup Database

### 1. Pastikan PostgreSQL Sudah Terinstall
- Download dan install PostgreSQL dari https://www.postgresql.org/download/
- Pastikan service PostgreSQL berjalan

### 2. Jalankan Script Setup Database

#### **Cara Otomatis (Windows):**
```bash
# Double click file ini atau jalankan di Command Prompt:
scripts/setup_database.bat
```

#### **Cara Manual:**
```bash
# 1. Buat database
psql -U postgres -c "CREATE DATABASE pajakdb;"

# 2. Jalankan script setup
psql -U postgres -d pajakdb -f scripts/setup_database.sql
```

### 3. Konfigurasi Backend

#### **Copy file konfigurasi:**
```bash
# Copy file contoh ke file konfigurasi
cp backend/env.example backend/.env
```

#### **Edit file .env:**
```bash
# Ganti password PostgreSQL Anda
DB_PASSWORD=your_actual_password_here

# Ganti JWT secret
JWT_SECRET=your_random_secret_key_here
```

### 4. Jalankan Backend
```bash
cd backend
go run main.go
```

### 5. Jalankan Frontend
```bash
cd frontend
npm install
npm run dev
```

## Akun Admin yang Dibuat

**Email:** `admin@pajakhub.com`  
**Password:** `admin123`

## Fitur yang Tersedia

### **Tabel yang Dibuat:**
- `users` - Tabel user
- `roles` - Tabel role (admin, user, moderator)
- `permissions` - Tabel permission
- `articles` - Tabel artikel
- `categories` - Tabel kategori
- `tags` - Tabel tag
- `chat_sessions` - Tabel sesi chat
- `chat_messages` - Tabel pesan chat

### **Data Sample yang Dimasukkan:**
- 3 role: admin, user, moderator
- 6 permission dasar
- 1 akun admin
- 5 kategori artikel (Pajak, Ekonomi, Bisnis, dll)
- 7 tag artikel
- 3 artikel sample

## Troubleshooting

### **Error "Database tidak ditemukan"**
- Pastikan PostgreSQL berjalan
- Pastikan database `pajakdb` sudah dibuat
- Cek koneksi di file `.env`

### **Error "Password salah"**
- Pastikan password PostgreSQL di file `.env` sudah benar
- Coba test koneksi: `psql -U postgres -d pajakdb`

### **Error "Permission denied"**
- Pastikan user PostgreSQL memiliki akses ke database
- Coba jalankan sebagai administrator

## Login ke Aplikasi

1. Buka browser ke `http://localhost:5173` (atau port frontend)
2. Klik "Login"
3. Masukkan:
   - Email: `admin@pajakhub.com`
   - Password: `admin123`
4. Klik "Login"

Setelah login berhasil, Anda akan memiliki akses admin ke dashboard. 