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
  const [carouselRadius, setCarouselRadius] = useState(400);
  const [itemWidth, setItemWidth] = useState(500);
  const [itemHeight, setItemHeight] = useState(350);
  
  // Calculate responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;
      
      // Adjust carousel radius and item size based on screen width
      if (windowWidth <= 480) {
        // Small mobile
        setCarouselRadius(200);
        setItemWidth(280);
        setItemHeight(220);
      } else if (windowWidth <= 768) {
        // Large mobile/small tablet
        setCarouselRadius(280);
        setItemWidth(350);
        setItemHeight(250);
      } else if (windowWidth <= 1024) {
        // Tablet/small laptop
        setCarouselRadius(350);
        setItemWidth(420);
        setItemHeight(300);
      } else {
        // Desktop
        setCarouselRadius(400);
        setItemWidth(500);
        setItemHeight(350);
      }
    };
    
    // Initial calculation
    updateDimensions();
    
    // Update dimensions when window is resized
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
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
    const angle = index * -(360 / portfolioItems.length);
    
    gsap.to(carouselRef.current, {
      rotationY: angle,
      duration: 1,
      ease: 'power3.out',
    });
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeItem + 1) % portfolioItems.length;
      rotateCarousel(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeItem]);

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
      
      {/* 3D Carousel */}
      <div style={{
        position: 'relative',
        height: itemHeight * 1.5 + 'px',
        perspective: '1000px',
        marginBottom: '5rem',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}>
        <div 
          ref={carouselRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transformStyle: 'preserve-3d',
            transition: 'transform 1s ease',
          }}
        >
          {portfolioItems.map((item, index) => {
            const angle = index * (360 / portfolioItems.length);
            
            return (
              <div 
                key={item.id}
                className="portfolio-item"
                style={{
                  position: 'absolute',
                  width: itemWidth + 'px',
                  height: itemHeight + 'px',
                  top: '50%',
                  left: '50%',
                  margin: `-${itemHeight / 2}px 0 0 -${itemWidth / 2}px`,
                  background: '#111',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${carouselRadius}px)`,
                  transition: 'all 0.5s ease',
                  borderRadius: theme.borderRadius.large,
                  overflow: 'hidden',
                  boxShadow: theme.shadows.large,
                  opacity: activeItem === index ? 1 : 0.7,
                  border: activeItem === index 
                    ? `2px solid ${item.color}`
                    : '2px solid transparent',
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
                  padding: '1.5rem',
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
                    fontSize: window.innerWidth <= 768 ? '1.3rem' : '1.8rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '1rem',
                    display: window.innerWidth <= 480 ? 'none' : 'block',
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

      {/* Add CSS for better responsiveness */}
      <style jsx>{`
        @media screen and (max-width: 768px) {
          .portfolio-item {
            pointer-events: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;