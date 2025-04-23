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
  const typingTextRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for initial render
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Check for mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
    };
    
    checkMobile(); // Check on initial load
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    // Only enable mouse tracking on non-mobile devices
    if (isMobile) return;
    
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
  }, [isMobile]);
  
  // Typing animation for the typing text element
  useEffect(() => {
    if (isMobile || !typingTextRef.current) return;
    
    const texts = [
      "Designing the future, one pixel at a time.",
      "Crafting digital experiences that inspire.",
      "Where creativity meets functionality.",
      "Elevating brands through great design."
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseDuration = 1500;
    
    const type = () => {
      const currentText = texts[currentTextIndex];
      
      if (isDeleting) {
        // Deleting text
        if (typingTextRef.current) {
          typingTextRef.current.textContent = currentText.substring(0, currentCharIndex);
          currentCharIndex--;
          typingSpeed = 50;
        }
        
        // When deletion is complete
        if (currentCharIndex < 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          currentCharIndex = 0;
          typingSpeed = 100;
          setTimeout(type, 500); // Pause before typing next text
          return;
        }
      } else {
        // Typing text
        if (typingTextRef.current) {
          typingTextRef.current.textContent = currentText.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          typingSpeed = 100;
        }
        
        // When typing is complete
        if (currentCharIndex >= currentText.length) {
          isDeleting = true;
          typingSpeed = pauseDuration; // Pause before deleting
        }
      }
      
      setTimeout(type, typingSpeed);
    };
    
    // Start typing animation
    setTimeout(type, 1000);
  }, [isMobile]);
  
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
    );
    
    // Only animate mouse follower on non-mobile devices
    if (!isMobile && mouseFollowerRef.current) {
      tl.fromTo(mouseFollowerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      );
    }
    
    // Create scroll animation for parallax effect - lighter effect on mobile
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: isMobile ? 150 : 250,
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
  }, [isMobile]);

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
        padding: windowWidth < 480 ? '0 20px' : '0 var(--page-padding)',
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
      
      {/* Mouse follower effect - only shown on desktop */}
      {!isMobile && (
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
            display: 'block', // Removed conditional display
          }}
        />
      )}
      
      {/* Floating 3D Shapes - simplified on mobile */}
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
        {/* Render fewer shapes on mobile */}
        <div 
          className="floating-shape"
          data-speed="0.05"
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: windowWidth < 768 ? '60px' : '80px',
            height: windowWidth < 768 ? '60px' : '80px',
            background: `linear-gradient(135deg, ${theme.colors.primary}80, ${theme.colors.primary}20)`,
            borderRadius: '24px',
            transform: 'rotate(45deg)',
            boxShadow: `0 0 30px ${theme.colors.primary}30`,
            opacity: 0,
          }}
        />
        
        {windowWidth >= 768 && (
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
        )}
        
        <div 
          className="floating-shape"
          data-speed="0.07"
          style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: isMobile ? '80px' : '120px',
            height: isMobile ? '80px' : '120px',
            border: `2px solid ${theme.colors.primary}60`,
            borderRadius: '50%',
            opacity: 0,
          }}
        />
        
        {!isMobile && (
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
        )}
        
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
        width: '100%',
        padding: windowWidth < 480 ? '0 10px' : '0',
      }}>
        <h1 
          ref={headingRef}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 8rem)',
            fontWeight: 800,
            lineHeight: '1',
            marginBottom: windowWidth < 768 ? '1rem' : '2rem',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            wordBreak: 'break-word', // Add word-breaking for small screens
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
          fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
          maxWidth: '600px',
          marginBottom: isMobile ? '2rem' : '3rem',
          opacity: 0.8,
        }}>
          We craft bold digital experiences that transform brands 
          and create meaningful connections with your audience.
        </p>
        
        <div className="hero-cta" style={{ 
          display: 'flex', 
          gap: isMobile ? '1rem' : '1.5rem', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto'
        }}>
          <a 
            href="#work" 
            style={{
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
              width: isMobile ? '100%' : 'auto',
              textAlign: isMobile ? 'center' : 'left',
            }}
            onMouseEnter={(e) => {
              if (isMobile) return;
              const btn = e.currentTarget;
              const span = btn.querySelector('span');
              gsap.to(span, {
                height: '100%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              if (isMobile) return;
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
              fontSize: isMobile ? '1rem' : '1.2rem',
              fontWeight: 600,
              color: theme.colors.text,
              position: 'relative',
              textAlign: isMobile ? 'center' : 'left',
              width: isMobile ? '100%' : 'auto',
            }}
            onMouseEnter={(e) => {
              if (isMobile) return;
              const link = e.currentTarget;
              const span = link.querySelector('span');
              gsap.to(span, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              if (isMobile) return;
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
              left: isMobile ? '25%' : 0,
              width: isMobile ? '50%' : '0%',
              height: '2px',
              backgroundColor: theme.colors.primary,
              transition: theme.transitions.default,
            }}></span>
          </a>
        </div>
        
        {/* Interactive typing text - only on larger screens */}
        {!isMobile && (
          <div 
            ref={typingTextRef}
            style={{ 
              position: 'absolute',
              bottom: '15%',
              right: '5%',
              transform: 'translateY(-50%)',
              fontFamily: theme.fonts.accent,
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              opacity: 0.7,
            }} 
            className="typing-text"
          >
          </div>
        )}
        
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '1rem' : '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.7,
        }}>
        </div>
      </div>
      
      {/* Add keyframes animations */}
      <style>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        
        @keyframes scrollDown {
          0% { top: -100% }
          100% { top: 100% }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;