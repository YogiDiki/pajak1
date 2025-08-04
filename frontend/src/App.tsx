import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LayoutSimple from './components/LayoutSimple'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import News from './pages/News'
import Education from './pages/Education'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

// News Subdomain Routes
import NewsEconomy from './pages/news/NewsEconomy'
import NewsInvestment from './pages/news/NewsInvestment'
import NewsTax from './pages/news/NewsTax'
import NewsOpinion from './pages/news/NewsOpinion'

// Education Subdomain Routes
import EducationEbook from './pages/education/EducationEbook'
import EducationEdoc from './pages/education/EducationEdoc'
import EducationElibrary from './pages/education/EducationElibrary'

// Admin Routes
import AdminNews from './pages/admin/AdminNews'
import AdminEducation from './pages/admin/AdminEducation'
import AdminHelpdesk from './pages/admin/AdminHelpdesk'
import AdminUsers from './pages/admin/AdminUsers'

// Helpdesk Routes
import Helpdesk from './pages/Helpdesk'
import LiveChat from './pages/LiveChat'
import TestPage from './pages/TestPage'
import DebugPage from './pages/DebugPage'
import SimpleTest from './pages/SimpleTest'

function App() {
  return (
    <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="education" element={<Education />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="helpdesk" element={<Helpdesk />} />
            <Route path="live-chat" element={<LiveChat />} />
            
            {/* Simple Layout Test */}
            <Route path="simple" element={<LayoutSimple />}>
              <Route index element={<TestPage />} />
            </Route>
            
            {/* News Subdomain Routes */}
            <Route path="news/economy" element={<NewsEconomy />} />
            <Route path="news/investment" element={<NewsInvestment />} />
            <Route path="news/tax" element={<NewsTax />} />
            <Route path="news/opinion" element={<NewsOpinion />} />
            
            {/* Education Subdomain Routes */}
            <Route path="education/ebook" element={<EducationEbook />} />
            <Route path="education/edoc" element={<EducationEdoc />} />
            <Route path="education/elibrary" element={<EducationElibrary />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/simple-test" element={<SimpleTest />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Admin Routes - Premium Users Only */}
          <Route path="/admin" element={<ProtectedRoute requirePremium><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute requirePremium><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/education" element={<ProtectedRoute requirePremium><AdminEducation /></ProtectedRoute>} />
          <Route path="/admin/helpdesk" element={<ProtectedRoute requirePremium><AdminHelpdesk /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requirePremium><AdminUsers /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  )
}

export default App 