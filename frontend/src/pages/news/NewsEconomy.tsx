import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark,
  TrendingUp,
  Building,
  DollarSign
} from 'lucide-react'

// Mock data for Economy & Business news
const economyNews = [
  {
    id: 1,
    title: 'Pertumbuhan Ekonomi Indonesia Kuartal III 2024 Capai 5.17%',
    excerpt: 'Badan Pusat Statistik (BPS) melaporkan pertumbuhan ekonomi Indonesia pada kuartal III 2024 mencapai 5.17% year-on-year (yoy).',
    category: 'Nasional',
    author: 'Tim Redaksi',
    publishedAt: '2024-08-04T10:30:00Z',
    readTime: '5 menit',
    views: 1247,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['Ekonomi', 'Pertumbuhan', 'BPS']
  },
  {
    id: 2,
    title: 'Bank Indonesia Pertahankan Suku Bunga Acuan di 6.25%',
    excerpt: 'Bank Indonesia memutuskan untuk mempertahankan suku bunga acuan (BI Rate) di level 6.25% pada Rapat Dewan Gubernur bulan ini.',
    category: 'Nasional',
    author: 'Ahmad Fauzi',
    publishedAt: '2024-08-03T14:15:00Z',
    readTime: '4 menit',
    views: 892,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    tags: ['Bank Indonesia', 'Suku Bunga', 'Moneter']
  },
  {
    id: 3,
    title: 'Inflasi AS Juli 2024 Turun ke Level 3.2%',
    excerpt: 'Biro Statistik Tenaga Kerja AS melaporkan inflasi tahunan turun ke 3.2% pada Juli 2024, memberikan sinyal positif untuk ekonomi global.',
    category: 'Internasional',
    author: 'Sarah Johnson',
    publishedAt: '2024-08-02T09:45:00Z',
    readTime: '6 menit',
    views: 1567,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['AS', 'Inflasi', 'Ekonomi Global']
  },
  {
    id: 4,
    title: 'Pemerintah Targetkan Investasi Rp 1.400 Triliun di 2025',
    excerpt: 'Pemerintah Indonesia menargetkan realisasi investasi sebesar Rp 1.400 triliun pada tahun 2025 untuk mendorong pertumbuhan ekonomi.',
    category: 'Nasional',
    author: 'Budi Santoso',
    publishedAt: '2024-08-01T16:20:00Z',
    readTime: '7 menit',
    views: 2034,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    tags: ['Investasi', 'Pemerintah', 'Pertumbuhan']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'Nasional', value: 'nasional' },
  { name: 'Internasional', value: 'internasional' }
]

export default function NewsEconomy() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = economyNews.filter(news => {
    const matchesCategory = selectedCategory === 'all' || 
      news.category.toLowerCase() === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Ekonomi & Bisnis - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Berita terkini seputar ekonomi dan bisnis Indonesia dan dunia." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Ekonomi & Bisnis</h1>
                  <p className="text-gray-600">Berita terkini seputar ekonomi dan bisnis</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari berita ekonomi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {filteredNews.map((news) => (
                  <article key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            news.category === 'Nasional' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {news.category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(news.publishedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          <Link to={`/news/economy/${news.id}`}>
                            {news.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {news.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {news.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {news.views.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Popular News */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Berita Populer</h3>
                  <div className="space-y-4">
                    {economyNews.slice(0, 3).map((news) => (
                      <div key={news.id} className="flex space-x-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                            <Link to={`/news/economy/${news.id}`}>
                              {news.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(news.publishedAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori</h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Populer</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Ekonomi', 'Bisnis', 'Investasi', 'Pertumbuhan', 'Inflasi', 'Bank Indonesia'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 