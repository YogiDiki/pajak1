import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut,
  TrendingUp,
  Eye,
  Download,
  Star,
  BarChart3,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  Search,
  Bell,
  Menu
} from 'lucide-react'

// Mock data
const stats = [
  { 
    name: 'Artikel Dibaca', 
    value: '24', 
    change: '+12%',
    changeType: 'positive',
    icon: Eye, 
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  { 
    name: 'E-book Diunduh', 
    value: '8', 
    change: '+5%',
    changeType: 'positive',
    icon: Download, 
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  { 
    name: 'Video Ditonton', 
    value: '12', 
    change: '+8%',
    changeType: 'positive',
    icon: TrendingUp, 
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  { 
    name: 'Rating Diberikan', 
    value: '15', 
    change: '+3%',
    changeType: 'positive',
    icon: Star, 
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'article',
    title: 'Perubahan Tarif PPh 21 Tahun 2024',
    date: '2 jam yang lalu',
    icon: Eye,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 2,
    type: 'ebook',
    title: 'Panduan Lengkap PPh 21 untuk Karyawan',
    date: '1 hari yang lalu',
    icon: Download,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 3,
    type: 'video',
    title: 'Cara Menghitung PPh 21 dengan Excel',
    date: '2 hari yang lalu',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
]

const quickActions = [
  {
    title: 'Buat Artikel Baru',
    description: 'Tulis artikel tentang perpajakan',
    icon: Plus,
    color: 'bg-blue-500',
    href: '/admin/articles/new'
  },
  {
    title: 'Upload E-book',
    description: 'Tambah materi pembelajaran baru',
    icon: Download,
    color: 'bg-green-500',
    href: '/admin/education/ebooks/new'
  },
  {
    title: 'Analytics',
    description: 'Lihat statistik website',
    icon: BarChart3,
    color: 'bg-purple-500',
    href: '/admin/analytics'
  },
  {
    title: 'Kelola User',
    description: 'Manajemen pengguna',
    icon: User,
    color: 'bg-orange-500',
    href: '/admin/users'
  }
]

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Riwayat Belajar', href: '/dashboard/learning', icon: BookOpen },
  { name: 'Chat History', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Profil', href: '/dashboard/profile', icon: User },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
]

function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, Administrator! 👋</h1>
            <p className="text-blue-100 text-lg">Kelola dan pantau performa website Taxonomy Hub Anda</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-blue-100">Hari ini</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
                <Link to="/dashboard/learning" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  Lihat Semua
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`p-3 rounded-lg ${action.color} text-white`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress & Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Lanjutkan Belajar</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Belum ada aktivitas belajar</h4>
              <p className="text-gray-500 mb-6">Mulai perjalanan belajar Anda dengan materi perpajakan terbaru</p>
              <Link
                to="/education"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mulai Belajar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Start Chat */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Tanyakan kepada AI</h4>
              <p className="text-gray-500 mb-6">Dapatkan bantuan cepat untuk pertanyaan seputar perpajakan</p>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Mulai Chat
                <MessageCircle className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LearningHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Belajar</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat belajar</h4>
            <p className="text-gray-500">Riwayat aktivitas belajar Anda akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Chat</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat chat</h4>
            <p className="text-gray-500">Riwayat percakapan dengan AI assistant akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Profile() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Profil Saya</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Profil Pengguna</h4>
            <p className="text-gray-500">Informasi profil Anda akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pengaturan</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Pengaturan Akun</h4>
            <p className="text-gray-500">Pengaturan akun Anda akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Dashboard - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Dashboard pribadi Anda di Taxonomy Knowledge Hub." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

                 {/* Sidebar */}
         <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
         }`}>
           {/* Logo/Brand Section */}
           <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                 <span className="text-white font-bold text-lg">T</span>
               </div>
               <div>
                 <span className="text-lg font-bold text-gray-900">Taxonomy</span>
                 <span className="block text-sm text-gray-600">Hub</span>
               </div>
             </div>
             <button
               onClick={() => setSidebarOpen(false)}
               className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
             >
               <LogOut className="w-5 h-5" />
             </button>
           </div>

                       {/* Navigation Section */}
            <div className="flex flex-col h-full">
              <nav className="flex-1 px-4 pt-0">
                <div className="space-y-2">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
                    Menu Utama
                  </h3>
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </nav>

             {/* Bottom Section */}
             <div className="px-4 pb-8">
               <div className="border-t border-gray-200 pt-6">
                 <button className="group flex items-center w-full px-4 py-4 text-sm font-medium text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200">
                   <LogOut className="w-5 h-5 mr-3" />
                   Keluar
                 </button>
               </div>
             </div>
           </div>
         </div>

                 {/* Main content */}
         <div className="lg:pl-64">
           {/* Top header */}
           <div className="bg-white shadow-sm border-b border-gray-200">
             <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
               <div className="flex items-center">
                 <button
                   onClick={() => setSidebarOpen(true)}
                   className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                 >
                   <Menu className="w-6 h-6" />
                 </button>
                 <div className="ml-4 lg:ml-0">
                   <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                 </div>
               </div>
               
               <div className="flex items-center space-x-4">
                 <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                   <Search className="w-5 h-5" />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                 </button>
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                     <span className="text-white font-bold text-sm">A</span>
                   </div>
                   <span className="hidden sm:block text-sm font-medium text-gray-700">Administrator</span>
                 </div>
               </div>
             </div>
           </div>

                       {/* Page content */}
            <div className="pt-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<DashboardHome />} />
                  <Route path="/learning" element={<LearningHistory />} />
                  <Route path="/chat" element={<ChatHistory />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </div>
         </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  )
} 