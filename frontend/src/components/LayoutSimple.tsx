import { Outlet } from 'react-router-dom'

export default function LayoutSimple() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Simple Layout Test</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <Outlet />
        </div>
      </div>
    </div>
  )
} 