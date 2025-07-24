# Django settings for emydnpajak project.

from pathlib import Path
import os # <-- DITAMBAHKAN UNTUK os.path.join

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'default-fallback')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '127.0.0.1').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'company_profile', # Pastikan aplikasi Anda terdaftar di sini
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',   # ← tambahkan di sini
    'django.contrib.sessions.middleware.SessionMiddleware',
    # LocaleMiddleware harus berada setelah SessionMiddleware
    # dan sebelum CommonMiddleware atau CommonLocaleMiddleware (jika ada)
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'emydnpajak.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [], # Anda bisa menambahkan direktori template global di sini jika diperlukan, contoh: [BASE_DIR / 'templates']
        'APP_DIRS': True, # Ini penting agar Django mencari template di folder 'templates' dalam setiap aplikasi
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'emydnpajak.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization (Pengaturan Internasionalisasi)
# https://docs.djangoproject.com/en/5.0/topics/i18n/

# Kode bahasa default untuk situs Anda.
# Ini akan digunakan jika tidak ada preferensi bahasa yang terdeteksi dari browser atau sesi.
LANGUAGE_CODE = 'id' # Mengatur bahasa default menjadi Indonesia

# Zona waktu untuk situs ini.
# Lihat: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
TIME_ZONE = 'Asia/Jakarta' # Mengubah zona waktu ke Jakarta

# Aktifkan sistem terjemahan Django.
USE_I18N = True

# Aktifkan dukungan zona waktu di Django.
USE_TZ = True

# Daftar bahasa yang tersedia di situs Anda.
# Django akan mencari file terjemahan untuk bahasa-bahasa ini.
LANGUAGES = [
    ('id', ('Indonesian')), # Teks dalam kurung adalah untuk tampilan, misal di admin
    ('en', ('English')),
]

# Lokasi di mana Django akan mencari file terjemahan (.po dan .mo)
# Ini adalah daftar direktori di mana Django harus mencari file terjemahan.
# Penting untuk menyertakan folder 'locale' di dalam setiap aplikasi Anda yang memiliki terjemahan.
LOCALE_PATHS = [
    os.path.join(BASE_DIR, 'company_profile/locale'),
    # Jika Anda memiliki folder 'locale' di root proyek atau di aplikasi lain, tambahkan di sini juga:
    # os.path.join(BASE_DIR, 'locale'),
    # os.path.join(BASE_DIR, 'other_app/locale'),
]


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'

# Direktori-direktori tambahan tempat aplikasi mencari file statis.
# Django akan mencari file statis di dalam folder 'static' di setiap aplikasi yang terdaftar
STATICFILES_DIRS = [
    BASE_DIR / 'company_profile/static',
    # Jika Anda memiliki folder statis lain di root proyek atau di aplikasi lain, tambahkan di sini juga
    # BASE_DIR / 'static_global',
]

# Path ke mana file statis akan dikumpulkan saat deployment (python manage.py collectstatic)
# Ini bukan untuk pengembangan lokal, tapi penting untuk masa depan.
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'




# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Konfigurasi untuk Media Files (gambar, dokumen yang diunggah)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')