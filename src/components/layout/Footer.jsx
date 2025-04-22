import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    // Animate footer elements when they come into view
    gsap.fromTo(
      '.footer-heading', 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
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
  }, []);

  return (
    <footer className="footer" style={{
      backgroundColor: theme.colors.backgroundAlt,
      padding: '10rem 0 5rem',
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
          marginBottom: '8rem',
          textAlign: 'center',
        }}>
          <h2 className="footer-heading" style={{
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}>
            Start Your Project
          </h2>
          <Link to="/contact" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            fontSize: '1.2rem',
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
          }}>
            Let's Talk
          </Link>
        </div>
        
        <div className="footer-content" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem',
        }}>
          <div className="footer-info">
            <h3 style={{ 
              fontFamily: theme.fonts.accent, 
              fontSize: '2rem',
              marginBottom: '1.5rem',
              background: theme.colors.gradient1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              HABBI
            </h3>
            <p style={{ marginBottom: '2rem', maxWidth: '300px' }}>
              We craft bold digital experiences that demand attention and deliver results.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: theme.colors.textSecondary,
            }}>Navigation</h4>
            <ul style={{ listStyle: 'none' }}>
              {['Home', 'Work', 'Services', 'About', 'Contact'].map(item => (
                <li key={item} style={{ marginBottom: '1rem' }}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{
                    position: 'relative',
                    paddingBottom: '0.2rem',
                  }}>
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
              fontSize: '1.2rem', 
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: theme.colors.textSecondary,
            }}>Contact</h4>
            <p style={{ marginBottom: '1rem' }}>habbiwebdesign@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-bottom" style={{
          marginTop: '6rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: theme.colors.textSecondary,
        }}>
          <p>&copy; {new Date().getFullYear()} Habbi Design Studio. All rights reserved.</p>
          <div className="footer-legal" style={{ display: 'flex', gap: '2rem' }}>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;