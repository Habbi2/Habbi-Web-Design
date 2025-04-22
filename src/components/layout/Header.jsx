import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { theme } from '../../styles/theme';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          zIndex: 100,
          padding: '20px var(--page-padding)',
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
          height: theme.sizes.headerHeight,
        }}
      >
        <div className="header-logo">
          <Link to="/" style={{ 
            fontFamily: theme.fonts.accent,
            fontSize: '1.5rem',
            fontWeight: 700,
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            HABBI
          </Link>
        </div>

        <nav className="desktop-nav" style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '20px',
            width: '30px',
            '@media (min-width: 768px)': { display: 'none' }
          }}
        >
          <span 
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          ></span>
          <span 
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              opacity: menuOpen ? 0 : 1,
            }}
          ></span>
          <span 
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: theme.colors.text,
              display: 'block',
              transition: theme.transitions.default,
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          ></span>
        </button>
      </header>

      <div 
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.background,
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-100%)',
          transition: theme.transitions.slow,
        }}
      >
        <nav>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {['Work', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item} className="mobile-nav-item">
                <Link 
                  to={`/${item.toLowerCase()}`}
                  onClick={toggleMenu}
                  style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: '2rem',
                    fontWeight: 700,
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {item}
                  <span style={{
                    position: 'absolute',
                    bottom: '-5px',
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

        <div className="mobile-social-links" style={{ marginTop: '4rem' }}>
          {/* Social links would go here */}
        </div>
      </div>
    </>
  );
};

export default Header;