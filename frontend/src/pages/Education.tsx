import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Search, Filter, Download, Play, Star, BookOpen, Video, FileText } from 'lucide-react'

// Mock data
const ebooks = [
  {
    id: 1,
    title: 'Panduan Lengkap PPh 21 untuk Karyawan',
    description: 'E-book komprehensif tentang perhitungan dan pelaporan PPh 21 untuk karyawan tetap dan tidak tetap.',
    category: 'Pajak',
    fileSize: '2.5 MB',
    downloadCount: 1250,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    tags: ['PPh 21', 'Karyawan', 'Perpajakan'],
  },
  {
    id: 2,
    title: 'Strategi Investasi Saham untuk Pemula',
    description: 'Panduan step-by-step untuk memulai investasi saham dengan strategi yang aman dan menguntungkan.',
    category: 'Investasi',
    fileSize: '3.1 MB',
    downloadCount: 890,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
    tags: ['Saham', 'Investasi', 'Pemula'],
  },
]

const videos = [
  {
    id: 1,
    title: 'Cara Menghitung PPh 21 dengan Excel',
    description: 'Tutorial lengkap menggunakan Excel untuk menghitung PPh 21 dengan mudah dan akurat.',
    category: 'Pajak',
    duration: '15:30',
    viewCount: 3200,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    tags: ['Excel', 'PPh 21', 'Tutorial'],
  },
  {
    id: 2,
    title: 'Analisis Fundamental Saham',
    description: 'Belajar menganalisis fundamental perusahaan untuk keputusan investasi yang tepat.',
    category: 'Investasi',
    duration: '22:15',
    viewCount: 1800,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
    tags: ['Analisis', 'Fundamental', 'Saham'],
  },
]

const categories = ['Semua', 'Pajak', 'Ekonomi', 'Bisnis', 'Investasi']
const types = ['Semua', 'E-book', 'Video']

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedType, setSelectedType] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesCategory = selectedCategory === 'Semua' || ebook.category === selectedCategory
    const matchesType = selectedType === 'Semua' || selectedType === 'E-book'
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ebook.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'Semua' || video.category === selectedCategory
    const matchesType = selectedType === 'Semua' || selectedType === 'Video'
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Edukasi - Taxonomy Knowledge Hub</title>
        <meta name="description" content="E-library dan e-learning untuk pajak, ekonomi, bisnis, dan investasi dari Taxonomy Knowledge Hub." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              E-Library & E-Learning
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Akses ribuan e-book, video tutorial, dan materi edukasi berkualitas tinggi untuk meningkatkan pengetahuan Anda
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari materi edukasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-secondary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-books Section */}
      {filteredEbooks.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center space-x-2 mb-8">
              <BookOpen className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">E-Books</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEbooks.map((ebook) => (
                <div key={ebook.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={ebook.thumbnail}
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                        {ebook.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        {ebook.downloadCount}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {ebook.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {ebook.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{ebook.fileSize}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {ebook.rating}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ebook.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Download Button */}
                    <button className="w-full btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download E-book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      {filteredVideos.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center space-x-2 mb-8">
              <Video className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Video Tutorial</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div key={video.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-200 overflow-hidden relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                        {video.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FileText className="w-4 h-4 mr-1" />
                        {video.viewCount}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {video.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {video.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{video.duration}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {video.rating}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Watch Button */}
                    <button className="w-full btn-secondary">
                      <Play className="w-4 h-4 mr-2" />
                      Tonton Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredEbooks.length === 0 && filteredVideos.length === 0 && (
        <section className="py-20">
          <div className="container-custom text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada materi yang ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ingin Konten Edukasi Lebih Banyak?
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            Daftar sebagai member untuk mendapatkan akses ke ribuan e-book dan video tutorial premium.
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </>
  )
} 