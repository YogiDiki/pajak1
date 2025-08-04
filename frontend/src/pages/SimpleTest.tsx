import React from 'react'

export default function SimpleTest() {
  return (
    <div style={{ 
      backgroundColor: 'green', 
      color: 'white', 
      padding: '50px',
      fontSize: '32px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>🎉 ROUTING BERFUNGSI! 🎉</h1>
      <p>Jika Anda melihat halaman hijau ini, berarti routing React Router berfungsi dengan baik!</p>
      <p>Waktu sekarang: {new Date().toLocaleString()}</p>
    </div>
  )
} 