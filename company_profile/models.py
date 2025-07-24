# emydnpajak_project/company_profile/models.py

from django.db import models
from django.utils.text import slugify # Import slugify di sini agar bisa digunakan di semua model
from django.utils.translation import gettext_lazy as _ # Untuk terjemahan (opsional tapi baik untuk i18n)

class KategoriPublikasi(models.Model):
    nama = models.CharField(max_length=100, unique=True, verbose_name=_("Nama Kategori"))
    slug = models.SlugField(max_length=100, unique=True, help_text=_("URL-friendly version of the category name"))

    class Meta:
        verbose_name = _("Kategori Publikasi")
        verbose_name_plural = _("Kategori Publikasi")

    def __str__(self):
        return self.nama

class Publikasi(models.Model):
    judul = models.CharField(max_length=255, verbose_name=_("Judul Publikasi"))
    # Menggunakan ForeignKey ke KategoriPublikasi agar bisa difilter
    kategori = models.ForeignKey(KategoriPublikasi, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Kategori"))
    penulis = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Penulis"))
    deskripsi_singkat = models.TextField(blank=True, null=True, verbose_name=_("Deskripsi Singkat"))
    # Untuk keterangan lengkap seperti "Chapter 6: Indonesia, dalam Lexology In-Depth..."
    keterangan_lengkap = models.TextField(blank=True, null=True, verbose_name=_("Keterangan Lengkap"))
    penerbit = models.CharField(max_length=100, blank=True, null=True, verbose_name=_("Penerbit"))
    tanggal_publikasi = models.DateField(blank=True, null=True, verbose_name=_("Tanggal Publikasi"))
    bahasa = models.CharField(max_length=50, default="Bahasa Indonesia", verbose_name=_("Bahasa"))
    halaman = models.CharField(max_length=50, blank=True, null=True, verbose_name=_("Jumlah Halaman")) # Bisa juga diubah ke IntegerField jika selalu angka
    link_eksternal = models.URLField(max_length=500, blank=True, null=True, verbose_name=_("Link Eksternal"))
    file_publikasi = models.FileField(upload_to='publikasi_files/', blank=True, null=True, verbose_name=_("File Publikasi"))
    gambar_sampul = models.ImageField(upload_to='publikasi_covers/', blank=True, null=True, verbose_name=_("Gambar Sampul"))

    # Field untuk URL halaman detail publikasi, akan di-generate otomatis atau diisi manual
    slug = models.SlugField(max_length=255, unique=True, help_text=_("URL-friendly version of the title"))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Dibuat Pada"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Diperbarui Pada"))

    class Meta:
        verbose_name = _("Publikasi")
        verbose_name_plural = _("Publikasi")
        ordering = ['-tanggal_publikasi', 'judul'] # Urutkan berdasarkan tanggal terbaru

    def __str__(self):
        return self.judul

    def save(self, *args, **kwargs):
        # Pastikan slugify diimpor di bagian atas file
        if not self.slug:
            self.slug = slugify(self.judul)
        super().save(*args, **kwargs)


class Layanan(models.Model):
    judul = models.CharField(max_length=200, verbose_name=_("Judul Layanan"))
    slug = models.SlugField(unique=True, max_length=200, blank=True, help_text=_("Slug akan dibuat otomatis dari judul"))
    deskripsi_singkat = models.TextField(verbose_name=_("Deskripsi Singkat"), help_text=_("Deskripsi singkat yang tampil di daftar layanan"), blank=True)
    deskripsi_lengkap = models.TextField(verbose_name=_("Deskripsi Lengkap"), help_text=_("Deskripsi lengkap yang tampil di halaman detail"), blank=True)
    gambar = models.ImageField(upload_to='layanan_images/', blank=True, null=True, verbose_name=_("Gambar Layanan"))
    ikon_svg = models.CharField(max_length=500, blank=True, verbose_name=_("Kode Ikon SVG (opsional)"), help_text=_("Tempelkan kode SVG untuk ikon (misal: dari Font Awesome SVG, Heroicons)"))
    urutan = models.PositiveIntegerField(default=0, verbose_name=_("Urutan Tampilan"), help_text=_("Angka yang lebih kecil akan tampil lebih dulu"))
    is_active = models.BooleanField(default=True, verbose_name=_("Aktifkan Layanan"))
    tanggal_dibuat = models.DateTimeField(auto_now_add=True, verbose_name=_("Tanggal Dibuat"))
    tanggal_diperbarui = models.DateTimeField(auto_now=True, verbose_name=_("Tanggal Diperbarui"))

    class Meta:
        verbose_name = _("Layanan")
        verbose_name_plural = _("Layanan")
        ordering = ['urutan', 'judul'] # Urutkan berdasarkan urutan, lalu judul

    def save(self, *args, **kwargs):
        # Pastikan slugify diimpor di bagian atas file
        if not self.slug:
            self.slug = slugify(self.judul)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.judul