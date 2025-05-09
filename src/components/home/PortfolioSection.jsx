import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Enhanced portfolio data with descriptions and alt tags
const portfolioItems = [
  {
    id: 1,
    title: 'Novo - Fashion Brand',
    category: 'E-Commerce',
    image: '/images/portfolio/fashion-ecommerce.jpg',
    alt: "Novo fashion e-commerce website featuring minimalist design with product grid layout", 
    description: "A modern e-commerce platform for a high-end fashion brand with seamless checkout experience",
    color: theme.colors.primary,
  },
  {
    id: 2,
    title: 'Vertex Finance',
    category: 'Financial Services',
    image: '/images/portfolio/finance-dashboard.jpg',
    alt: "Vertex Finance dashboard showing financial analytics with interactive data visualizations", 
    description: "Intuitive financial dashboard with real-time data visualization and personalized insights",
    color: theme.colors.secondary,
  },
  {
    id: 3,
    title: 'Pulse Media',
    category: 'Entertainment Platform',
    image: '/images/portfolio/media-platform.jpg',
    alt: "Pulse Media streaming platform interface with content recommendations and media player", 
    description: "Interactive media streaming platform with personalized content curation",
    color: theme.colors.tertiary,
  },
  {
    id: 4,
    title: 'Evergreen',
    category: 'Sustainability Platform',
    image: '/images/portfolio/sustainability-app.jpg',
    alt: "Evergreen sustainability app showing eco-friendly metrics and environmental impact dashboard", 
    description: "App helping users track and reduce their carbon footprint with actionable insights",
    color: theme.colors.accent2,
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Animate section title on scroll
    gsap.fromTo('.portfolio-title', 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate portfolio items
    gsap.fromTo('.portfolio-item', 
      { y: 100, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);
  
  // Handle rotation of the carousel
  const rotateCarousel = (index) => {
    setActiveItem(index);
    
    if (!isMobile) {
      const angle = index * -(360 / portfolioItems.length);
      
      gsap.to(carouselRef.current, {
        rotationY: angle,
        duration: 1,
        ease: 'power3.out',
      });
    }
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeItem + 1) % portfolioItems.length;
      rotateCarousel(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeItem, isMobile]);

  // Calculate responsive card width
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 'calc(100% - 40px)'; // Very small devices
      if (window.innerWidth < 768) return 'calc(90% - 40px)';  // Small devices
      if (window.innerWidth < 1024) return '400px';            // Medium devices
      return '500px';                                          // Large devices
    }
    return '500px'; // Default
  };

  // Calculate margin offset for centering
  const getCardMarginLeft = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 'calc(-50% + 20px)'; 
      if (window.innerWidth < 768) return 'calc(-45% + 20px)';
      if (window.innerWidth < 1024) return '-200px';
      return '-250px';
    }
    return '-250px'; // Default
  };

  return (
    <section 
      ref={sectionRef}
      id="work" 
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: theme.colors.backgroundAlt,
      }}
    >
      <div className="container">
        <h2 className="portfolio-title" style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          marginBottom: '4rem',
          textAlign: 'center',
          letterSpacing: '-0.03em',
        }}>
          Our <span style={{
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Featured</span> Work
        </h2>
      </div>
      
      {/* Carousel Container - maintains 600px height per requirement */}
      <div style={{
        position: 'relative',
        height: '600px',
        perspective: isMobile ? 'none' : '1000px',
        marginBottom: '5rem',
        overflow: 'hidden',
      }}>
        <div 
          ref={carouselRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transformStyle: isMobile ? 'flat' : 'preserve-3d',
            transition: 'transform 1s ease',
          }}
        >
          {portfolioItems.map((item, index) => {
            const angle = index * (360 / portfolioItems.length);
            const radius = 400;
            
            return (
              <div 
                key={item.id}
                className="portfolio-item"
                style={{
                  position: 'absolute',
                  width: getCardWidth(),
                  height: '350px', // Keeping height as is per requirement
                  top: '50%',
                  left: '50%',
                  margin: `-175px 0 0 ${getCardMarginLeft()}`,
                  background: '#111',
                  transformStyle: isMobile ? 'flat' : 'preserve-3d',
                  transform: isMobile 
                    ? `translateX(${index === activeItem ? 0 : (index < activeItem ? '-100%' : '100%')})`
                    : `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transition: 'all 0.5s ease',
                  borderRadius: theme.borderRadius.large,
                  overflow: 'hidden',
                  boxShadow: theme.shadows.large,
                  opacity: activeItem === index ? 1 : (isMobile ? 0 : 0.7),
                  border: activeItem === index 
                    ? `2px solid ${item.color}`
                    : '2px solid transparent',
                  zIndex: activeItem === index ? 10 : 1,
                  display: isMobile ? (activeItem === index ? 'block' : 'none') : 'block',
                }}
                onClick={() => rotateCarousel(index)}
              >
                <div 
                  role="img"
                  aria-label={item.alt}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)',
                    transition: 'all 0.5s ease',
                    transform: activeItem === index ? 'scale(1.05)' : 'scale(1)',
                  }} 
                />
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '2rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                  transition: 'all 0.3s ease',
                  transform: activeItem === index ? 'translateY(0)' : 'translateY(20px)',
                  opacity: activeItem === index ? 1 : 0.7,
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    fontSize: '0.8rem',
                    backgroundColor: item.color,
                    color: '#000',
                    borderRadius: theme.borderRadius.small,
                    marginBottom: '0.5rem',
                  }}>
                    {item.category}
                  </span>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '1rem',
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Carousel controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            onClick={() => rotateCarousel(index)}
            aria-label={`Portfolio item ${index + 1}`}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: activeItem === index 
                ? theme.colors.primary 
                : 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: theme.transitions.default,
            }}
          />
        ))}
      </div>
      
      {/* View all work link */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="/work" style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          fontSize: '1rem',
          fontWeight: 600,
          border: `2px solid ${theme.colors.primary}`,
          color: theme.colors.primary,
          borderRadius: theme.borderRadius.medium,
          transition: theme.transitions.default,
          position: 'relative',
          overflow: 'hidden',
        }}>
          View All Projects
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.primary,
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            zIndex: -1,
          }}></span>
        </a>
      </div>
    </section>
  );
};

export default PortfolioSection;