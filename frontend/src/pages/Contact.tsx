import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@taxonomyhub.com',
    description: 'Kirim email kepada kami',
  },
  {
    icon: Phone,
    title: 'Telepon',
    value: '+62 21 1234 5678',
    description: 'Hubungi kami langsung',
  },
  {
    icon: MapPin,
    title: 'Alamat',
    value: 'Jakarta, Indonesia',
    description: 'Kantor pusat kami',
  },
  {
    icon: Clock,
    title: 'Jam Kerja',
    value: 'Senin - Jumat, 09:00 - 17:00 WIB',
    description: 'Waktu operasional',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Helmet>
        <title>Kontak - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Hubungi kami untuk pertanyaan, saran, atau kerjasama. Tim kami siap membantu Anda." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Punya pertanyaan atau ingin berkolaborasi? Tim kami siap membantu Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info) => (
              <div key={info.title} className="card text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {info.value}
                </p>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="general">Pertanyaan Umum</option>
                    <option value="support">Dukungan Teknis</option>
                    <option value="partnership">Kerjasama</option>
                    <option value="feedback">Saran & Feedback</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Lokasi Kami
              </h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Peta akan ditampilkan di sini</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Jam Operasional
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Senin - Jumat</span>
                      <span>09:00 - 17:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu</span>
                      <span>09:00 - 15:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span>Tutup</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Respon Cepat
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Kami berkomitmen merespon pesan Anda dalam waktu maksimal 24 jam pada hari kerja.
                  </p>
                  <div className="flex items-center text-primary-600">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Live Chat Tersedia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum seputar platform kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Apakah platform ini gratis?
                </h3>
                <p className="text-gray-600">
                  Ya, sebagian besar konten kami tersedia secara gratis. Namun, kami juga menyediakan konten premium untuk member berbayar.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bagaimana cara mendaftar?
                </h3>
                <p className="text-gray-600">
                  Anda dapat mendaftar melalui halaman registrasi dengan mengisi form yang tersedia. Proses pendaftaran sangat mudah dan cepat.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Apakah konten selalu diperbarui?
                </h3>
                <p className="text-gray-600">
                  Ya, tim kami secara rutin memperbarui konten untuk memastikan informasi yang akurat dan terkini.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bisakah saya mengunduh e-book?
                </h3>
                <p className="text-gray-600">
                  Ya, e-book tersedia untuk diunduh setelah Anda mendaftar sebagai member. Beberapa e-book premium memerlukan langganan berbayar.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Apakah ada sertifikat setelah menyelesaikan kursus?
                </h3>
                <p className="text-gray-600">
                  Ya, kami menyediakan sertifikat untuk kursus tertentu. Sertifikat dapat diunduh setelah menyelesaikan semua modul dan ujian.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bagaimana dengan keamanan data?
                </h3>
                <p className="text-gray-600">
                  Kami mengutamakan keamanan data pengguna. Semua data dilindungi dengan enkripsi SSL dan mengikuti standar keamanan internasional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap Memulai Perjalanan Belajar?
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah meningkatkan pengetahuan mereka di Taxonomy Knowledge Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Daftar Gratis
            </button>
            <button className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-secondary-600">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>
    </>
  )
} 