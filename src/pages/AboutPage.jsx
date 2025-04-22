import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../styles/theme';
import Head from '../components/shared/Head';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Company history timeline
const timelineEvents = [
  {
    year: '2020',
    title: 'Founding of Habbi',
    description: 'Habbi Web Design was established with a mission to create exceptional digital experiences for forward-thinking brands.'
  },
  {
    year: '2021',
    title: 'First Major Client',
    description: 'Secured our first enterprise client and expanded our team to accommodate growing project demands.'
  },
  {
    year: '2022',
    title: 'New Office Space',
    description: 'Moved into our current design studio in the creative district, providing a collaborative environment for our growing team.'
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Received multiple design awards for our innovative work, establishing Habbi as a leader in digital design.'
  },
  {
    year: '2024',
    title: 'International Expansion',
    description: 'Started working with clients across Europe and Asia, bringing our design expertise to a global audience.'
  },
  {
    year: '2025',
    title: 'Looking Forward',
    description: 'Continuing to push boundaries in digital design and exploring new technologies to deliver cutting-edge experiences.'
  }
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Hero section animation
    gsap.fromTo(heroRef.current.querySelector('.hero-content'),
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out' 
      }
    );
    
    // Mission statement animation
    gsap.fromTo(missionRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Timeline animation
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    gsap.fromTo(timelineItems,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);
  
  return (
    <div style={{ background: theme.colors.background }}>
      {/* Page-specific SEO metadata */}
      <Head
        title="About Us"
        description="Habbi Web Design is a creative digital studio specializing in crafting bold, minimal web experiences for forward-thinking brands and businesses."
        keywords="web design studio, creative digital agency, UI/UX design team, web development company, brand design specialists"
        ogImage="/images/about-og-image.jpg"
        canonicalUrl="https://habbiwebdesign.com/about"
        author="Habbi Web Design Team"
        publishDate="2023-11-15T08:00:00Z"
      />
      
      {/* Hero section */}
      <section 
        ref={heroRef}
        style={{
          position: 'relative',
          padding: '12rem 0 8rem',
          overflow: 'hidden'
        }}
      >
        {/* Background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156,39,176,0.05) 0%, rgba(156,39,176,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, rgba(0,229,255,0) 70%)',
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
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            About Habbi
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            lineHeight: 1.5,
            maxWidth: '800px',
            marginBottom: '2rem',
            opacity: 0.85,
          }}>
            A collective of digital craftspeople passionate about creating memorable online experiences that bridge the gap between brand objectives and user needs.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}>
            <a 
              href="/contact" 
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
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
              Get In Touch
            </a>
            
            <a 
              href="/work" 
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
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
              View Our Work
            </a>
          </div>
        </div>
      </section>
      
      {/* Mission section */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #0A0A0A 0%, #111111 100%)' }}>
        <div 
          ref={missionRef} 
          className="container" 
          style={{ 
            maxWidth: theme.sizes.maxWidth, 
            margin: '0 auto', 
            padding: '0 2rem' 
          }}
        >
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
              }}>
                Our Mission & <span style={{
                  background: theme.colors.gradient2,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Values</span>
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                opacity: 0.9,
              }}>
                At Habbi, we believe in the transformative power of thoughtful design. Our mission is to craft digital experiences that not only look stunning but also deliver meaningful results for our clients.
              </p>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                opacity: 0.9,
              }}>
                We approach each project with curiosity, empathy, and a commitment to excellence. By understanding our clients' unique challenges and opportunities, we create tailored solutions that help them stand out in an increasingly digital world.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginTop: '2.5rem',
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: theme.colors.backgroundAlt,
                  borderRadius: theme.borderRadius.medium,
                  boxShadow: theme.shadows.small,
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: theme.colors.primary,
                  }}>
                    Innovation
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                    We embrace new technologies and approaches to push the boundaries of what's possible.
                  </p>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: theme.colors.backgroundAlt,
                  borderRadius: theme.borderRadius.medium,
                  boxShadow: theme.shadows.small,
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: theme.colors.secondary,
                  }}>
                    Collaboration
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                    We believe the best results come from true partnership with our clients and team members.
                  </p>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: theme.colors.backgroundAlt,
                  borderRadius: theme.borderRadius.medium,
                  boxShadow: theme.shadows.small,
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: theme.colors.tertiary,
                  }}>
                    Quality
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                    We're committed to excellence in everything we do, from design to development to client service.
                  </p>
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: theme.colors.backgroundAlt,
                  borderRadius: theme.borderRadius.medium,
                  boxShadow: theme.shadows.small,
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: theme.colors.accent1,
                  }}>
                    Impact
                  </h4>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                    We measure our success by the tangible results we create for our clients and their users.
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{
              position: 'relative',
              minHeight: '500px',
            }}>
              {/* Image with gradient overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: '80%',
                borderRadius: theme.borderRadius.large,
                backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: theme.shadows.medium,
                zIndex: 1,
              }} />
              
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '60%',
                width: '50%',
                height: '50%',
                borderRadius: theme.borderRadius.large,
                background: theme.colors.gradient1,
                opacity: 0.5,
                filter: 'blur(30px)',
                zIndex: 0,
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: `2px solid ${theme.colors.primary}`,
                zIndex: 2,
              }} />
              
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '0',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 61, 0, 0.2)',
                zIndex: 2,
              }} />
            </div>
          </div>
        </div>
      </section>
      
      {/* History/Timeline section */}
      <section style={{ padding: '8rem 0', background: 'linear-gradient(to bottom, #0A0A0A 0%, #111111 100%)' }}>
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
              }}>Journey</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
            }}>
              From our founding to the present day, we've been on a mission to create exceptional digital experiences.
            </p>
          </div>
          
          <div 
            ref={timelineRef}
            style={{ 
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '15px',
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(0,229,255,0.3) 0%, rgba(156,39,176,0.3) 100%)',
            }} />
            
            {/* Timeline items */}
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className="timeline-item"
                style={{ 
                  display: 'flex',
                  marginBottom: index === timelineEvents.length - 1 ? 0 : '3rem',
                  position: 'relative',
                }}
              >
                <div style={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme.colors.gradient1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1.5rem',
                  zIndex: 2,
                  boxShadow: theme.shadows.small,
                }} />
                
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginRight: '1rem',
                    }}>
                      {event.title}
                    </h3>
                    
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(0, 229, 255, 0.1)',
                      color: theme.colors.primary,
                      borderRadius: theme.borderRadius.small,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}>
                      {event.year}
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    opacity: 0.85,
                  }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section style={{ padding: '6rem 0' }}>
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
            }}>
              Ready to create something <span style={{
                background: theme.colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>amazing</span> together?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              opacity: 0.9,
            }}>
              We're always looking for new challenges and exciting projects. Let's discuss how we can help transform your digital presence.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
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
              
              <a 
                href="/work" 
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  background: 'transparent',
                  color: theme.colors.text,
                  fontWeight: 600,
                  borderRadius: theme.borderRadius.medium,
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  transition: theme.transitions.default,
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                }}
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;