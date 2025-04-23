import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { theme } from '../../styles/theme';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice(); // Initial check
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animation for header elements
    gsap.fromTo(
      '.header-logo, .nav-links li, .menu-button', 
      { y: -20, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.3
      }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
      // Animate menu opening
      gsap.fromTo('.mobile-menu', 
        { y: '-100%' }, 
        { y: '0', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-item', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = 'visible';
      // Animate menu closing
      gsap.to('.mobile-menu', { y: '-100%', duration: 0.5, ease: 'power3.in' });
    }
  };

  return (
    <>
      <header 
        className={`header ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100%',
          zIndex: 100,
          padding: isMobile ? '15px var(--page-padding)' : '20px var(--page-padding)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: theme.transitions.default,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          backgroundColor: scrolled 
            ? 'rgba(10, 10, 10, 0.8)' 
            : 'transparent',
          boxShadow: scrolled 
            ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
            : 'none',
          height: isMobile ? '70px' : theme.sizes.headerHeight,
          boxSizing: 'border-box',
        }}
      >
        <div className="header-logo">
          <Link to="/" style={{ 
            fontFamily: theme.fonts.accent,
            fontSize: isMobile ? '1.3rem' : '1.5rem',
            fontWeight: 700,
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            HABBI
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav 
          className="desktop-nav" 
          style={{ 
            display: isMobile ? 'none' : 'block',
          }}
        >
          <ul className="nav-links" style={{ 
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
          }}>
            {['Work', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item} style={{ position: 'relative' }}>
                <Link 
                  to={`/${item.toLowerCase()}`}
                  style={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    position: 'relative',
                    padding: '0.5rem 0',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      color: theme.colors.primary, 
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      color: theme.colors.text, 
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                >
                  {item}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '1px',
                    backgroundColor: theme.colors.primary,
                    transition: theme.transitions.default,
                  }}></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button - Hidden on desktop */}
        <button 
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} 
          onClick={toggleMenu}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 101,
            padding: '0.5rem',
            display: isMobile ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '20px',
            width: '30px',
          }}
        >
          <span 
            style={{
              width: menuOpen ? '100%' : '80%',
              height: '2px',
              backgroundColor: menuOpen ? theme.colors.primary : theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              marginLeft: menuOpen ? '0' : 'auto',
            }}
          ></span>
          <span 
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: menuOpen ? theme.colors.primary : theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              opacity: menuOpen ? 0 : 1,
            }}
          ></span>
          <span 
            style={{
              width: menuOpen ? '100%' : '60%',
              height: '2px',
              backgroundColor: menuOpen ? theme.colors.primary : theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              marginLeft: menuOpen ? '0' : 'auto',
            }}
          ></span>
        </button>
      </header>

      {/* Mobile menu - Full screen overlay */}
      <div 
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'rgba(10, 10, 10, 0.98)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-100%)',
          transition: theme.transitions.slow,
          backdropFilter: 'blur(5px)',
          boxSizing: 'border-box',
        }}
      >
        <nav>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '1.5rem' : '2rem',
            textAlign: 'center',
            padding: 0,
          }}>
            {['Work', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item} className="mobile-nav-item">
                <Link 
                  to={`/${item.toLowerCase()}`}
                  onClick={toggleMenu}
                  style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: 700,
                    position: 'relative',
                    display: 'inline-block',
                    padding: '0.3rem 0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (isMobile) return; // Skip animation on mobile
                    const span = e.currentTarget.querySelector('span');
                    gsap.to(span, {
                      width: '100%',
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                    gsap.to(e.currentTarget, {
                      color: theme.colors.primary,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                  onMouseLeave={(e) => {
                    if (isMobile) return; // Skip animation on mobile
                    const span = e.currentTarget.querySelector('span');
                    gsap.to(span, {
                      width: '0%',
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                    gsap.to(e.currentTarget, {
                      color: theme.colors.text,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }}
                >
                  {item}
                  <span style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '0',
                    height: '2px',
                    backgroundColor: theme.colors.primary,
                    transition: theme.transitions.default,
                  }}></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links for mobile menu */}
        <div className="mobile-social-links" style={{ 
          marginTop: isMobile ? '3rem' : '4rem', 
          display: 'flex', 
          gap: '1.5rem' 
        }}>
        </div>
      </div>

      {/* Responsive style tag */}
      <style>{`
        /* Mobile specific styles */
        @media screen and (max-width: 768px) {
          .mobile-menu {
            padding: 0 var(--page-padding);
          }
          
          body, html, #root {
            max-width: 100vw;
            width: 100%;
            overflow-x: hidden;
          }
          
          .header {
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
          }
        }

        /* Override backdrop filter for older Chrome versions */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          header.scrolled {
            background-color: rgba(10, 10, 10, 0.95);
          }
        }
        
        /* Make header adapt to landscape orientation on mobile */
        @media screen and (max-height: 500px) and (orientation: landscape) {
          .mobile-menu {
            padding-top: 80px;
            justify-content: flex-start;
          }
          
          .mobile-social-links {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;