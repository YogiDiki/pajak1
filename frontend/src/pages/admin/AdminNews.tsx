import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

// Mock data for admin news management
const newsArticles = [
  {
    id: 1,
    title: 'Pertumbuhan Ekonomi Indonesia Kuartal III 2024 Capai 5.17%',
    category: 'Ekonomi & Bisnis',
    subcategory: 'Nasional',
    author: 'Ahmad Fauzi',
    status: 'published',
    publishedAt: '2024-08-04T10:30:00Z',
    views: 1247,
    editor: 'Editor Ekonomi Nasional',
    jurnalis: 'Jurnalis 1'
  },
  {
    id: 2,
    title: 'Bank Indonesia Pertahankan Suku Bunga Acuan di 6.25%',
    category: 'Ekonomi & Bisnis',
    subcategory: 'Nasional',
    author: 'Budi Santoso',
    status: 'draft',
    publishedAt: null,
    views: 0,
    editor: 'Editor Ekonomi Nasional',
    jurnalis: 'Jurnalis 2'
  },
  {
    id: 3,
    title: 'Inflasi AS Juli 2024 Turun ke Level 3.2%',
    category: 'Ekonomi & Bisnis',
    subcategory: 'Internasional',
    author: 'Sarah Johnson',
    status: 'review',
    publishedAt: null,
    views: 0,
    editor: 'Editor Ekonomi Internasional',
    jurnalis: 'Jurnalis 3'
  }
]

const editors = [
  { id: 1, name: 'Editor Ekonomi Nasional', category: 'Ekonomi & Bisnis', status: 'active' },
  { id: 2, name: 'Editor Ekonomi Internasional', category: 'Ekonomi & Bisnis', status: 'active' },
  { id: 3, name: 'Editor Investasi Saham', category: 'Investasi', status: 'active' },
  { id: 4, name: 'Editor Pajak PPh', category: 'Pajak', status: 'inactive' }
]

const jurnalis = [
  { id: 1, name: 'Jurnalis 1', assignedEditor: 'Editor Ekonomi Nasional', status: 'active' },
  { id: 2, name: 'Jurnalis 2', assignedEditor: 'Editor Ekonomi Nasional', status: 'active' },
  { id: 3, name: 'Jurnalis 3', assignedEditor: 'Editor Ekonomi Internasional', status: 'active' }
]

const categories = [
  { name: 'Ekonomi & Bisnis', subcategories: ['Nasional', 'Internasional'] },
  { name: 'Investasi', subcategories: ['Saham', 'Lainnya'] },
  { name: 'Pajak', subcategories: ['PPh', 'PPN', 'KUP', 'Coretax', 'Lainnya'] },
  { name: 'Opini', subcategories: ['Ekonomi & Bisnis', 'Investasi', 'Pajak'] }
]

export default function AdminNews() {
  const [activeTab, setActiveTab] = useState('articles')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Published</span>
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Draft</span>
      case 'review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Review</span>
      default:
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Rejected</span>
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin News - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Kelola konten berita dan tim editorial." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin News</h1>
                  <p className="text-gray-600">Kelola konten berita dan tim editorial</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Artikel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'articles', name: 'Artikel', icon: FileText },
                { id: 'editors', name: 'Editor', icon: Users },
                { id: 'jurnalis', name: 'Jurnalis', icon: TrendingUp },
                { id: 'categories', name: 'Kategori', icon: Filter }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'articles' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Cari artikel..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Semua Kategori</option>
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Semua Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="review">Review</option>
                    </select>
                  </div>
                  <div>
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Filter className="w-4 h-4 inline mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Articles Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Artikel</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Artikel
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategori
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Penulis
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{article.title}</div>
                              <div className="text-sm text-gray-500">{article.editor} • {article.jurnalis}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{article.category}</div>
                            <div className="text-sm text-gray-500">{article.subcategory}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {article.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(article.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {article.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.publishedAt 
                              ? new Date(article.publishedAt).toLocaleDateString('id-ID')
                              : '-'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Editor</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Editor
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {editors.map((editor) => (
                    <div key={editor.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{editor.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          editor.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {editor.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{editor.category}</p>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                          Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jurnalis' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Jurnalis</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Jurnalis
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jurnalis.map((jurnalis) => (
                    <div key={jurnalis.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{jurnalis.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Editor: {jurnalis.assignedEditor}</p>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                          Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Kategori Berita</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kategori
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map((category) => (
                    <div key={category.name} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{category.name}</h4>
                      <div className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{subcategory}</span>
                            <div className="flex space-x-1">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Edit className="w-3 h-3" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 