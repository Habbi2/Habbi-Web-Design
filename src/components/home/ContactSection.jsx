import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../../styles/theme';
import emailjs from '@emailjs/browser';
import { emailjsConfig, emailjsTemplateMapping } from '../../config/emailjs';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'web-design',
    budget: '$5,000 - $10,000'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Prepare template parameters based on our mapping
    const templateParams = {};
    Object.keys(emailjsTemplateMapping.contactSection).forEach(key => {
      templateParams[emailjsTemplateMapping.contactSection[key]] = formState[key];
    });
    
    // Send email using EmailJS
    emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      setIsSubmitting(false);
      
      // Animate form submission
      const tl = gsap.timeline();
      tl.to(formRef.current, { 
        y: -20, 
        opacity: 0, 
        duration: 0.5, 
        ease: 'power2.inOut' 
      })
      .set(formRef.current, { display: 'none' })
      .fromTo('.success-message', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      setFormSubmitted(true);
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to send your message. Please try again.');
    });
  };
  
  useEffect(() => {
    // Animate section elements on scroll
    gsap.fromTo(titleRef.current,
      { y: 80, opacity: 0 },
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
    
    // Animate form inputs with stagger
    const formElements = formRef.current.querySelectorAll('input, textarea, select, button');
    gsap.fromTo(formElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
        }
      }
    );
    
    // Add focus animations for form inputs
    const inputElements = formRef.current.querySelectorAll('.form-input');
    inputElements.forEach((input) => {
      const inputField = input.querySelector('input, textarea, select');
      const inputBorder = input.querySelector('.input-border');
      
      inputField.addEventListener('focus', () => {
        gsap.to(inputBorder, { 
          width: '100%', 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
      
      inputField.addEventListener('blur', () => {
        if (!inputField.value) {
          gsap.to(inputBorder, { 
            width: '0%', 
            duration: 0.3, 
            ease: 'power2.out' 
          });
        }
      });
    });
    
    // Cleanup event listeners
    return () => {
      inputElements.forEach((input) => {
        const inputField = input.querySelector('input, textarea, select');
        inputField.removeEventListener('focus', () => {});
        inputField.removeEventListener('blur', () => {});
      });
    };
  }, []);
  
  return (
    <section 
      id="contact"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: theme.colors.background,
      }}
    >
      {/* Background gradient shapes */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, rgba(0,229,255,0) 70%)',
        filter: 'blur(70px)',
        zIndex: 0,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '8%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,61,0,0.03) 0%, rgba(255,61,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />
      
      <div className="container">
        <div 
          ref={titleRef}
          style={{ 
            textAlign: 'center',
            marginBottom: '4rem',
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
            Let's <span style={{
              background: theme.colors.gradient1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Connect</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.8,
          }}>
            Ready to elevate your digital presence? Tell us about your project and let's create something amazing together.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Contact Form */}
          <div>
            {!formSubmitted ? (
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                  background: theme.colors.backgroundAlt,
                  padding: '3rem',
                  borderRadius: theme.borderRadius.large,
                  boxShadow: theme.shadows.medium,
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="form-input" style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <label 
                      htmlFor="name"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="form-input" style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <label 
                      htmlFor="email"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="form-input" style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <label 
                      htmlFor="company"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-input" style={{ position: 'relative' }}>
                    <label 
                      htmlFor="service"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        appearance: 'none',
                        cursor: 'pointer',
                      }}
                      className="dark-select"
                    >
                      <option value="web-design">Web Design & Development</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="branding">Digital Branding</option>
                      <option value="seo">SEO & Analytics</option>
                      <option value="ecommerce">E-Commerce Solutions</option>
                      <option value="maintenance">Maintenance & Support</option>
                    </select>
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  
                  <div className="form-input" style={{ position: 'relative' }}>
                    <label 
                      htmlFor="budget"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="dark-select"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        cursor: 'pointer',
                      }}
                    >
                        <option value="Not specified">Not specified</option>
                        <option value="$5,000 - $10,000">$100 - $500</option>
                        <option value="$10,000 - $25,000">$500 - $2500</option>
                        <option value="$25,000 - $50,000">$2500 - $5000</option>
                        <option value="$50,000+">$5000+</option>
                    </select>
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <div className="form-input" style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <label 
                      htmlFor="message"
                      style={{ 
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        opacity: 0.8,
                      }}
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.medium,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        resize: 'vertical',
                      }}
                    />
                    <div className="input-border" style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.colors.primary,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: theme.colors.primary,
                    color: '#000000',
                    fontSize: '1rem',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: theme.borderRadius.medium,
                    cursor: 'pointer',
                    transition: theme.transitions.default,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>Send Message</span>
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.1)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                  }}></span>
                </button>
              </form>
            ) : (
              <div 
                className="success-message"
                style={{
                  background: theme.colors.backgroundAlt,
                  padding: '3rem',
                  borderRadius: theme.borderRadius.large,
                  boxShadow: theme.shadows.medium,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem',
                  color: theme.colors.primary,
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}>
                  Thanks for reaching out!
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: 0.8,
                  marginBottom: '2rem',
                }}>
                  We've received your message and will contact you shortly to discuss your project.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: theme.colors.primary,
                    fontSize: '1rem',
                    fontWeight: 600,
                    border: `2px solid ${theme.colors.primary}`,
                    borderRadius: theme.borderRadius.medium,
                    cursor: 'pointer',
                    transition: theme.transitions.default,
                  }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
          
          {/* Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}>
                Contact Information
              </h3>
              
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ 
                    opacity: 0.7,
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                  }}>
                    Email
                  </p>
                  <a 
                    href="mailto:hello@habbiwebdesign.com"
                    style={{
                      fontSize: '1.1rem',
                      color: theme.colors.primary,
                      fontWeight: 500,
                    }}
                  >
                    habbiwebdesign@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}>
                Follow Us
              </h3>
              
              <div style={{ 
                display: 'flex',
                gap: '1.5rem',
              }}>
                
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: theme.transitions.default,
                  fontSize: '1.2rem',
                }}>
                  <span>📷</span>
                </a>
                
                <a href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: theme.transitions.default,
                  fontSize: '1.2rem',
                }}>
                  <span>🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;