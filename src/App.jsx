import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CustomCursor from './components/shared/CustomCursor'
import Head from './components/shared/Head'

// Home page sections
import HeroSection from './components/home/HeroSection'
import PortfolioSection from './components/home/PortfolioSection'
import ServicesSection from './components/home/ServicesSection'
import AboutSection from './components/home/AboutSection'
import ContactSection from './components/home/ContactSection'

// Pages
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating loading assets
    setTimeout(() => {
      setLoading(false)
    }, 2000)

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  // Loading screen
  if (loading) {
    return (
      <div className="loading-screen" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 9999
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#00E5FF',
          animation: 'spin 1s linear infinite',
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <Router>
      {/* Default site-wide metadata */}
      <Head 
        title="Habbi | High-End Web Design Studio"
        description="Bold, minimal designs that demand attention. We craft exceptional digital experiences for brands that want to stand out."
        keywords="web design, digital agency, ui design, ux design, website development"
        canonicalUrl="/"
      />
      <CustomCursor />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ServicesSection />
              <PortfolioSection />
              <AboutSection />
              <ContactSection />
            </>
          } />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Page Not Found</h1></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
