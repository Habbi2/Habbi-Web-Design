import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const aboutTextRef = useRef(null);
  const statsRef = useRef(null);
  
  useEffect(() => {
    // Animate section content on scroll
    gsap.fromTo(aboutTextRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate stats counters
    const statsElements = statsRef.current.querySelectorAll('.stat-item');
    gsap.fromTo(statsElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 75%',
        }
      }
    );
    
    // Animate stats numbers
    statsElements.forEach((stat) => {
      const countElement = stat.querySelector('.stat-count');
      const targetValue = parseInt(countElement.getAttribute('data-value'));
      
      gsap.fromTo(countElement, 
        { innerText: 0 }, 
        {
          innerText: targetValue,
          duration: 2,
          ease: 'power2.out',
          roundProps: 'innerText',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 75%',
          }
        }
      );
    });
  }, []);
  
  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: 'linear-gradient(to bottom, #0A0A0A 0%, #111111 100%)',
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(156,39,176,0.03) 0%, rgba(156,39,176,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />
      
      <div className="container">
        {/* About section content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
        }}>
          <div ref={aboutTextRef}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
            }}>
              About <span style={{
                background: theme.colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Habbi</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              opacity: 0.9,
            }}>
              Founded in 2020, Habbi Web Design is a collective of digital crafters passionate about creating memorable online experiences. We believe that exceptional design bridges the gap between brand objectives and user needs.
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              opacity: 0.9,
            }}>
              Our approach combines strategic thinking, technical expertise, and creative innovation to deliver projects that not only look stunning but also perform flawlessly. We've helped brands across industries enhance their digital presence and achieve measurable results.
            </p>
            
            <div style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              position: 'relative',
            }}>
              <a href="/about" style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: 600,
                color: theme.colors.primary,
                position: 'relative',
              }}>
                Learn More About Us
                <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>→</span>
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: theme.colors.primary,
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}></span>
              </a>
            </div>
          </div>
          
          {/* Stats section */}
          <div
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
            }}
          >
            <div className="stat-item" style={{
              background: theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.medium,
              padding: '2rem',
              textAlign: 'center',
              boxShadow: theme.shadows.small,
            }}>
              <h3 className="stat-count" data-value="120" style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: theme.colors.primary,
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}>
                0
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>Projects Completed</p>
            </div>
            
            <div className="stat-item" style={{
              background: theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.medium,
              padding: '2rem',
              textAlign: 'center',
              boxShadow: theme.shadows.small,
            }}>
              <h3 className="stat-count" data-value="85" style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: theme.colors.secondary,
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}>
                0
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>Happy Clients</p>
            </div>
            
            <div className="stat-item" style={{
              background: theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.medium,
              padding: '2rem',
              textAlign: 'center',
              boxShadow: theme.shadows.small,
            }}>
              <h3 className="stat-count" data-value="12" style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: theme.colors.tertiary,
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}>
                0
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>Team Members</p>
            </div>
            
            <div className="stat-item" style={{
              background: theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.medium,
              padding: '2rem',
              textAlign: 'center',
              boxShadow: theme.shadows.small,
            }}>
              <h3 className="stat-count" data-value="5" style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: theme.colors.accent1,
                marginBottom: '0.5rem',
                lineHeight: 1,
              }}>
                0
              </h3>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;