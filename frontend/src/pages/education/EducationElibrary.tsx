import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  Search, 
  Filter,
  BookOpen,
  Calendar,
  User,
  Eye,
  Star,
  Book,
  Database,
  Archive,
  TrendingUp
} from 'lucide-react'

// Mock data for e-library
const libraryItems = [
  {
    id: 1,
    title: 'Kamus Perpajakan Indonesia',
    description: 'Kamus lengkap istilah-istilah perpajakan yang digunakan di Indonesia dengan penjelasan detail.',
    category: 'Pajak',
    type: 'kamus',
    author: 'Tim Ahli Pajak',
    publishedAt: '2024-08-01T10:00:00Z',
    views: 5678,
    rating: 4.9,
    entries: 1250,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['Kamus', 'Pajak', 'Istilah']
  },
  {
    id: 2,
    title: 'Database Regulasi Investasi',
    description: 'Database lengkap regulasi investasi di Indonesia dari tahun 2010 hingga sekarang.',
    category: 'Investasi',
    type: 'database',
    author: 'Otoritas Jasa Keuangan',
    publishedAt: '2024-07-28T14:30:00Z',
    views: 4234,
    rating: 4.8,
    entries: 890,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['Database', 'Regulasi', 'Investasi']
  },
  {
    id: 3,
    title: 'Arsip Laporan Ekonomi 2010-2024',
    description: 'Arsip lengkap laporan ekonomi Indonesia dari tahun 2010 hingga 2024 dalam format digital.',
    category: 'Ekonomi & Bisnis',
    type: 'arsip',
    author: 'Bank Indonesia',
    publishedAt: '2024-07-25T09:15:00Z',
    views: 6789,
    rating: 4.7,
    entries: 156,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['Arsip', 'Laporan', 'Ekonomi']
  },
  {
    id: 4,
    title: 'Ensiklopedia Pajak Digital',
    description: 'Ensiklopedia komprehensif tentang sistem perpajakan Indonesia dengan ilustrasi dan contoh.',
    category: 'Pajak',
    type: 'ensiklopedia',
    author: 'Direktorat Jenderal Pajak',
    publishedAt: '2024-07-20T16:45:00Z',
    views: 3456,
    rating: 4.9,
    entries: 2340,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['Ensiklopedia', 'Pajak', 'Digital']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'Ekonomi & Bisnis', value: 'ekonomi' },
  { name: 'Investasi', value: 'investasi' },
  { name: 'Pajak', value: 'pajak' }
]

const libraryTypes = [
  { name: 'Semua', value: 'all', icon: BookOpen },
  { name: 'Kamus', value: 'kamus', icon: Book },
  { name: 'Database', value: 'database', icon: Database },
  { name: 'Arsip', value: 'arsip', icon: Archive },
  { name: 'Ensiklopedia', value: 'ensiklopedia', icon: BookOpen }
]

export default function EducationElibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const filteredItems = libraryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase().includes(selectedCategory)
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'popular':
        return b.views - a.views
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kamus':
        return <Book className="w-4 h-4 text-blue-500" />
      case 'database':
        return <Database className="w-4 h-4 text-green-500" />
      case 'arsip':
        return <Archive className="w-4 h-4 text-purple-500" />
      case 'ensiklopedia':
        return <BookOpen className="w-4 h-4 text-orange-500" />
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <>
      <Helmet>
        <title>E-Library - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Akses perpustakaan digital dengan kamus, database, dan arsip seputar ekonomi, investasi, dan perpajakan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">E-Library</h1>
                  <p className="text-gray-600">Perpustakaan digital dengan kamus, database, dan arsip</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari di perpustakaan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Library Type Filter */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex space-x-4">
                {libraryTypes.map((libraryType) => (
                  <button
                    key={libraryType.value}
                    onClick={() => setSelectedType(libraryType.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedType === libraryType.value
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <libraryType.icon className="w-4 h-4" />
                    <span>{libraryType.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === 'Ekonomi & Bisnis' 
                        ? 'bg-blue-100 text-blue-800' 
                        : item.category === 'Investasi'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {item.entries} entri
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Akses Library
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada item ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik Perpustakaan</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {libraryItems.reduce((sum, item) => sum + item.entries, 0).toLocaleString()}
                </div>
                <p className="text-gray-600">Total Entri</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {libraryItems.length}
                </div>
                <p className="text-gray-600">Koleksi</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {libraryItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </div>
                <p className="text-gray-600">Total Akses</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {libraryItems.length}
                </div>
                <p className="text-gray-600">Kategori</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 