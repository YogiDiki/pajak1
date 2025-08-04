import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'

// Mock data for helpdesk tickets
const helpdeskTickets = [
  {
    id: 1,
    subject: 'Pertanyaan tentang PPh 21',
    description: 'Saya ingin bertanya tentang perhitungan PPh 21 untuk karyawan dengan gaji di atas PTKP.',
    category: 'Pajak',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-08-04T10:30:00Z',
    updatedAt: '2024-08-04T14:15:00Z',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    assignedTo: 'Customer Service 1',
    responseTime: '2 jam',
    attachments: ['dokumen.pdf']
  },
  {
    id: 2,
    subject: 'Kesulitan mengakses e-book',
    description: 'Saya tidak bisa mengunduh e-book yang sudah saya pilih. Apakah ada masalah dengan sistem?',
    category: 'Teknis',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-08-03T15:20:00Z',
    updatedAt: '2024-08-04T09:30:00Z',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    assignedTo: 'Technical Support',
    responseTime: '1 jam',
    attachments: []
  },
  {
    id: 3,
    subject: 'Pertanyaan tentang investasi',
    description: 'Saya ingin mengetahui lebih lanjut tentang investasi reksadana yang aman untuk pemula.',
    category: 'Investasi',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-08-02T11:45:00Z',
    updatedAt: '2024-08-03T16:20:00Z',
    customer: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    assignedTo: 'Investment Advisor',
    responseTime: '30 menit',
    attachments: []
  }
]

const categories = [
  { name: 'Pajak', value: 'pajak' },
  { name: 'Teknis', value: 'teknis' },
  { name: 'Investasi', value: 'investasi' },
  { name: 'Akun', value: 'akun' },
  { name: 'Konten', value: 'konten' }
]

const priorities = [
  { name: 'Rendah', value: 'low', color: 'bg-green-100 text-green-800' },
  { name: 'Sedang', value: 'medium', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Tinggi', value: 'high', color: 'bg-red-100 text-red-800' }
]

const staffMembers = [
  'Customer Service 1',
  'Customer Service 2',
  'Technical Support',
  'Investment Advisor',
  'Tax Specialist'
]

export default function AdminHelpdesk() {
  const [activeTab, setActiveTab] = useState('tickets')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedStaff, setSelectedStaff] = useState('all')

  const filteredTickets = helpdeskTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus
    const matchesStaff = selectedStaff === 'all' || ticket.assignedTo === selectedStaff
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus && matchesStaff
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Open</span>
      case 'in_progress':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">In Progress</span>
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Resolved</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Closed</span>
    }
  }

  const getPriorityBadge = (priority: string) => {
    const priorityData = priorities.find(p => p.value === priority)
    return priorityData ? (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityData.color}`}>
        {priorityData.name}
      </span>
    ) : null
  }

  return (
    <>
      <Helmet>
        <title>Admin Helpdesk - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Kelola tiket helpdesk dan dukungan pelanggan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Helpdesk</h1>
                  <p className="text-gray-600">Kelola tiket helpdesk dan dukungan pelanggan</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Response Time Average</p>
                    <p className="text-lg font-semibold text-green-600">1.5 jam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'tickets', name: 'Tiket', icon: MessageSquare },
                { id: 'staff', name: 'Staff', icon: User },
                { id: 'analytics', name: 'Analytics', icon: Clock }
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
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Cari tiket..."
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
                        <option key={category.value} value={category.value}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Semua Prioritas</option>
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>{priority.name}</option>
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
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedStaff}
                      onChange={(e) => setSelectedStaff(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Semua Staff</option>
                      {staffMembers.map((staff) => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
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

              {/* Tickets Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Tiket</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tiket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pelanggan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategori
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prioritas
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Response Time
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                              <div className="text-sm text-gray-900">{ticket.subject}</div>
                              <div className="text-sm text-gray-500">{ticket.description.substring(0, 50)}...</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{ticket.customer}</div>
                              <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ticket.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPriorityBadge(ticket.priority)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(ticket.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ticket.assignedTo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ticket.responseTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <XCircle className="w-4 h-4" />
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

          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Staff</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Tambah Staff
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staffMembers.map((staff, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{staff}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {staff.toLowerCase().replace(' ', '.')}@taxonomyhub.com
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          +62 21 1234 567{index + 1}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {Math.floor(Math.random() * 10) + 5} tiket/hari
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
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

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Tiket</p>
                      <p className="text-2xl font-bold text-gray-900">1,234</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-gray-900">1,089</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-gray-900">1.5h</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Staff</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 