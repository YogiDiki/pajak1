import { Helmet } from 'react-helmet-async'
import { Users, Award, Target, BookOpen, Globe, TrendingUp } from 'lucide-react'

const stats = [
  { name: 'Pengguna Aktif', value: '50K+', icon: Users },
  { name: 'Artikel Terbit', value: '1000+', icon: BookOpen },
  { name: 'E-book Tersedia', value: '500+', icon: Award },
  { name: 'Negara Terjangkau', value: '25+', icon: Globe },
]

const values = [
  {
    title: 'Kualitas Konten',
    description: 'Kami berkomitmen menyediakan konten berkualitas tinggi yang akurat, terverifikasi, dan selalu up-to-date.',
    icon: Award,
  },
  {
    title: 'Aksesibilitas',
    description: 'Platform yang mudah diakses dari mana saja, kapan saja, dengan antarmuka yang user-friendly.',
    icon: Globe,
  },
  {
    title: 'Inovasi Teknologi',
    description: 'Memanfaatkan teknologi AI terdepan untuk memberikan pengalaman belajar yang personal dan efektif.',
    icon: TrendingUp,
  },
  {
    title: 'Komunitas',
    description: 'Membangun komunitas pembelajaran yang kolaboratif dan mendukung pertumbuhan bersama.',
    icon: Users,
  },
]

const team = [
  {
    name: 'Ahmad Rahman',
    role: 'CEO & Founder',
    bio: 'Ahli perpajakan dengan pengalaman 15+ tahun di bidang konsultasi dan edukasi.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Sarah Wijaya',
    role: 'Head of Content',
    bio: 'Jurnalis dan penulis dengan fokus pada ekonomi dan bisnis, 10+ tahun pengalaman.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Budi Santoso',
    role: 'CTO',
    bio: 'Teknolog dengan keahlian AI/ML dan pengalaman 12+ tahun di startup teknologi.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>Tentang Kami - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Pelajari lebih lanjut tentang Taxonomy Knowledge Hub, platform edukasi terdepan untuk pajak, ekonomi, bisnis, dan investasi." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tentang Taxonomy Knowledge Hub
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Platform edukasi dan informasi terdepan yang membantu individu dan bisnis memahami kompleksitas dunia finansial dengan cara yang mudah dan terstruktur.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Misi & Visi Kami
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-6 h-6 text-primary-600 mr-3" />
                    Misi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Memberdayakan masyarakat Indonesia dengan pengetahuan yang komprehensif di bidang pajak, ekonomi, bisnis, dan investasi melalui platform digital yang inovatif dan mudah diakses.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-6 h-6 text-primary-600 mr-3" />
                    Visi
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Menjadi platform edukasi finansial terdepan di Asia Tenggara yang menginspirasi dan memfasilitasi pertumbuhan ekonomi yang berkelanjutan.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Fokus Utama</h4>
                    <p className="text-gray-600 text-sm">
                      Pajak, Ekonomi, Bisnis, dan Investasi
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Target Pengguna</h4>
                    <p className="text-gray-600 text-sm">
                      Individu, UMKM, Korporasi, dan Profesional
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Metodologi</h4>
                    <p className="text-gray-600 text-sm">
                      AI-Powered Learning, Expert Content, Interactive Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dipimpin oleh para ahli di bidangnya masing-masing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card text-center p-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Taxonomy Knowledge Hub dimulai dari sebuah visi sederhana: membuat pengetahuan tentang pajak, ekonomi, bisnis, dan investasi menjadi lebih mudah diakses dan dipahami oleh semua orang.
                </p>
                <p>
                  Didirikan pada tahun 2024, platform ini lahir dari pengalaman tim kami yang melihat betapa kompleksnya dunia finansial dan betapa pentingnya edukasi yang tepat untuk mengambil keputusan yang bijak.
                </p>
                <p>
                  Dengan memanfaatkan teknologi AI terdepan dan kolaborasi dengan para ahli di berbagai bidang, kami berhasil menciptakan platform yang tidak hanya informatif, tetapi juga interaktif dan personal.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary-100 to-primary-100 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-secondary-600">2024</div>
                    <div className="text-sm text-gray-600">Platform diluncurkan</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-secondary-600">1000+</div>
                    <div className="text-sm text-gray-600">Artikel diterbitkan</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-secondary-600">50K+</div>
                    <div className="text-sm text-gray-600">Pengguna terdaftar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bergabunglah dengan Perjalanan Kami
          </h2>
          <p className="text-xl text-secondary-100 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama membangun masa depan yang lebih cerdas dan berpengetahuan di bidang finansial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Mulai Belajar
            </button>
            <button className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-secondary-600">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>
    </>
  )
} 