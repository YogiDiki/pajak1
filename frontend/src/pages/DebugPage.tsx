import React from 'react'

export default function DebugPage() {
  console.log('DebugPage is rendering')
  
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px',
      textAlign: 'center'
    }}>
      <h1>DEBUG PAGE</h1>
      <p>If you can see this red background, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  )
} 