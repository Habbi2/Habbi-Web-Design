import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
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
    // Don't run heavy animations on mobile
    const animationDuration = isMobile ? 0.7 : 1;
    
    // Animate footer elements when they come into view
    gsap.fromTo(
      '.footer-heading', 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: animationDuration, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 80%',
        }
      }
    );
    
    gsap.fromTo(
      '.footer-content > *', 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 70%',
        }
      }
    );
  }, [isMobile]);

  return (
    <footer className="footer" style={{
      backgroundColor: theme.colors.backgroundAlt,
      padding: isMobile ? '6rem 0 3rem' : '10rem 0 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient background element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: theme.colors.gradient1,
        opacity: 0.7,
      }} />
      
      <div className="container">
        <div className="footer-cta" style={{
          marginBottom: isMobile ? '4rem' : '8rem',
          textAlign: 'center',
        }}>
          <h2 className="footer-heading" style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 800,
            marginBottom: isMobile ? '1.5rem' : '2rem',
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}>
            Start Your Project
          </h2>
          <Link to="/contact" style={{
            display: 'inline-block',
            padding: isMobile ? '0.8rem 2rem' : '1rem 3rem',
            fontSize: isMobile ? '1rem' : '1.2rem',
            fontWeight: 600,
            backgroundColor: theme.colors.primary,
            color: '#000',
            borderRadius: theme.borderRadius.medium,
            position: 'relative',
            overflow: 'hidden',
            transition: theme.transitions.default,
            border: '2px solid transparent',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            width: isMobile ? '90%' : 'auto',
            maxWidth: '300px',
          }}>
            Let's Talk
          </Link>
        </div>
        
        <div className="footer-content" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '3rem' : '4rem',
        }}>
          <div className="footer-info">
            <h3 style={{ 
              fontFamily: theme.fonts.accent, 
              fontSize: isMobile ? '1.8rem' : '2rem',
              marginBottom: isMobile ? '1rem' : '1.5rem',
              background: theme.colors.gradient1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              HABBI
            </h3>
            <p style={{ 
              marginBottom: '2rem', 
              maxWidth: '300px',
              fontSize: isMobile ? '0.95rem' : '1rem',
            }}>
              We craft bold digital experiences that demand attention and deliver results.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 style={{ 
              fontSize: isMobile ? '1rem' : '1.2rem', 
              marginBottom: isMobile ? '1.2rem' : '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: theme.colors.textSecondary,
            }}>Navigation</h4>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              display: isMobile ? 'grid' : 'block',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              {['Home', 'Work', 'Services', 'About', 'Contact'].map(item => (
                <li key={item} style={{ marginBottom: isMobile ? '0.5rem' : '1rem' }}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    style={{
                      position: 'relative',
                      paddingBottom: '0.2rem',
                      fontSize: isMobile ? '0.95rem' : '1rem',
                    }}
                    onMouseEnter={(e) => {
                      if (isMobile) return;
                      const span = e.currentTarget.querySelector('span');
                      gsap.to(span, {
                        width: '100%',
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }}
                    onMouseLeave={(e) => {
                      if (isMobile) return;
                      const span = e.currentTarget.querySelector('span');
                      gsap.to(span, {
                        width: '0%',
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
                      width: '0',
                      height: '1px',
                      backgroundColor: theme.colors.primary,
                      transition: theme.transitions.default,
                    }}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 style={{ 
              fontSize: isMobile ? '1rem' : '1.2rem', 
              marginBottom: isMobile ? '1.2rem' : '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: theme.colors.textSecondary,
            }}>Contact</h4>
            <p style={{ 
              marginBottom: '1rem',
              fontSize: isMobile ? '0.95rem' : '1rem',
            }}>habbiwebdesign@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom" style={{
          marginTop: isMobile ? '3rem' : '6rem',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: isMobile ? '1.5rem' : '1rem',
          color: theme.colors.textSecondary,
          textAlign: isMobile ? 'center' : 'left',
          borderTop: `1px solid ${theme.colors.textSecondary}20`,
          paddingTop: isMobile ? '1.5rem' : '2rem',
        }}>
          <p style={{ 
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            opacity: 0.8,
          }}>
            &copy; {new Date().getFullYear()} Habbi Design Studio. All rights reserved.
          </p>
          <div className="footer-legal" style={{ 
            display: 'flex', 
            gap: isMobile ? '1.5rem' : '2rem',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
          }}>
            <Link 
              to="#" 
              style={{ opacity: 0.8, transition: '0.2s ease' }}
              onMouseEnter={(e) => {
                if (isMobile) return;
                gsap.to(e.currentTarget, {
                  opacity: 1,
                  color: theme.colors.primary,
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                if (isMobile) return;
                gsap.to(e.currentTarget, {
                  opacity: 0.8,
                  color: theme.colors.textSecondary,
                  duration: 0.3
                });
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              style={{ opacity: 0.8, transition: '0.2s ease' }}
              onMouseEnter={(e) => {
                if (isMobile) return;
                gsap.to(e.currentTarget, {
                  opacity: 1,
                  color: theme.colors.primary,
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                if (isMobile) return;
                gsap.to(e.currentTarget, {
                  opacity: 0.8,
                  color: theme.colors.textSecondary,
                  duration: 0.3
                });
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      {/* Responsive style tag */}
      <style>{`
        @media screen and (max-width: 480px) {
          .footer-content {
            gap: 2rem;
          }
        }
        
        @media screen and (max-height: 500px) and (orientation: landscape) {
          .footer {
            padding: 3rem 0 2rem;
          }
          
          .footer-cta {
            margin-bottom: 2rem;
          }
        }
        
        /* Improved tap target size on mobile */
        @media (hover: none) {
          .footer-links li a,
          .footer-legal a {
            padding: 0.5rem 0;
            display: inline-block;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;