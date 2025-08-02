@echo off
echo ========================================
echo Setup Database Pajak Hub
echo ========================================

echo.
echo 1. Membuat database pajakdb...
psql -U postgres -c "CREATE DATABASE pajakdb;" 2>nul
if %errorlevel% neq 0 (
    echo Database pajakdb sudah ada atau error.
) else (
    echo Database pajakdb berhasil dibuat.
)

echo.
echo 2. Menjalankan script setup...
psql -U postgres -d pajakdb -f scripts/setup_database.sql

echo.
echo ========================================
echo Setup selesai!
echo ========================================
echo.
echo Login Admin:
echo Email: admin@pajakhub.com
echo Password: admin123
echo.
echo Tekan tombol apa saja untuk keluar...
pause >nul 