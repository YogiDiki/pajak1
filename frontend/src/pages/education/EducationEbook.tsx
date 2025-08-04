import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  Download, 
  BookOpen, 
  Search, 
  Filter,
  FileText,
  Calendar,
  User,
  Eye,
  Star
} from 'lucide-react'

// Mock data for e-books
const ebooks = [
  {
    id: 1,
    title: 'Panduan Lengkap PPh 21 untuk Karyawan',
    description: 'Buku panduan komprehensif tentang perhitungan dan pelaporan PPh 21 untuk karyawan.',
    category: 'Pajak',
    author: 'Tim Ahli Pajak',
    publishedAt: '2024-08-01T10:00:00Z',
    downloads: 1247,
    rating: 4.8,
    pages: 156,
    fileSize: '2.4 MB',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['PPh 21', 'Karyawan', 'Panduan']
  },
  {
    id: 2,
    title: 'Strategi Investasi di Era Digital',
    description: 'Panduan investasi modern yang mengintegrasikan teknologi digital dalam pengambilan keputusan.',
    category: 'Investasi',
    author: 'Sarah Johnson',
    publishedAt: '2024-07-28T14:30:00Z',
    downloads: 892,
    rating: 4.6,
    pages: 203,
    fileSize: '3.1 MB',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['Investasi', 'Digital', 'Strategi']
  },
  {
    id: 3,
    title: 'Ekonomi Indonesia: Analisis dan Proyeksi 2024',
    description: 'Analisis mendalam tentang kondisi ekonomi Indonesia dan proyeksi untuk tahun 2024.',
    category: 'Ekonomi & Bisnis',
    author: 'Dr. Ahmad Fauzi',
    publishedAt: '2024-07-25T09:15:00Z',
    downloads: 1567,
    rating: 4.9,
    pages: 278,
    fileSize: '4.2 MB',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['Ekonomi', 'Analisis', '2024']
  },
  {
    id: 4,
    title: 'Panduan Praktis PPN untuk UMKM',
    description: 'Buku panduan praktis tentang pengelolaan PPN khusus untuk Usaha Mikro, Kecil, dan Menengah.',
    category: 'Pajak',
    author: 'Budi Santoso',
    publishedAt: '2024-07-20T16:45:00Z',
    downloads: 2034,
    rating: 4.7,
    pages: 134,
    fileSize: '1.8 MB',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['PPN', 'UMKM', 'Praktis']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'Ekonomi & Bisnis', value: 'ekonomi' },
  { name: 'Investasi', value: 'investasi' },
  { name: 'Pajak', value: 'pajak' }
]

export default function EducationEbook() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesCategory = selectedCategory === 'all' || 
      ebook.category.toLowerCase().includes(selectedCategory)
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedEbooks = [...filteredEbooks].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'popular':
        return b.downloads - a.downloads
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <>
      <Helmet>
        <title>E-book - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Download e-book gratis seputar ekonomi, investasi, dan perpajakan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">E-book</h1>
                  <p className="text-gray-600">Download e-book gratis seputar ekonomi, investasi, dan perpajakan</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari e-book..."
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedEbooks.map((ebook) => (
              <div key={ebook.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={ebook.image}
                    alt={ebook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ebook.category === 'Ekonomi & Bisnis' 
                        ? 'bg-blue-100 text-blue-800' 
                        : ebook.category === 'Investasi'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {ebook.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {ebook.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {ebook.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{ebook.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{ebook.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {ebook.pages} halaman
                      </span>
                      <span>{ebook.fileSize}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Download className="w-3 h-3" />
                      <span>{ebook.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {ebook.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download Gratis
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedEbooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada e-book ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 