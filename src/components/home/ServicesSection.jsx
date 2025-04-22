import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Service card data
const services = [
  {
    id: 1,
    icon: '💻',
    title: 'Web Design & Development',
    description: 'Beautiful, responsive websites that engage your audience and drive results. We build with modern frameworks and best practices.',
    color: theme.colors.primary
  },
  {
    id: 2,
    icon: '📱',
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, seamless experiences across all devices and touchpoints.',
    color: theme.colors.secondary
  },
  {
    id: 3,
    icon: '🚀',
    title: 'Digital Branding',
    description: 'Strategic brand development that communicates your vision, values, and unique voice to the world.',
    color: theme.colors.tertiary
  },
  {
    id: 4,
    icon: '📊',
    title: 'SEO & Analytics',
    description: 'Data-driven strategies to increase visibility, drive qualified traffic, and optimize conversion rates.',
    color: theme.colors.accent1
  },
  {
    id: 5,
    icon: '🛍️',
    title: 'E-Commerce Solutions',
    description: 'Custom online stores with secure payment gateways, inventory management, and seamless user experience.',
    color: theme.colors.accent2
  },
  {
    id: 6,
    icon: '🔄',
    title: 'Maintenance & Support',
    description: 'Ongoing technical support, content updates, security monitoring, and performance optimization.',
    color: theme.colors.primary
  }
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    // Animate section title
    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate service cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
    
    // Hover effect for cards
    cardsRef.current.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -15, duration: 0.3, ease: 'power2.out' });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
    
    // Clean up event listeners
    return () => {
      cardsRef.current.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  return (
    <section 
      id="services" 
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: theme.colors.background,
      }}
    >
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, rgba(0,229,255,0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,61,0,0.05) 0%, rgba(255,61,0,0) 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
      }} />
      
      <div className="container">
        <div 
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}>
            Our <span style={{
              background: theme.colors.gradient2,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Services</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.8,
          }}>
            We offer comprehensive digital solutions tailored to your brand's unique needs
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {services.map((service, index) => (
            <div 
              key={service.id}
              ref={addToRefs}
              style={{
                background: theme.colors.backgroundAlt,
                borderRadius: theme.borderRadius.large,
                padding: '2.5rem',
                transition: theme.transitions.default,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Service icon */}
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
                display: 'inline-block',
              }}>
                {service.icon}
              </div>
              
              {/* Gradient accent */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: service.color,
                opacity: 0.8,
              }} />
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
                position: 'relative',
                zIndex: 1,
              }}>
                {service.title}
              </h3>
              
              <p style={{
                fontSize: '1rem',
                opacity: 0.8,
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
              }}>
                {service.description}
              </p>
              
              {/* Learn More link that appears on hover */}
              <div style={{
                marginTop: '1.5rem',
                opacity: 0.7,
                transition: theme.transitions.default,
              }}>
                <a href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  color: service.color,
                  fontWeight: 600,
                }}>
                  Learn More 
                  <span style={{ marginLeft: '0.5rem' }}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;