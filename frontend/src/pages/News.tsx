import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Search, Filter, Calendar, User, Eye, Tag, ChevronDown, Home, Bell, X } from 'lucide-react'

// Mock data untuk berita seperti pajak.com
const featuredArticles = [
  {
    id: 1,
    title: 'Dirjen Pajak Buka-Bukaan Strategi Hadapi Lonjakan Restitusi Pajak',
    excerpt: 'Direktorat Jenderal Pajak mengungkapkan strategi komprehensif untuk menghadapi lonjakan permintaan restitusi pajak di tahun 2024.',
    category: 'PAJAK',
    author: 'Tim Redaksi',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    views: 1250,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Gelar Turnamen Golf Untuk Bangun Jejaring Dan Dorong Kepatuhan Pajak',
    excerpt: 'Inisiatif baru untuk membangun hubungan dengan wajib pajak melalui kegiatan networking yang menyenangkan.',
    category: 'PAJAK',
    author: 'Tim Redaksi',
    publishedAt: '2024-01-14',
    readTime: '3 min read',
    views: 890,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Staf Ahli Sri Mulyani Ungkap Alasan Kenaikan Tarif Pajak Kripto',
    excerpt: 'Penjelasan mendalam dari tim ahli Menteri Keuangan tentang kebijakan kenaikan tarif pajak untuk aset kripto.',
    category: 'KEUANGAN',
    author: 'Tim Redaksi',
    publishedAt: '2024-01-13',
    readTime: '7 min read',
    views: 2100,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
    isFeatured: true,
  },
]

const latestNews = [
  {
    id: 4,
    title: 'BPS: Nilai Impor Indonesia Tembus 19,33 Miliar Dolar AS, Naik 4,28 Persen Pada Juni 2025',
    excerpt: 'Badan Pusat Statistik melaporkan peningkatan signifikan dalam nilai impor Indonesia yang mencapai 19,33 miliar dolar AS.',
    category: 'EKONOMI',
    author: 'Tim Redaksi',
    publishedAt: '2024-01-12',
    readTime: '4 min read',
    views: 750,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop',
  },
  {
    id: 5,
    title: 'Pajak Kripto: Antara Inovasi Digital Dan Kewajiban Fiskal',
    excerpt: 'Analisis mendalam tentang bagaimana teknologi blockchain dan aset kripto mempengaruhi sistem perpajakan Indonesia.',
    category: 'PAJAK',
    author: 'Pak Jaka',
    publishedAt: '2024-01-11',
    readTime: '8 min read',
    views: 1800,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
  },
  {
    id: 6,
    title: 'Menakar Kesiapan Infrastruktur Digital Indonesia Di PMK 37/2025',
    excerpt: 'Evaluasi kesiapan infrastruktur digital Indonesia dalam menghadapi implementasi Peraturan Menteri Keuangan 37/2025.',
    category: 'KEUANGAN',
    author: 'Pak Jaka',
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    views: 1200,
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop',
  },
]

const categories = ['PAJAK', 'EKONOMI', 'KEUANGAN']

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotification, setShowNotification] = useState(true)

  const filteredArticles = [...featuredArticles, ...latestNews].filter(article => {
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Berita Pajak Indonesia Online Hari Ini - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Berita terkini seputar pajak, ekonomi, dan keuangan Indonesia dari Taxonomy Knowledge Hub." />
      </Helmet>

      {/* Navigation Bar seperti pajak.com */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo dan Menu */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Taxonomy</span>
              </div>
              
              {/* Navigation Menu */}
              <div className="hidden md:flex items-center space-x-6">
                {categories.map((category) => (
                  <div key={category} className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium py-2">
                      <span>{category}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* Dropdown menu bisa ditambahkan di sini */}
                  </div>
                ))}
              </div>
            </div>

            {/* Search dan User */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Banner seperti pajak.com */}
      {showNotification && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <p className="text-blue-800 text-sm font-medium">
                Aktifkan notifikasi dan jadi yang pertama mendapatkan informasi terbaru TAXONOMY.COM
              </p>
              <div className="flex items-center space-x-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  TIDAK
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-medium hover:bg-blue-700">
                  YA
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category */}
                <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded mb-2">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Latest News Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">BERITA TERBARU</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.slice(0, 3).map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded mb-2">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* From Pak Jaka Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">DARI SOBAT PAK JAKA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.slice(3).map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded mb-2">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Notification Bell */}
      <div className="fixed bottom-6 left-6 z-50">
        <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </>
  )
} 