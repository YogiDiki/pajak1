import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requirePremium?: boolean
  requireEditor?: boolean
  requireAdmin?: boolean
}

export default function ProtectedRoute({ 
  children, 
  requirePremium = false, 
  requireEditor = false,
  requireAdmin = false 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check for premium access
  if (requirePremium && user.role !== 'premium' && user.role !== 'editor' && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  // Check for editor access
  if (requireEditor && user.role !== 'editor' && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  // Check for admin access
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
} 