import React from 'react'
import './Footer.css'


const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; {currentYear} Finance Score. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <nav className="footer-nav">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
              <a href="/contact" className="footer-link">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer