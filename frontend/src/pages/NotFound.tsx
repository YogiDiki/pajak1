import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan - Taxonomy Knowledge Hub</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-4xl">404</span>
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Halaman Tidak Ditemukan
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Anda dapat mencoba:
                </p>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Periksa kembali URL yang Anda masukkan</li>
                  <li>• Gunakan menu navigasi di atas</li>
                  <li>• Kembali ke halaman beranda</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/"
                  className="btn-primary flex justify-center items-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Beranda
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="btn-outline flex justify-center items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Atau hubungi kami jika Anda yakin ini adalah kesalahan.
                </p>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 