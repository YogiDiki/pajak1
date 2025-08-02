import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, User, BookOpen, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Berita', href: '/news' },
  { name: 'Edukasi', href: '/education' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logout berhasil!')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                Taxonomy Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-primary-600"
                >
                  Halo, {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-outline"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-outline"
                >
                  <User className="w-4 h-4 mr-2" />
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-center text-sm font-medium text-gray-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Halo, {user?.name}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="block btn-outline text-center w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2 inline" />
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block btn-outline text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2 inline" />
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="block btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 