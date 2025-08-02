import React from 'react'
import SpinningWheel from './components/SpinningWheel'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1 className="title">🛒 Dhoonki Wheel</h1>
          <p className="subtitle">Spin to win amazing deals on sustainable fashion!</p>
          <div className="brand-tagline">Eco-friendly • Handwoven • Ethical</div>
        </div>
        
        <SpinningWheel />
        
        <div className="footer">
          <div className="website-link">
            <a href="https://www.dhoonki.com/" target="_blank" rel="noopener noreferrer">
              🌿 Visit Dhoonki.com
            </a>
          </div>
          <div className="social-links">
            <span className="social-text">Follow us for more sustainable fashion</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 