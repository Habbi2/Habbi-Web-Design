import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { theme } from '../styles/theme';
import emailjs from '@emailjs/browser';
import { emailjsConfig, emailjsTemplateMapping } from '../config/emailjs';
import Head from '../components/shared/Head';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// FAQ data
const faqData = [
  {
    question: "What is your typical process for new projects?",
    answer: "Our process begins with an in-depth discovery phase to understand your business goals and target audience. We then move through design, development, testing, and launch phases with collaborative feedback at each step."
  },
  {
    question: "How long does a typical website project take?",
    answer: "Project timelines vary based on complexity, but a standard website typically takes 8-12 weeks from concept to launch. Custom web applications or e-commerce sites may require additional time."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes, we offer several maintenance and support packages to ensure your site remains secure, updated, and performant. We can also provide training for your team to manage content updates."
  },
  {
    question: "How do you handle website hosting?",
    answer: "We offer managed hosting solutions with best-in-class providers, ensuring excellent performance, reliability, and security. We can also work with your existing hosting provider if preferred."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on the scope, complexity, and timeline of your specific needs. We provide detailed proposals after an initial consultation to understand your requirements."
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    budget: 'Not specified'
  });
  
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const faqRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Prepare template parameters based on our mapping
    const templateParams = {};
    Object.keys(emailjsTemplateMapping.contactPage).forEach(key => {
      templateParams[emailjsTemplateMapping.contactPage[key]] = formData[key];
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
      setFormSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          budget: 'Not specified'
        });
        setFormSubmitted(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to send your message. Please try again.');
    });
  };
  
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
    
    // Form animation
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%'
        }
      }
    );
    
    // Contact info animation
    gsap.fromTo(contactInfoRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 75%'
        }
      }
    );
    
    // FAQ animation
    gsap.fromTo(faqRef.current.querySelectorAll('.faq-heading'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 80%'
        }
      }
    );
    
    gsap.fromTo(faqRef.current.querySelectorAll('.faq-item'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.6, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);
  
  return (
    <div style={{ background: theme.colors.background }}>
      {/* Page-specific SEO metadata */}
      <Head
        title="Contact Us"
        description="Get in touch with Habbi Web Design's team for inquiries about your project. Let's create exceptional digital experiences together."
        keywords="contact web design, hire digital agency, web design inquiry, get website quote, contact form"
        ogImage="/images/contact-og-image.jpg"
        canonicalUrl="https://habbiwebdesign.com/contact"
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
          top: '-10%',
          right: '-10%',
          width: '40vw',
          height: '40vw',
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
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradient1,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Get In Touch
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            lineHeight: 1.5,
            maxWidth: '800px',
            marginBottom: '3rem',
            opacity: 0.85,
            fontFamily: theme.fonts.body,
          }}>
            Have a project in mind or want to learn more about our services? 
            We'd love to hear from you and discuss how we can help bring your ideas to life.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section style={{ padding: '2rem 0 6rem' }}>
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          {/* Contact Form - Now Full Width */}
          <div ref={formRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              background: theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.large,
              padding: '2.5rem',
              boxShadow: theme.shadows.medium,
              border: '1px solid rgba(255, 255, 255, 0.03)',
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: theme.colors.text,
              }}>
                Send Us a Message
              </h2>
              
              {formSubmitted ? (
                <div style={{
                  padding: '2rem',
                  background: 'rgba(0, 230, 118, 0.1)',
                  borderRadius: theme.borderRadius.medium,
                  textAlign: 'center',
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: theme.colors.accent2,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: '0.5rem',
                  }}>
                    Thank you for reaching out to us. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="name"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      Your Name*
                    </label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.small,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="email"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      Email Address*
                    </label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.small,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                  }}>
                    <div>
                      <label 
                        htmlFor="phone"
                        style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                        }}
                      >
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: theme.borderRadius.small,
                          color: theme.colors.text,
                          fontSize: '1rem',
                        }}
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="company"
                        style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                        }}
                      >
                        Company
                      </label>
                      <input 
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: theme.borderRadius.small,
                          color: theme.colors.text,
                          fontSize: '1rem',
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="subject"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      Subject*
                    </label>
                    <input 
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.small,
                        color: theme.colors.text,
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label 
                      htmlFor="budget"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      Budget Range
                    </label>
                    <select 
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.small,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                      }}
                      className="dark-select"
                    >
                      <option value="Not specified">Not specified</option>
                      <option value="$5,000 - $10,000">$100 - $500</option>
                      <option value="$10,000 - $25,000">$500 - $2500</option>
                      <option value="$25,000 - $50,000">$2500 - $5000</option>
                      <option value="$50,000+">$5000+</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <label 
                      htmlFor="message"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      Project Details*
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: theme.borderRadius.small,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    style={{
                      display: 'inline-block',
                      width: '100%',
                      padding: '1rem 2rem',
                      background: theme.colors.gradient1,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      borderRadius: theme.borderRadius.medium,
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: theme.transitions.default,
                      boxShadow: theme.shadows.small,
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitError && (
                    <p style={{ color: 'red', marginTop: '1rem' }}>{submitError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={faqRef}
        style={{ 
          padding: '6rem 0 8rem',
          background: 'linear-gradient(to bottom, #0A0A0A 0%, #111111 100%)',
        }}
      >
        <div className="container" style={{ 
          maxWidth: theme.sizes.maxWidth, 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div className="faq-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: theme.fonts.heading,
            }}>
              Frequently Asked <span style={{
                background: theme.colors.gradient1,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Questions</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.9,
              fontFamily: theme.fonts.body,
            }}>
              Have questions about working with us? Here are answers to some of the most common questions we receive.
            </p>
          </div>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {faqData.map((item, index) => (
              <div 
                key={index}
                className="faq-item"
                style={{
                  marginBottom: index === faqData.length - 1 ? 0 : '1.5rem',
                  background: activeAccordion === index ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  borderRadius: theme.borderRadius.medium,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  transition: theme.transitions.default,
                }}
              >
                <button 
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: theme.colors.text,
                    textAlign: 'left',
                  }}
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}>
                    {item.question}
                  </span>
                  <span style={{
                    color: theme.colors.primary,
                    fontWeight: 700,
                    transition: theme.transitions.default,
                    transform: activeAccordion === index ? 'rotate(45deg)' : 'rotate(0)',
                  }}>
                    +
                  </span>
                </button>
                
                <div style={{
                  padding: activeAccordion === index ? '0 1.5rem 1.5rem' : '0 1.5rem',
                  maxHeight: activeAccordion === index ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                }}>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: theme.colors.textSecondary,
                  }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;