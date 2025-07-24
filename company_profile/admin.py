# emydnpajak_project/company_profile/admin.py

from django.contrib import admin
# HANYA IMPOR MODEL YANG ADA DI models.py SAAT INI
from .models import KategoriPublikasi, Publikasi, Layanan

# === KOMENTARI BLOK ADMIN UNTUK MODEL YANG BELUM ADA DI models.py ===

# @admin.register(AboutUs)
# class AboutUsAdmin(admin.ModelAdmin):
#     list_display = ('title', 'last_updated',)
#     search_fields = ('title', 'content')

# @admin.register(TeamMember)
# class TeamMemberAdmin(admin.ModelAdmin):
#     list_display = ('name', 'position', 'is_active', 'order')
#     list_filter = ('is_active', 'position')
#     search_fields = ('name', 'position', 'description')
#     ordering = ('order',)

# @admin.register(PenghargaanPengakuan)
# class PenghargaanPengakuanAdmin(admin.ModelAdmin):
#     list_display = ('judul', 'tahun', 'is_active', 'tanggal_dibuat')
#     list_filter = ('is_active', 'tahun')
#     search_fields = ('judul', 'deskripsi')

# @admin.register(Industri)
# class IndustriAdmin(admin.ModelAdmin):
#     list_display = ('nama', 'slug', 'is_active', 'urutan')
#     list_filter = ('is_active',)
#     search_fields = ('nama', 'deskripsi_singkat')
#     prepopulated_fields = {'slug': ('nama',)}
#     ordering = ('urutan',)


# Daftarkan model KategoriPublikasi
@admin.register(KategoriPublikasi)
class KategoriPublikasiAdmin(admin.ModelAdmin):
    list_display = ('nama', 'slug')
    prepopulated_fields = {'slug': ('nama',)}

# Daftarkan model Publikasi
@admin.register(Publikasi)
class PublikasiAdmin(admin.ModelAdmin):
    list_display = ('judul', 'kategori', 'penulis', 'tanggal_publikasi', 'bahasa', 'penerbit', 'updated_at')
    list_filter = ('kategori', 'bahasa', 'penerbit', 'tanggal_publikasi')
    search_fields = ('judul', 'penulis', 'deskripsi_singkat', 'keterangan_lengkap')
    prepopulated_fields = {'slug': ('judul',)}
    date_hierarchy = 'tanggal_publikasi'
    fieldsets = (
        (None, {
            'fields': ('judul', 'slug', 'kategori', 'penulis', 'deskripsi_singkat', 'keterangan_lengkap', 'bahasa')
        }),
        ('Detail Publikasi', {
            'fields': ('penerbit', 'tanggal_publikasi', 'halaman', 'link_eksternal', 'file_publikasi', 'gambar_sampul'),
            'classes': ('collapse',)
        }),
    )

# Daftarkan model Layanan
@admin.register(Layanan)
class LayananAdmin(admin.ModelAdmin):
    list_display = ('judul', 'urutan', 'is_active', 'tanggal_dibuat')
    list_filter = ('is_active',)
    search_fields = ('judul', 'deskripsi_singkat', 'deskripsi_lengkap')
    prepopulated_fields = {'slug': ('judul',)}
    ordering = ('urutan',)