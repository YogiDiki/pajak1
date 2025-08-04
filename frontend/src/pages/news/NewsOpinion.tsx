import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark,
  MessageSquare,
  User,
  ThumbsUp
} from 'lucide-react'

// Mock data for Opinion news
const opinionNews = [
  {
    id: 1,
    title: 'Opini: Dampak Kenaikan PPN terhadap Ekonomi Indonesia',
    excerpt: 'Analisis mendalam tentang dampak kenaikan PPN dari 10% menjadi 11% terhadap perekonomian Indonesia.',
    category: 'Pajak',
    author: 'Dr. Ahmad Fauzi',
    publishedAt: '2024-08-04T10:30:00Z',
    readTime: '8 menit',
    views: 2156,
    comments: 45,
    likes: 123,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['PPN', 'Ekonomi', 'Analisis']
  },
  {
    id: 2,
    title: 'Perspektif: Masa Depan Investasi di Era Digital',
    excerpt: 'Bagaimana teknologi digital mengubah landscape investasi dan peluang yang terbuka untuk investor.',
    category: 'Investasi',
    author: 'Sarah Johnson',
    publishedAt: '2024-08-03T14:15:00Z',
    readTime: '6 menit',
    views: 1892,
    comments: 32,
    likes: 98,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    tags: ['Investasi', 'Digital', 'Teknologi']
  },
  {
    id: 3,
    title: 'Komentar: Reformasi Pajak untuk Pertumbuhan Ekonomi',
    excerpt: 'Pandangan tentang reformasi sistem perpajakan yang diperlukan untuk mendorong pertumbuhan ekonomi.',
    category: 'Ekonomi & Bisnis',
    author: 'Prof. Budi Santoso',
    publishedAt: '2024-08-02T09:45:00Z',
    readTime: '7 menit',
    views: 1678,
    comments: 28,
    likes: 87,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: ['Reformasi', 'Pajak', 'Pertumbuhan']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'Ekonomi & Bisnis', value: 'ekonomi' },
  { name: 'Investasi', value: 'investasi' },
  { name: 'Pajak', value: 'pajak' }
]

export default function NewsOpinion() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = opinionNews.filter(news => {
    const matchesCategory = selectedCategory === 'all' || 
      news.category.toLowerCase().includes(selectedCategory)
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Opini - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Opini dan analisis mendalam seputar ekonomi, investasi, dan perpajakan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Opini</h1>
                  <p className="text-gray-600">Opini dan analisis mendalam dari para ahli</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari opini..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-purple-600 text-white'
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
                            news.category === 'Ekonomi & Bisnis' 
                              ? 'bg-blue-100 text-blue-800' 
                              : news.category === 'Investasi'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
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
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                          <Link to={`/news/opinion/${news.id}`}>
                            {news.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {news.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {news.author}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {news.readTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {news.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {news.comments}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {news.likes}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {news.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
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
                {/* Popular Opinions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Opini Populer</h3>
                  <div className="space-y-4">
                    {opinionNews.slice(0, 3).map((news) => (
                      <div key={news.id} className="flex space-x-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors">
                            <Link to={`/news/opinion/${news.id}`}>
                              {news.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {news.author} • {new Date(news.publishedAt).toLocaleDateString('id-ID')}
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
                            ? 'bg-purple-50 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Authors */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Penulis Terkemuka</h3>
                  <div className="space-y-3">
                    {['Dr. Ahmad Fauzi', 'Sarah Johnson', 'Prof. Budi Santoso'].map((author) => (
                      <div key={author} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-700">{author}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Populer</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Analisis', 'Reformasi', 'Digital', 'Pertumbuhan', 'Teknologi', 'Regulasi'].map((tag) => (
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