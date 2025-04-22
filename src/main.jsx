import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from './config/emailjs'
import { HelmetProvider } from 'react-helmet-async'

// Initialize EmailJS with your public key
emailjs.init(emailjsConfig.publicKey)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
