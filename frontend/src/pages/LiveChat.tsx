import { Helmet } from 'react-helmet-async'
import { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail,
  Bot,
  User,
  Clock,
  Paperclip,
  Smile,
  MoreVertical
} from 'lucide-react'

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    type: 'bot',
    message: 'Halo! Selamat datang di Taxonomy Knowledge Hub. Saya adalah AI Assistant yang siap membantu Anda dengan pertanyaan seputar perpajakan, investasi, dan ekonomi. Apa yang bisa saya bantu?',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    sender: 'AI Assistant'
  }
]

const quickReplies = [
  'Bagaimana cara menghitung PPh 21?',
  'Apa itu PPN?',
  'Bagaimana cara investasi yang aman?',
  'Kapan batas waktu SPT?',
  'Bagaimana cara mengunduh e-book?'
]

export default function LiveChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatStatus, setChatStatus] = useState('online') // online, offline, connecting
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      message: inputMessage,
      timestamp: new Date().toISOString(),
      sender: 'Anda'
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        message: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString(),
        sender: 'AI Assistant'
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('pph 21') || lowerMessage.includes('pph21')) {
      return 'PPh 21 adalah pajak penghasilan yang dipotong oleh pemberi kerja atas penghasilan yang diterima oleh karyawan. Perhitungannya berdasarkan penghasilan bruto dikurangi PTKP dan pengurangan lainnya. Apakah Anda ingin saya jelaskan lebih detail?'
    } else if (lowerMessage.includes('ppn')) {
      return 'PPN (Pajak Pertambahan Nilai) adalah pajak yang dikenakan atas konsumsi barang dan jasa di dalam negeri. Tarif PPN saat ini adalah 11% dan akan naik menjadi 12% pada tahun 2025. Ada beberapa barang dan jasa yang dibebaskan dari PPN.'
    } else if (lowerMessage.includes('investasi') || lowerMessage.includes('invest')) {
      return 'Investasi adalah kegiatan menanamkan modal dengan harapan mendapatkan keuntungan di masa depan. Beberapa jenis investasi yang populer: saham, reksadana, obligasi, dan deposito. Setiap jenis investasi memiliki risiko dan potensi return yang berbeda.'
    } else if (lowerMessage.includes('spt') || lowerMessage.includes('lapor')) {
      return 'SPT (Surat Pemberitahuan) adalah surat yang digunakan untuk melaporkan penghitungan dan pembayaran pajak. Batas waktu pelaporan SPT Tahunan adalah 31 Maret tahun berikutnya. SPT Masa dilaporkan setiap bulan.'
    } else if (lowerMessage.includes('ebook') || lowerMessage.includes('download')) {
      return 'Untuk mengunduh e-book, Anda bisa mengunjungi halaman Education > E-book. Pilih e-book yang Anda inginkan dan klik tombol "Download Gratis". Semua e-book kami tersedia secara gratis untuk pembelajaran.'
    } else {
      return 'Terima kasih atas pertanyaan Anda. Saya akan membantu Anda dengan pertanyaan seputar perpajakan, investasi, dan ekonomi. Jika pertanyaan Anda lebih spesifik, silakan ajukan dan saya akan memberikan jawaban yang lebih detail.'
    }
  }

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <Helmet>
        <title>Live Chat - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Chat langsung dengan AI Assistant untuk pertanyaan seputar perpajakan dan investasi." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Chat</h1>
                    <p className="text-gray-600">Chat langsung dengan AI Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      chatStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm text-gray-600">
                      {chatStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-blue-100 text-sm">Siap membantu Anda 24/7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-xs font-medium opacity-75">
                        {message.sender}
                      </span>
                      <span className="text-xs opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium opacity-75">AI Assistant</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 mb-3">Pertanyaan umum:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    rows={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              </div>
              <p className="text-sm text-gray-600">
                AI Assistant kami siap membantu Anda kapan saja, 24 jam sehari, 7 hari seminggu.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">AI Powered</h3>
              </div>
              <p className="text-sm text-gray-600">
                Ditenagai oleh AI canggih yang dapat memberikan jawaban akurat dan terpercaya.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Instant Response</h3>
              </div>
              <p className="text-sm text-gray-600">
                Dapatkan jawaban instan untuk pertanyaan seputar perpajakan dan investasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 