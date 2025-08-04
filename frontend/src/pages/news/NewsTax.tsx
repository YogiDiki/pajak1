import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark,
  FileText,
  Calculator,
  Receipt
} from 'lucide-react'

// Mock data for Tax news
const taxNews = [
  {
    id: 1,
    title: 'Perubahan Tarif PPh 21 Tahun 2024',
    excerpt: 'Pemerintah mengumumkan perubahan tarif PPh 21 untuk tahun 2024 yang akan berlaku mulai Januari mendatang.',
    category: 'PPh',
    author: 'Tim Redaksi',
    publishedAt: '2024-08-04T09:30:00Z',
    readTime: '7 menit',
    views: 3456,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['PPh 21', 'Tarif', '2024']
  },
  {
    id: 2,
    title: 'PPN 11% Mulai Berlaku Januari 2025',
    excerpt: 'Pajak Pertambahan Nilai (PPN) akan dinaikkan dari 10% menjadi 11% mulai Januari 2025.',
    category: 'PPN',
    author: 'Ahmad Fauzi',
    publishedAt: '2024-08-03T14:15:00Z',
    readTime: '5 menit',
    views: 2891,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    tags: ['PPN', 'Tarif', '2025']
  },
  {
    id: 3,
    title: 'Update Ketentuan Umum Perpajakan (KUP)',
    excerpt: 'Direktorat Jenderal Pajak mengeluarkan update terbaru untuk ketentuan umum perpajakan.',
    category: 'KUP',
    author: 'Budi Santoso',
    publishedAt: '2024-08-02T11:20:00Z',
    readTime: '6 menit',
    views: 1923,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['KUP', 'DJP', 'Update']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'PPh', value: 'pph' },
  { name: 'PPN', value: 'ppn' },
  { name: 'KUP', value: 'kup' },
  { name: 'Coretax', value: 'coretax' },
  { name: 'Lainnya', value: 'lainnya' }
]

export default function NewsTax() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = taxNews.filter(news => {
    const matchesCategory = selectedCategory === 'all' || 
      news.category.toLowerCase() === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Pajak - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Berita terkini seputar perpajakan dan regulasi pajak." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Receipt className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Pajak</h1>
                  <p className="text-gray-600">Berita terkini seputar perpajakan dan regulasi pajak</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari berita pajak..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-red-600 text-white'
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
                            news.category === 'PPh' 
                              ? 'bg-blue-100 text-blue-800' 
                              : news.category === 'PPN'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
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
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                          <Link to={`/news/tax/${news.id}`}>
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
                    {taxNews.slice(0, 3).map((news) => (
                      <div key={news.id} className="flex space-x-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-red-600 transition-colors">
                            <Link to={`/news/tax/${news.id}`}>
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
                            ? 'bg-red-50 text-red-700'
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
                    {['PPh 21', 'PPN', 'KUP', 'DJP', 'Tarif', 'Regulasi'].map((tag) => (
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