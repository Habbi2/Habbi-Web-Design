import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursorDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power1.out"
      });
      
      gsap.to(cursorOutlineRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    const handleLinkHover = () => setIsPointer(true);
    const handleLinkLeave = () => setIsPointer(false);
    
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const links = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        className="cursor-dot" 
        ref={cursorDotRef}
        style={{
          transform: isActive ? 'translate(-50%, -50%) scale(0.75)' : 'translate(-50%, -50%) scale(1)',
          opacity: isPointer ? 0.5 : 1
        }}
      />
      <div 
        className="cursor-outline" 
        ref={cursorOutlineRef}
        style={{
          transform: isActive 
            ? 'translate(-50%, -50%) scale(1.5)' 
            : 'translate(-50%, -50%) scale(1)',
          width: isPointer ? '60px' : '40px',
          height: isPointer ? '60px' : '40px',
          borderColor: isPointer 
            ? 'rgba(0, 229, 255, 0.7)' 
            : 'rgba(0, 229, 255, 0.3)'
        }}
      />
    </>
  );
};

export default CustomCursor;