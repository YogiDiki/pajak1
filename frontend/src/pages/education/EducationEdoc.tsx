import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  Download, 
  FileText, 
  Search, 
  Filter,
  Calendar,
  User,
  Eye,
  Star,
  File,
  FileImage,
  FileVideo
} from 'lucide-react'

// Mock data for e-docs
const edocs = [
  {
    id: 1,
    title: 'Peraturan PPh 21 Terbaru 2024',
    description: 'Dokumen lengkap peraturan terbaru tentang PPh 21 yang berlaku tahun 2024.',
    category: 'Pajak',
    type: 'pdf',
    author: 'Direktorat Jenderal Pajak',
    publishedAt: '2024-08-01T10:00:00Z',
    downloads: 2156,
    rating: 4.9,
    fileSize: '1.2 MB',
    pages: 45,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['PPh 21', 'Peraturan', '2024']
  },
  {
    id: 2,
    title: 'Laporan Ekonomi Indonesia Q3 2024',
    description: 'Laporan lengkap kondisi ekonomi Indonesia pada kuartal ketiga tahun 2024.',
    category: 'Ekonomi & Bisnis',
    type: 'pdf',
    author: 'Bank Indonesia',
    publishedAt: '2024-07-28T14:30:00Z',
    downloads: 1892,
    rating: 4.7,
    fileSize: '3.5 MB',
    pages: 78,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['Ekonomi', 'Laporan', 'Q3 2024']
  },
  {
    id: 3,
    title: 'Panduan Investasi Saham untuk Pemula',
    description: 'Dokumen panduan lengkap untuk investor pemula yang ingin mulai berinvestasi di saham.',
    category: 'Investasi',
    type: 'pdf',
    author: 'Otoritas Jasa Keuangan',
    publishedAt: '2024-07-25T09:15:00Z',
    downloads: 3456,
    rating: 4.8,
    fileSize: '2.8 MB',
    pages: 92,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=500&fit=crop',
    tags: ['Investasi', 'Saham', 'Pemula']
  },
  {
    id: 4,
    title: 'Infografis Perubahan Tarif PPN 2025',
    description: 'Infografis visual yang menjelaskan perubahan tarif PPN dari 11% menjadi 12% di tahun 2025.',
    category: 'Pajak',
    type: 'image',
    author: 'Tim Visual Taxonomy',
    publishedAt: '2024-07-20T16:45:00Z',
    downloads: 1234,
    rating: 4.6,
    fileSize: '2.1 MB',
    pages: 1,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    tags: ['PPN', 'Infografis', '2025']
  }
]

const categories = [
  { name: 'Semua', value: 'all' },
  { name: 'Ekonomi & Bisnis', value: 'ekonomi' },
  { name: 'Investasi', value: 'investasi' },
  { name: 'Pajak', value: 'pajak' }
]

const fileTypes = [
  { name: 'Semua', value: 'all', icon: FileText },
  { name: 'PDF', value: 'pdf', icon: FileText },
  { name: 'Gambar', value: 'image', icon: FileImage },
  { name: 'Video', value: 'video', icon: FileVideo }
]

export default function EducationEdoc() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFileType, setSelectedFileType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const filteredEdocs = edocs.filter(edoc => {
    const matchesCategory = selectedCategory === 'all' || 
      edoc.category.toLowerCase().includes(selectedCategory)
    const matchesFileType = selectedFileType === 'all' || edoc.type === selectedFileType
    const matchesSearch = edoc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edoc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesFileType && matchesSearch
  })

  const sortedEdocs = [...filteredEdocs].sort((a, b) => {
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

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />
      case 'image':
        return <FileImage className="w-4 h-4 text-green-500" />
      case 'video':
        return <FileVideo className="w-4 h-4 text-blue-500" />
      default:
        return <File className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <>
      <Helmet>
        <title>E-Doc - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Download dokumen resmi dan laporan seputar ekonomi, investasi, dan perpajakan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">E-Doc</h1>
                  <p className="text-gray-600">Download dokumen resmi dan laporan terkini</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari dokumen..."
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* File Type Filter */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex space-x-4">
                {fileTypes.map((fileType) => (
                  <button
                    key={fileType.value}
                    onClick={() => setSelectedFileType(fileType.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFileType === fileType.value
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <fileType.icon className="w-4 h-4" />
                    <span>{fileType.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedEdocs.map((edoc) => (
              <div key={edoc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={edoc.image}
                    alt={edoc.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      edoc.category === 'Ekonomi & Bisnis' 
                        ? 'bg-blue-100 text-blue-800' 
                        : edoc.category === 'Investasi'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {edoc.category}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    {getFileTypeIcon(edoc.type)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {edoc.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {edoc.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{edoc.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{edoc.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {edoc.pages} halaman
                      </span>
                      <span>{edoc.fileSize}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Download className="w-3 h-3" />
                      <span>{edoc.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {edoc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedEdocs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 