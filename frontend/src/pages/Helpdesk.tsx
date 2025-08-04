import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

// Mock data for helpdesk tickets
const tickets = [
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
    attachments: ['dokumen.pdf'],
    responses: [
      {
        id: 1,
        from: 'Customer Service',
        message: 'Terima kasih atas pertanyaan Anda. Tim kami akan segera menangani pertanyaan Anda.',
        timestamp: '2024-08-04T11:00:00Z',
        isStaff: true
      }
    ]
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
    attachments: [],
    responses: [
      {
        id: 1,
        from: 'Customer Service',
        message: 'Kami telah menerima laporan Anda dan sedang menangani masalah ini.',
        timestamp: '2024-08-03T16:00:00Z',
        isStaff: true
      },
      {
        id: 2,
        from: 'Jane Smith',
        message: 'Terima kasih atas responsnya. Kapan masalah ini bisa diselesaikan?',
        timestamp: '2024-08-04T08:00:00Z',
        isStaff: false
      }
    ]
  }
]

const categories = [
  { name: 'Pajak', value: 'pajak' },
  { name: 'Teknis', value: 'teknis' },
  { name: 'Akun', value: 'akun' },
  { name: 'Konten', value: 'konten' },
  { name: 'Lainnya', value: 'lainnya' }
]

const priorities = [
  { name: 'Rendah', value: 'low', color: 'bg-green-100 text-green-800' },
  { name: 'Sedang', value: 'medium', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Tinggi', value: 'high', color: 'bg-red-100 text-red-800' }
]

export default function Helpdesk() {
  const [activeTab, setActiveTab] = useState('new_ticket')
  const [selectedCategory, setSelectedCategory] = useState('pajak')
  const [selectedPriority, setSelectedPriority] = useState('medium')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket submission
    console.log('Submitting ticket:', {
      category: selectedCategory,
      priority: selectedPriority,
      subject,
      description,
      attachments
    })
  }

  return (
    <>
      <Helmet>
        <title>Helpdesk - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Dapatkan bantuan dan dukungan untuk pertanyaan seputar perpajakan dan investasi." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Helpdesk</h1>
                  <p className="text-gray-600">Dapatkan bantuan dan dukungan untuk pertanyaan Anda</p>
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
                { id: 'new_ticket', name: 'Buat Tiket Baru', icon: FileText },
                { id: 'my_tickets', name: 'Tiket Saya', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
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
          {activeTab === 'new_ticket' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* New Ticket Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Buat Tiket Baru</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategori
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prioritas
                        </label>
                        <select
                          value={selectedPriority}
                          onChange={(e) => setSelectedPriority(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          {priorities.map((priority) => (
                            <option key={priority.value} value={priority.value}>
                              {priority.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjek
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Masukkan subjek pertanyaan Anda"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Jelaskan detail pertanyaan atau masalah Anda"
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lampiran
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop file di sini, atau klik untuk memilih file
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                        >
                          Pilih File
                        </label>
                      </div>
                      {attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">File yang dipilih:</p>
                          <ul className="mt-1 space-y-1">
                            {attachments.map((file, index) => (
                              <li key={index} className="text-sm text-gray-500">
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Tiket
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Telepon</p>
                          <p className="text-sm text-gray-600">+62 21 1234 5678</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email</p>
                          <p className="text-sm text-gray-600">support@taxonomyhub.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Jam Operasional</p>
                          <p className="text-sm text-gray-600">Senin - Jumat: 08:00 - 17:00</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ</h3>
                    <div className="space-y-3">
                      <div className="border-b border-gray-200 pb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          Bagaimana cara menghitung PPh 21?
                        </h4>
                        <p className="text-sm text-gray-600">
                          PPh 21 dihitung berdasarkan penghasilan bruto dikurangi PTKP dan pengurangan lainnya.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          Kapan batas waktu pelaporan SPT?
                        </h4>
                        <p className="text-sm text-gray-600">
                          Batas waktu pelaporan SPT Tahunan adalah 31 Maret tahun berikutnya.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          Bagaimana cara mengunduh e-book?
                        </h4>
                        <p className="text-sm text-gray-600">
                          Klik tombol "Download Gratis" pada e-book yang Anda inginkan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'my_tickets' && (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>#{ticket.id}</span>
                          <span>{ticket.customer}</span>
                          <span>{new Date(ticket.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Riwayat Percakapan</h4>
                      <div className="space-y-3">
                        {ticket.responses.map((response) => (
                          <div key={response.id} className={`flex ${response.isStaff ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              response.isStaff 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'bg-green-600 text-white'
                            }`}>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs font-medium">{response.from}</span>
                                <span className="text-xs opacity-75">
                                  {new Date(response.timestamp).toLocaleString('id-ID')}
                                </span>
                              </div>
                              <p className="text-sm">{response.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Tulis balasan..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
} 