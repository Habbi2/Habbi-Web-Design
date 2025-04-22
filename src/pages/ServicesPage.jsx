import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../styles/theme';
import Head from '../components/shared/Head';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Services data
const servicesData = [
  {
    id: 1,
    title: 'Website Design & Development',
    description: 'Custom websites that blend stunning aesthetics with seamless functionality to create memorable online experiences for your audience.',
    features: [
      'Responsive design for all devices',
      'User experience optimization',
      'Custom animations and interactions',
      'Performance optimization',
      'Content management systems',
      'E-commerce functionality'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12L3 12" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 8L14 16" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12L21 12" stroke="url(#paint3_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#9C27B0"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="3" y1="12.5" x2="8" y2="12.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#9C27B0"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="10" y1="12" x2="14" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#9C27B0"/>
          </linearGradient>
          <linearGradient id="paint3_linear" x1="16" y1="12.5" x2="21" y2="12.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#9C27B0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.primary,
  },
  {
    id: 2,
    title: 'Brand Identity & Design',
    description: 'Strategic brand development that communicates your unique value proposition and resonates with your target audience.',
    features: [
      'Logo design and identity systems',
      'Brand strategy and positioning',
      'Visual language development',
      'Brand guidelines',
      'Marketing collateral',
      'Social media assets'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2L9.5 9.5" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke="url(#paint3_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="12" y1="19" x2="22" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00"/>
            <stop offset="1" stopColor="#FFD600"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="2" y1="10" x2="18" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00"/>
            <stop offset="1" stopColor="#FFD600"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="2" y1="5.75" x2="9.5" y2="5.75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00"/>
            <stop offset="1" stopColor="#FFD600"/>
          </linearGradient>
          <linearGradient id="paint3_linear" x1="9" y1="11" x2="13" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00"/>
            <stop offset="1" stopColor="#FFD600"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.secondary,
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'User-centered design approach that focuses on creating intuitive, accessible, and engaging digital experiences.',
    features: [
      'User research and personas',
      'Information architecture',
      'Wireframing and prototyping',
      'Usability testing',
      'Interaction design',
      'Accessibility compliance'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 13V21" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18H15" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="7" y1="8" x2="17" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0"/>
            <stop offset="1" stopColor="#00E5FF"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="12" y1="17" x2="13" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0"/>
            <stop offset="1" stopColor="#00E5FF"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="9" y1="18.5" x2="15" y2="18.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0"/>
            <stop offset="1" stopColor="#00E5FF"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.tertiary,
  },
  {
    id: 4,
    title: 'E-commerce Solutions',
    description: 'End-to-end e-commerce development that combines seamless shopping experiences with robust backend systems.',
    features: [
      'Custom online stores',
      'Product catalog management',
      'Secure payment gateways',
      'Inventory management',
      'Order fulfillment integration',
      'Analytics and reporting'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#00E676"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="3" y1="6.5" x2="21" y2="6.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#00E676"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="8" y1="12" x2="16" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF"/>
            <stop offset="1" stopColor="#00E676"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.accent2,
  },
  {
    id: 5,
    title: 'Digital Marketing',
    description: 'Strategic digital marketing solutions that increase brand visibility, drive traffic, and convert leads into customers.',
    features: [
      'Search engine optimization (SEO)',
      'Content marketing strategy',
      'Social media marketing',
      'Email marketing campaigns',
      'Paid advertising management',
      'Analytics and performance tracking'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20V10" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 20V4" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 20V16" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="12" y1="15" x2="13" y2="15" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600"/>
            <stop offset="1" stopColor="#FF3D00"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="18" y1="12" x2="19" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600"/>
            <stop offset="1" stopColor="#FF3D00"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="6" y1="18" x2="7" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600"/>
            <stop offset="1" stopColor="#FF3D00"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.accent1,
  },
  {
    id: 6,
    title: 'Web Application Development',
    description: 'Custom web applications that solve unique business challenges and streamline operations for improved efficiency.',
    features: [
      'Custom software development',
      'Progressive web applications',
      'Database design and development',
      'API development and integration',
      'Cloud hosting and deployment',
      'Maintenance and support'
    ],
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="16" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0"/>
            <stop offset="1" stopColor="#00E676"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="2" y1="12" x2="8" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9C27B0"/>
            <stop offset="1" stopColor="#00E676"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    accent: theme.colors.primary,
  }
];

// Process tabs
const processTabs = [
  {
    id: 'discovery',
    title: 'Discovery & Strategy',
    description: 'We start by understanding your business, audience, and objectives through in-depth research and strategy sessions. This forms the foundation for all design and development decisions.',
    steps: [
      'Initial consultation and needs assessment',
      'Market and competitor research',
      'User persona development',
      'Project scope definition',
      'Strategic roadmap creation'
    ]
  },
  {
    id: 'design',
    title: 'Design & Prototyping',
    description: 'Our design process focuses on creating intuitive interfaces and engaging experiences that align with your brand and resonate with your users.',
    steps: [
      'Information architecture planning',
      'Wireframing key user flows',
      'Visual design concepts',
      'Interactive prototyping',
      'Client feedback and refinement'
    ]
  },
  {
    id: 'development',
    title: 'Development & Testing',
    description: 'We build robust, scalable solutions using modern technologies and best practices, with rigorous testing throughout the development process.',
    steps: [
      'Technical architecture setup',
      'Front-end and back-end development',
      'Content integration',
      'Cross-browser and device testing',
      'Performance optimization'
    ]
  },
  {
    id: 'launch',
    title: 'Launch & Growth',
    description: 'We ensure a smooth launch and provide ongoing support to help your digital presence evolve and grow with your business.',
    steps: [
      'Pre-launch quality assurance',
      'Deployment and launch',
      'Analytics setup and monitoring',
      'Post-launch optimization',
      'Ongoing maintenance and support'
    ]
  }
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = React.useState('discovery');
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  
  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current.querySelector('.hero-content'),
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      }
    );
    
    // Services animation
    const serviceItems = servicesRef.current.querySelectorAll('.service-item');
    gsap.fromTo(serviceItems,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%'
        }
      }
    );
    
    // Process animation
    gsap.fromTo(processRef.current.querySelector('.process-heading'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%'
        }
      }
    );
    
    gsap.fromTo(processRef.current.querySelector('.tab-container'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <div style={{ background: theme.colors.background }}>
      {/* Page-specific SEO metadata */}
      <Head
        title="Services"
        description="From website design to digital marketing, we provide comprehensive digital solutions tailored to your unique needs and business objectives."
        keywords="web design services, UI/UX design, web development, e-commerce solutions, brand identity, digital marketing, web application development"
        ogImage="/images/services-og-image.jpg"
        canonicalUrl="https://habbiwebdesign.com/services"
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{ 
          padding: '12rem 0 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, rgba(0,229,255,0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '-10%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }} />
        
        <div className="container hero-content" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Our Services
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            lineHeight: 1.5,
            maxWidth: '800px',
            marginBottom: '3rem',
            opacity: 0.85,
            fontFamily: theme.fonts.body,
          }}>
            From concept to launch and beyond, we provide comprehensive digital solutions tailored to your unique needs and objectives.
          </p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <a 
              href="#services" 
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: theme.colors.gradient1,
                color: '#FFFFFF',
                fontWeight: 600,
                borderRadius: theme.borderRadius.medium,
                textDecoration: 'none',
                fontSize: '1rem',
                transition: theme.transitions.default,
                boxShadow: theme.shadows.medium,
              }}
            >
              Explore Services
            </a>
            
            <a 
              href="/contact" 
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'transparent',
                color: theme.colors.text,
                fontWeight: 600,
                borderRadius: theme.borderRadius.medium,
                textDecoration: 'none',
                fontSize: '1rem',
                transition: theme.transitions.default,
                border: `1px solid rgba(255, 255, 255, 0.2)`,
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        id="services"
        ref={servicesRef}
        style={{ 
          padding: '6rem 0',
          background: theme.colors.backgroundAlt,
        }}
      >
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: theme.fonts.heading,
            }}>
              What We <span style={{
                background: theme.colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Offer</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
              fontFamily: theme.fonts.body,
            }}>
              Our comprehensive suite of digital services helps businesses transform their online presence and achieve their goals.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem',
          }}>
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section 
        ref={processRef}
        style={{ 
          padding: '8rem 0',
          background: theme.colors.background,
        }}
      >
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div className="process-heading" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: theme.fonts.heading,
            }}>
              Our <span style={{
                background: theme.colors.gradient2,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Process</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
              fontFamily: theme.fonts.body,
            }}>
              We follow a proven, structured approach to ensure every project delivers exceptional results.
            </p>
          </div>
          
          <div className="tab-container">
            {/* Tab navigation */}
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '3rem',
            }}>
              {processTabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    background: activeTab === tab.id 
                      ? 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(156,39,176,0.15) 100%)' 
                      : 'transparent',
                    border: activeTab === tab.id 
                      ? 'none' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: theme.borderRadius.medium,
                    color: activeTab === tab.id 
                      ? theme.colors.primary 
                      : theme.colors.text,
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: theme.transitions.default,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {activeTab === tab.id && (
                    <span style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(156,39,176,0.1) 100%)',
                      opacity: 0.5,
                    }} />
                  )}
                  {tab.title}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            {processTabs.map(tab => (
              <div 
                key={tab.id}
                style={{ 
                  display: activeTab === tab.id ? 'block' : 'none',
                  animation: activeTab === tab.id ? 'fadeIn 0.5s ease' : 'none',
                }}
              >
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '4rem',
                  alignItems: 'center',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      marginBottom: '1.5rem',
                      background: theme.colors.gradient1,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {tab.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      marginBottom: '2rem',
                      opacity: 0.9,
                    }}>
                      {tab.description}
                    </p>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: theme.borderRadius.medium,
                      padding: '2rem',
                    }}>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        color: theme.colors.text,
                      }}>
                        Key Activities:
                      </h4>
                      
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                      }}>
                        {tab.steps.map((step, idx) => (
                          <li 
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: '1rem',
                            }}
                          >
                            <div style={{
                              minWidth: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(156,39,176,0.2) 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '1rem',
                              marginTop: '0.25rem',
                            }}>
                              <span style={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: theme.colors.primary,
                              }}>
                                {idx + 1}
                              </span>
                            </div>
                            <span style={{
                              fontSize: '1rem',
                              lineHeight: 1.7,
                              opacity: 0.85,
                            }}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div style={{
                    position: 'relative',
                    borderRadius: theme.borderRadius.large,
                    overflow: 'hidden',
                    height: '400px',
                  }}>
                    {/* Different illustration for each tab */}
                    <img 
                      src={
                        tab.id === 'discovery' ? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
                        tab.id === 'design' ? 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                        tab.id === 'development' ? 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                      }
                      alt={tab.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: theme.borderRadius.large,
                      }}
                    />
                    
                    {/* Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(17,17,17,0.7) 100%)',
                      borderRadius: theme.borderRadius.large,
                    }} />
                    
                    {/* Step number */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'rgba(0, 229, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: theme.colors.primary,
                    }}>
                      {processTabs.findIndex(t => t.id === tab.id) + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ padding: '6rem 0 8rem' }}>
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(156,39,176,0.1) 100%)',
            borderRadius: theme.borderRadius.large,
            padding: '4rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0) 70%)',
              filter: 'blur(60px)',
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-5%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0) 70%)',
              filter: 'blur(60px)',
            }} />
            
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: theme.fonts.heading,
            }}>
              Ready to discuss your <span style={{
                background: theme.colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>project</span>?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              opacity: 0.9,
              fontFamily: theme.fonts.body,
            }}>
              Let's collaborate to create a digital solution that meets your unique needs and helps you achieve your business objectives.
            </p>
            
            <a 
              href="/contact" 
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: theme.colors.gradient1,
                color: '#FFFFFF',
                fontWeight: 600,
                borderRadius: theme.borderRadius.medium,
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: theme.transitions.default,
                boxShadow: theme.shadows.medium,
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for service cards
const ServiceCard = ({ service }) => {
  return (
    <div 
      className="service-item"
      style={{
        background: theme.colors.backgroundAlt,
        borderRadius: theme.borderRadius.medium,
        overflow: 'hidden',
        boxShadow: theme.shadows.small,
        transition: theme.transitions.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.03)',
      }}
    >
      <div style={{
        height: '220px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Service image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.8))',
        }} />
        
        {/* Icon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {service.icon}
        </div>
      </div>
      
      <div style={{
        padding: '2rem',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: service.accent,
        }}>
          {service.title}
        </h3>
        
        <p style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          opacity: 0.85,
        }}>
          {service.description}
        </p>
        
        <div style={{
          marginTop: 'auto',
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: theme.colors.text,
          }}>
            Features:
          </h4>
          
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {service.features.map((feature, idx) => (
              <li 
                key={idx}
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{
                  color: service.accent,
                  marginRight: '0.5rem',
                }}>
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;