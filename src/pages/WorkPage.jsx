import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../styles/theme';

// Sample project data - in a real app, this would come from an API or CMS
const projectsData = [
  {
    id: 1,
    title: "Luminous Retail Platform",
    category: "E-commerce",
    description: "A complete e-commerce solution with inventory management, analytics dashboard, and customer portal.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 2, 
    title: "Verdant Landscapes",
    category: "Corporate Website",
    description: "Custom website with content management system for a landscape architecture firm.",
    technologies: ["WordPress", "PHP", "MySQL", "GSAP"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Pulse Analytics Platform",
    category: "Web Application",
    description: "Real-time analytics dashboard for monitoring social media engagement across platforms.",
    technologies: ["Vue.js", "Firebase", "D3.js", "Python"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Nexus Education Portal",
    category: "Educational Platform",
    description: "Online learning platform with course management, student progress tracking, and interactive quizzes.",
    technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    title: "Azure Fitness App",
    category: "Mobile Application",
    description: "Cross-platform fitness application with workout plans, nutrition tracking, and social features.",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    title: "Orbital Marketing Site",
    category: "Marketing Website",
    description: "Interactive marketing website for a SaaS product with animated illustrations and pricing calculator.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Stripe"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  }
];

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const WorkPage = () => {
  const [filter, setFilter] = useState('all');
  const pageHeaderRef = useRef(null);
  const projectsRef = useRef(null);
  
  // Filter projects based on selection
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.toLowerCase() === filter.toLowerCase());

  useEffect(() => {
    // Animate page header
    gsap.fromTo(pageHeaderRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageHeaderRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate project items
    const projectItems = projectsRef.current.querySelectorAll('.project-item');
    gsap.fromTo(projectItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 75%',
        }
      }
    );
  }, [filter]); // Re-run when filter changes

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section 
        style={{ 
          padding: '10rem 0 6rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, rgba(0,229,255,0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }} />
        
        <div className="container" style={{ maxWidth: theme.sizes.maxWidth, margin: '0 auto', padding: '0 2rem' }}>
          <div ref={pageHeaderRef}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: theme.fonts.heading,
              background: theme.colors.gradient1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Our Work
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              lineHeight: 1.5,
              maxWidth: '800px',
              marginBottom: '3rem',
              opacity: 0.85,
              fontFamily: theme.fonts.body,
            }}>
              Explore our portfolio of digital experiences crafted with passion, precision, and purpose. 
              Each project represents our commitment to excellence and innovation.
            </p>
            
            {/* Filter controls */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '4rem'
            }}>
              <FilterButton 
                active={filter === 'all'} 
                onClick={() => setFilter('all')}
              >
                All Projects
              </FilterButton>
              <FilterButton 
                active={filter === 'E-commerce'} 
                onClick={() => setFilter('E-commerce')}
              >
                E-commerce
              </FilterButton>
              <FilterButton 
                active={filter === 'Corporate Website'} 
                onClick={() => setFilter('Corporate Website')}
              >
                Corporate
              </FilterButton>
              <FilterButton 
                active={filter === 'Web Application'} 
                onClick={() => setFilter('Web Application')}
              >
                Web Apps
              </FilterButton>
              <FilterButton 
                active={filter === 'Mobile Application'} 
                onClick={() => setFilter('Mobile Application')}
              >
                Mobile Apps
              </FilterButton>
              <FilterButton 
                active={filter === 'Marketing Website'} 
                onClick={() => setFilter('Marketing Website')}
              >
                Marketing
              </FilterButton>
              <FilterButton 
                active={filter === 'Educational Platform'} 
                onClick={() => setFilter('Educational Platform')}
              >
                Education
              </FilterButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid Section */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container" style={{ maxWidth: theme.sizes.maxWidth, margin: '0 auto', padding: '0 2rem' }}>
          <div 
            ref={projectsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center',
                padding: '4rem 0'
              }}>
                <h3 style={{ 
                  color: theme.colors.textSecondary,
                  fontSize: '1.5rem'
                }}>
                  No projects found in this category.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section style={{ 
        padding: '6rem 0',
        background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(17,17,17,0.9))',
        position: 'relative',
      }}>
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0,
          }}
        />
        
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ 
            textAlign: 'center', 
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              color: theme.colors.text,
            }}>
              Ready to Transform Your Digital Presence?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              opacity: 0.9,
            }}>
              Let's collaborate to create a remarkable digital experience tailored to your unique brand and objectives.
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
              Start a Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for project cards
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    // Add hover animation
    const card = cardRef.current;
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.project-image'), {
        scale: 1.05,
        duration: 0.4,
        ease: 'power1.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.project-image'), {
        scale: 1,
        duration: 0.4,
        ease: 'power1.out'
      });
    });
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="project-item" 
      style={{
        borderRadius: theme.borderRadius.medium,
        overflow: 'hidden',
        boxShadow: theme.shadows.small,
        background: theme.colors.backgroundAlt,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: theme.transitions.default,
      }}
    >
      <div style={{ 
        height: '240px',
        overflow: 'hidden',
      }}>
        <div 
          className="project-image"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: theme.transitions.default,
          }}
        />
      </div>
      
      <div style={{ 
        padding: '1.5rem',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{ 
            fontSize: '0.85rem',
            color: theme.colors.primary,
            fontWeight: 600,
          }}>
            {project.category}
          </span>
          
          {project.featured && (
            <span style={{ 
              fontSize: '0.75rem',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              color: theme.colors.primary,
              padding: '0.25rem 0.5rem',
              borderRadius: theme.borderRadius.small,
            }}>
              Featured
            </span>
          )}
        </div>
        
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
        }}>
          {project.title}
        </h3>
        
        <p style={{ 
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: theme.colors.textSecondary,
          marginBottom: '1.5rem',
          flexGrow: 1,
        }}>
          {project.description}
        </p>
        
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.6rem',
                borderRadius: theme.borderRadius.small,
                background: 'rgba(255, 255, 255, 0.05)',
                color: theme.colors.textSecondary,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper component for filter buttons
const FilterButton = ({ children, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '0.6rem 1.2rem',
        borderRadius: theme.borderRadius.small,
        background: active ? theme.colors.primary : 'rgba(255, 255, 255, 0.05)',
        color: active ? '#0A0A0A' : theme.colors.textSecondary,
        border: 'none',
        fontWeight: 500,
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: theme.transitions.default,
      }}
    >
      {children}
    </button>
  );
};

export default WorkPage;