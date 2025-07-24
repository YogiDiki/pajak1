# emydnpajak_project/company_profile/views.py

from django.shortcuts import render, get_object_or_404, redirect
from django.utils import translation
from django.views.i18n import set_language as django_set_language # Tambahkan ini
from django.conf import settings
from .models import KategoriPublikasi, Publikasi, Layanan # Pastikan Layanan diimpor

# --- Contoh Views Anda yang lain (pastikan ada di file Anda) ---

def home_view(request):
    # Logika untuk halaman home Anda
    return render(request, 'company_profile/home.html')

def industri_view(request):
    return render(request, 'company_profile/industri.html')

def nilai_kami_view(request):
    return render(request, 'company_profile/tentang_kami/nilai_kami.html')

def tim_kami_view(request):
    return render(request, 'company_profile/tentang_kami/tim_kami.html')

def penghargaan_pengakuan_view(request):
    return render(request, 'company_profile/tentang_kami/penghargaan_dan_pengakuan.html')

def set_language(request):
    return django_set_language(request) # Cukup panggil fungsi bawaan Django

def karir_view(request):
    return render(request, 'company_profile/karir.html')

def jaringan_view(request):
    return render(request, 'company_profile/jaringan.html')

def kontak_view(request):
    return render(request, 'company_profile/kontak.html')

def publikasi_view(request): # ini mungkin publikasi_list_view Anda
    publikasi_list = Publikasi.objects.all().order_by('-tanggal_publikasi')
    kategori_list = KategoriPublikasi.objects.all()
    context = {
        'publikasi_list': publikasi_list,
        'kategori_list': kategori_list,
    }
    return render(request, 'company_profile/publikasi.html', context)

def publikasi_detail_view(request, slug):
    publikasi = get_object_or_404(Publikasi, slug=slug)
    context = {
        'publikasi': publikasi,
    }
    return render(request, 'company_profile/publikasi_detail.html', context)


# --- VIEWS UNTUK LAYANAN (Penting!) ---

# Ini adalah view utama untuk halaman daftar layanan
def layanan_list_view(request): # NAMA FUNGSI INI HARUS SAMA DENGAN YANG DIPANGGIL DI urls.py
    # Mengambil semua objek Layanan yang aktif dari database, diurutkan sesuai urutan
    layanan_aktif = Layanan.objects.filter(is_active=True).order_by('urutan', 'judul')

    context = {
        'layanan_list': layanan_aktif,
        'active_menu': 'layanan',
    }
    return render(request, 'company_profile/layanan.html', context)

# View untuk halaman detail layanan (dipanggil dari link "Pelajari Lebih Lanjut")
def layanan_detail_view(request, slug):
    layanan = get_object_or_404(Layanan, slug=slug, is_active=True)
    context = {
        'layanan': layanan,
        'active_menu': 'layanan',
    }
    # Pastikan Anda memiliki template layanan_detail.html
    return render(request, 'company_profile/layanan_detail.html', context)

# Contoh view untuk sub-layanan statis (jika Anda masih ingin mempertahankannya)
# Jika sub-layanan ini juga akan dinamis dari model Layanan, Anda bisa menghapusnya
def layanan_consulting_view(request):
    return render(request, 'company_profile/layanan/consulting.html')

def layanan_education_view(request):
    return render(request, 'company_profile/layanan/education.html')

def layanan_research_view(request):
    return render(request, 'company_profile/layanan/research.html')

def layanan_products_view(request):
    return render(request, 'company_profile/layanan/products.html')

# def layanan_view(request): # Hapus atau ubah nama fungsi ini jika layanan_list_view adalah yang utama
#    # Jika Anda memiliki halaman layanan statis terpisah yang tidak menggunakan database,
#    # maka Anda bisa menyimpan ini, tapi harus dengan nama URL yang berbeda.
#    # Namun, umumnya, layanan_list_view adalah yang utama.
#    return render(request, 'company_profile/layanan.html') # Asumsi Anda ingin menampilkan semua layanan di sini