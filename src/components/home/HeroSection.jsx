import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const videoRef = useRef(null);
  const mouseFollowerRef = useRef(null);
  const shapesRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      if (mouseFollowerRef.current) {
        // Calculate position relative to hero section
        const heroRect = heroRef.current.getBoundingClientRect();
        const relX = clientX - heroRect.left;
        const relY = clientY - heroRect.top;
        
        // Move mouse follower with a smooth lag effect using GSAP
        gsap.to(mouseFollowerRef.current, {
          x: relX,
          y: relY,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      
      // Parallax effect for floating shapes
      if (shapesRef.current) {
        const shapes = shapesRef.current.children;
        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          const speed = shape.dataset.speed;
          const x = (window.innerWidth / 2 - clientX) * speed;
          const y = (window.innerHeight / 2 - clientY) * speed;
          
          gsap.to(shape, {
            x: x,
            y: y,
            duration: 1,
            ease: "power1.out"
          });
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    // Create a timeline for hero animations
    const tl = gsap.timeline();
    
    // Manual text animation without SplitText
    const headingElements = headingRef.current.querySelectorAll('.animated-text');
    
    tl.fromTo(videoRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(headingElements,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "back.out(1.7)" },
      "-=1"
    )
    .fromTo(".hero-tagline",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-cta",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.7"
    )
    .fromTo(".floating-shape",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.8, ease: "back.out(2)" },
      "-=1"
    )
    .fromTo(mouseFollowerRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.15, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    );
    
    // Create scroll animation for parallax effect
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 250,
      ease: "none"
    });
    
    // Animate floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape) => {
      gsap.to(shape, {
        y: `random(-15, 15)`,
        x: `random(-15, 15)`,
        rotation: `random(-10, 10)`,
        duration: `random(3, 6)`,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: `random(0, 2)`,
      });
    });
    
    // Clean up animations
    return () => {
      tl.kill();
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="hero-section" 
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 var(--page-padding)',
      }}
    >
      {/* Video background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.6,
      }}>
        <div 
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0A0A0A',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #111111 0%, #050505 100%)',
            filter: 'brightness(0.3) contrast(1.1)',
          }}
        >
          {/* Animated gradient overlay instead of video for now */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, 
              rgba(0, 229, 255, 0.08) 0%, 
              rgba(156, 39, 176, 0.08) 50%,
              rgba(255, 61, 0, 0.08) 100%)`,
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
          }} />
        </div>
        
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))',
          zIndex: 1,
        }} />
      </div>
      
      {/* Mouse follower effect */}
      <div 
        ref={mouseFollowerRef}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.primary}40 0%, ${theme.colors.primary}00 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
        }}
      />
      
      {/* Floating 3D Shapes */}
      <div 
        ref={shapesRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div 
          className="floating-shape"
          data-speed="0.05"
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${theme.colors.primary}80, ${theme.colors.primary}20)`,
            borderRadius: '24px',
            transform: 'rotate(45deg)',
            boxShadow: `0 0 30px ${theme.colors.primary}30`,
            opacity: 0,
          }}
        />
        
        <div 
          className="floating-shape"
          data-speed="-0.03"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '60px',
            height: '60px',
            border: `2px solid ${theme.colors.secondary}60`,
            borderRadius: '50%',
            opacity: 0,
          }}
        />
        
        <div 
          className="floating-shape"
          data-speed="0.07"
          style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: '120px',
            height: '120px',
            border: `2px solid ${theme.colors.primary}60`,
            borderRadius: '50%',
            opacity: 0,
          }}
        />
        
        <div 
          className="floating-shape"
          data-speed="-0.06"
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '20%',
            width: '100px',
            height: '100px',
            background: `linear-gradient(135deg, ${theme.colors.tertiary}50, ${theme.colors.tertiary}10)`,
            borderRadius: '30px',
            opacity: 0,
          }}
        />
        
        <div 
          className="floating-shape"
          data-speed="0.04"
          style={{
            position: 'absolute',
            top: '60%',
            right: '30%',
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, ${theme.colors.accent1}60, ${theme.colors.accent1}20)`,
            borderRadius: '12px',
            transformOrigin: 'center',
            opacity: 0,
          }}
        />
      </div>
      
      <div className="container" style={{ 
        position: 'relative',
        zIndex: 2,
        maxWidth: theme.sizes.maxWidth,
      }}>
        <h1 
          ref={headingRef}
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 800,
            lineHeight: '1',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          <span className="animated-text" style={{ display: 'inline-block' }}>Design</span>{' '}
          <span className="animated-text" style={{ display: 'inline-block' }}>that</span>
          <br />
          <span className="animated-text" style={{
            display: 'inline-block',
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Demands
          </span>{' '}
          <span className="animated-text" style={{
            display: 'inline-block',
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Attention
          </span>
        </h1>
        
        <p className="hero-tagline" style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          maxWidth: '600px',
          marginBottom: '3rem',
          opacity: 0.8,
        }}>
          We craft bold digital experiences that transform brands 
          and create meaningful connections with your audience.
        </p>
        
        <div className="hero-cta" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a 
            href="#work" 
            style={{
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
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              const span = btn.querySelector('span');
              gsap.to(span, {
                height: '100%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              const span = btn.querySelector('span');
              gsap.to(span, {
                height: '0',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
          >
            View Our Work
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '0',
              backgroundColor: 'rgba(0,0,0,0.1)',
              transition: 'height 0.3s ease',
            }}></span>
          </a>
          
          <a 
            href="#services" 
            style={{
              display: 'inline-block',
              padding: '1rem 0',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: theme.colors.text,
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              const link = e.currentTarget;
              const span = link.querySelector('span');
              gsap.to(span, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              const link = e.currentTarget;
              const span = link.querySelector('span');
              gsap.to(span, {
                width: '0%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
          >
            Our Services
            <span style={{
              position: 'absolute',
              bottom: '0.8rem',
              left: 0,
              width: '0%',
              height: '2px',
              backgroundColor: theme.colors.primary,
              transition: theme.transitions.default,
            }}></span>
          </a>
        </div>
        
        {/* Interactive typing text */}
        <div style={{ 
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          transform: 'translateY(-50%)',
          fontFamily: theme.fonts.accent,
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          opacity: 0.7,
          display: 'none', // Will be shown in larger viewports with JS
        }} className="typing-text">
          <span style={{ color: theme.colors.primary }}>&lt;code&gt;</span> beautiful interfaces <span style={{ color: theme.colors.primary }}>&lt;/code&gt;</span>
        </div>
        
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.7,
        }}>
          <span style={{ 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            marginBottom: '0.5rem',
          }}>
            Scroll Down
          </span>
          <div style={{
            width: '1px',
            height: '50px',
            backgroundColor: theme.colors.text,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <span style={{
              position: 'absolute',
              top: '-50%',
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.primary,
              animation: 'scrollDown 2s ease-in-out infinite',
            }}></span>
          </div>
        </div>
      </div>
      
      {/* Add keyframes animations */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes scrollDown {
          0% { top: -100% }
          100% { top: 100% }
        }
        
        /* Show typing text on larger screens */
        @media screen and (min-width: 768px) {
          .typing-text {
            display: block;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;