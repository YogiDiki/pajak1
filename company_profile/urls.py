# company_profile/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # Pola URL untuk halaman yang sudah ada filenya
    path('', views.home_view, name='home'),
    path('industri/', views.industri_view, name='industri'),
    path('tentang-kami/nilai-kami/', views.nilai_kami_view, name='nilai_kami'),
    path('tentang-kami/tim-kami/', views.tim_kami_view, name='tim_kami'),
    path('tentang-kami/penghargaan-pengakuan/', views.penghargaan_pengakuan_view, name='penghargaan_pengakuan'),

    # URL untuk set_language
    path('i18n/setlang/', views.set_language, name='set_language'),

    # URL untuk bagian Karir
    path('karir/', views.karir_view, name='karir'),

    # URL untuk bagian Jaringan
    path('jaringan/', views.jaringan_view, name='jaringan'),

    # URL untuk bagian Kontak
    path('kontak/', views.kontak_view, name='kontak'),

    # URL untuk halaman daftar publikasi utama
    path('publikasi/', views.publikasi_view, name='publikasi'), # Atau publikasi_list_view jika itu nama fungsinya
    # URL untuk halaman detail publikasi (menggunakan slug)
    path('publikasi/<slug:slug>/', views.publikasi_detail_view, name='publikasi_detail'),


    # --- PENTING: Perbaikan URL Layanan ---
    # Ini adalah URL utama untuk menampilkan daftar layanan dari database
    path('layanan/', views.layanan_list_view, name='layanan'),

    # Ini adalah URL untuk halaman detail setiap layanan
    path('layanan/<slug:slug>/', views.layanan_detail_view, name='layanan_detail'),

    # --- URL SUB-LAYANAN STATIS (jika masih diperlukan) ---
    # Jika sub-layanan ini akan dinamis dari model Layanan,
    # maka Anda bisa menghapus path-path ini.
    path('layanan/consulting/', views.layanan_consulting_view, name='layanan_consulting'),
    path('layanan/education/', views.layanan_education_view, name='layanan_education'),
    path('layanan/research/', views.layanan_research_view, name='layanan_research'),
    path('layanan/products/', views.layanan_products_view, name='layanan_products'),

]