/** @type {import('tailwindcss').Config} */
module.exports = {
  // Bagian 'content' ini memberi tahu Tailwind di mana ia harus mencari kelas CSS yang Anda gunakan
  // agar Tailwind bisa menghasilkan CSS yang paling optimal (menghapus yang tidak terpakai).
  content: [
    "./company_profile/templates/**/*.html", // Ini akan mencakup semua file HTML di dalam folder templates/company_profile
    // Jika nanti Anda membuat aplikasi Django lain, tambahkan baris serupa di sini, contoh:
    // "./nama_aplikasi_lain/templates/**/*.html",
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan konfigurasi tema kustom di sini, seperti warna, font, dll.
      // Untuk sekarang, kita biarkan kosong dulu.
    },
  },
  plugins: [
    // Anda bisa menambahkan plugin Tailwind CSS di sini jika diperlukan.
    // Untuk sekarang, kita biarkan kosong dulu.
  ],
}