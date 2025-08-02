import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Newspaper, GraduationCap, TrendingUp, Users, Award, Globe } from 'lucide-react'

const features = [
  {
    name: 'Berita Terkini',
    description: 'Akses berita terbaru seputar pajak, ekonomi, bisnis, dan investasi yang sudah diverifikasi dan diolah dengan AI.',
    icon: Newspaper,
    href: '/news',
  },
  {
    name: 'E-Learning',
    description: 'Belajar dari e-book, video, dan materi edukasi berkualitas tinggi yang disusun oleh para ahli.',
    icon: GraduationCap,
    href: '/education',
  },
  {
    name: 'AI Assistant',
    description: 'Dapatkan jawaban instan dari AI chatbot yang memahami konteks pajak, ekonomi, dan bisnis.',
    icon: BookOpen,
    href: '#',
  },
]

const stats = [
  { name: 'Artikel Terbit', value: '1000+' },
  { name: 'Pengguna Aktif', value: '50K+' },
  { name: 'E-book Tersedia', value: '500+' },
  { name: 'Video Edukasi', value: '200+' },
]

const categories = [
  { name: 'Pajak', count: 250, color: 'bg-blue-500' },
  { name: 'Ekonomi', count: 180, color: 'bg-green-500' },
  { name: 'Bisnis', count: 320, color: 'bg-purple-500' },
  { name: 'Investasi', count: 150, color: 'bg-orange-500' },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Taxonomy Knowledge Hub - Kunci Sukses di Dunia Pajak, Ekonomi, Bisnis, dan Investasi</title>
        <meta name="description" content="Platform edukasi dan informasi terdepan untuk pengembangan pengetahuan di bidang pajak, ekonomi, bisnis, dan investasi." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-custom py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Kunci Sukses Anda di Dunia{' '}
                <span className="text-secondary-300">Pajak, Ekonomi, Bisnis, dan Investasi</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Taxonomy Knowledge Hub adalah platform edukasi dan informasi terdepan yang membantu Anda memahami kompleksitas dunia finansial dengan cara yang mudah dan terstruktur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/news"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Mulai Belajar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/about"
                  className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">AI Assistant Online</span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm">"Bagaimana cara menghitung PPh 21 untuk karyawan tetap?"</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 ml-8">
                    <p className="text-sm">PPh 21 untuk karyawan tetap dihitung berdasarkan penghasilan bruto dikurangi biaya jabatan dan iuran pensiun...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nikmati berbagai fitur canggih yang dirancang untuk memaksimalkan pengalaman belajar Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="card p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <Link
                  to={feature.href}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Konten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jelajahi ribuan artikel dan materi edukasi yang dikelompokkan berdasarkan topik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/news?category=${category.name.toLowerCase()}`}
                className="card p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.count} artikel
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Memulai Perjalanan Belajar Anda?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah meningkatkan pengetahuan mereka di Taxonomy Knowledge Hub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-secondary text-lg px-8 py-4"
            >
              Daftar Gratis
            </Link>
            <Link
              to="/contact"
              className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  )
} 