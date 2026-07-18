// Contact.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Contact.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const contactInfoItems = [
  { icon: 'fa-map-marker-alt', label: 'Address', key: 'address' },
  { icon: 'fa-phone', label: 'Phone', key: 'phone' },
  { icon: 'fa-envelope', label: 'Email', key: 'email' },
  { icon: 'fa-clock', label: 'Working Hours', key: 'hours' },
];

const Contact = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });
  const isFormInView = useInView(formRef, { once: false, amount: 0.1 });
  const isMapInView = useInView(mapRef, { once: false, amount: 0.1 });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log('Fetching settings from:', `${API_BASE_URL}/settings/public`);
        const response = await fetch(`${API_BASE_URL}/settings/public`);
        if (response.ok) {
          const data = await response.json();
          console.log('Settings fetched successfully:', data);
          setSettings(data);
        } else {
          console.error('Failed to fetch settings:', response.status);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

  useEffect(() => {
    const jobParam = searchParams.get('job');
    if (jobParam) {
      setFormData(prev => ({
        ...prev,
        subject: `Application for: ${jobParam}`,
        message: `Dear Hiring Team,\n\nI am writing to express my interest in the "${jobParam}" position. Please find my details attached below.\n\nBest regards,\n`,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Sending contact form to:', `${API_BASE_URL}/contact`);
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Contact form submitted successfully:', data);
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Network error submitting form:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMapSrc = () => {
    if (settings?.googleMapsUrl) {
      if (settings.googleMapsUrl.includes('/embed') || settings.googleMapsUrl.includes('embed?pb=')) {
        return settings.googleMapsUrl;
      }
      return `https://maps.google.com/maps?q=${encodeURIComponent(settings.googleMapsUrl)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    if (settings) {
      const query = `${settings.address}, ${settings.city}, ${settings.state}, ${settings.country}`;
      return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    return 'https://maps.google.com/maps?q=Times+Square,New+York,NY,USA&t=&z=13&ie=UTF8&iwloc=&output=embed';
  };

  // Animation Variants
  const headerContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      }
    }
  };

  const floatingIconVariants = {
    animate: (i) => ({
      y: [0, -20 - i * 5, 0],
      x: [0, (i % 2 === 0 ? 15 : -15), 0],
      rotate: [0, i * 5, 0],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  const statNumberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const gradientLineVariants = {
    animate: {
      width: ['0%', '100%', '0%'],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const infoItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      x: 8,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const formInputVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    focus: {
      scale: 1.02,
      borderColor: '#f9c349',
      boxShadow: '0 0 30px rgba(249, 195, 73, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <main className="contact-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="contact-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="contact-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="contact-header-bg">
          <div className="contact-header-bg-gradient"></div>
          <div className="contact-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="contact-floating-icons">
          {['📞', '✉️', '📍', '💬', '🤝', '✨'].map((icon, i) => (
            <motion.div
              key={i}
              className="floating-icon"
              custom={i}
              variants={floatingIconVariants}
              animate="animate"
              style={{
                position: 'absolute',
                fontSize: `${1.5 + i * 0.3}rem`,
                opacity: 0.06,
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        <div className="container">
          <motion.div
            className="contact-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="contact-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              <motion.span 
                className="contact-pre-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span>GET IN TOUCH</span>
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="contact-main-heading"
            >
              <span className="heading-light">Let's <span className="heading-highlight">Connect</span> <span className="heading-gradient">With Us</span> </span>
              
              
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="contact-header-subtitle"
            >
              Have a project in mind or want to learn more about our services? 
              We'd love to hear from you. Reach out and let's start a conversation.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            {/* Quick Stats */}
            <motion.div 
              className="contact-stats"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: '24/7', label: 'Support Available' },
                { number: '98%', label: 'Response Rate' },
                { number: '2hrs', label: 'Avg Response Time' },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  variants={statNumberVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="contact-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Contact Section ───────────────────────────────────────────────── */}
      <section className="contact-section">
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="contact-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="section-subtitle">
              We're here to help you with your digital transformation journey.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <div className="contact-grid">
            {/* Info Panel */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6 }}
            >
              <h3>Contact Information</h3>
              <p className="contact-info-desc">
                Reach out to us through any of the following channels.
              </p>

              <div className="info-items">
                {contactInfoItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="info-item"
                    custom={index}
                    variants={infoItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={defaultViewport}
                  >
                    <div className="info-icon-wrapper">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4>{item.label}</h4>
                      <p>
                        {item.key === 'address' ? (
                          settings ? (
                            <>
                              {settings.address}<br />
                              {settings.city}, {settings.state} {settings.postalCode}<br />
                              {settings.country}
                            </>
                          ) : 'New York, USA'
                        ) : item.key === 'phone' ? (
                          settings ? settings.phone : '+1 (555) 123-4567'
                        ) : item.key === 'email' ? (
                          <a href={`mailto:${settings ? settings.email : 'info@syncdeft.com'}`}>
                            {settings ? settings.email : 'info@syncdeft.com'}
                          </a>
                        ) : (
                          'Mon–Fri: 9:00 AM – 6:00 PM'
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Panel */}
            <motion.div
              ref={formRef}
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    className="success-message"
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="success-icon-ring">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    <div className="success-redirect">
                      <span>Redirecting to home...</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3>Send a Message</h3>
                    <p className="form-subtitle">Fill out the form and our team will respond promptly.</p>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <i className="fas fa-exclamation-circle"></i> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="form-row">
                      <motion.div 
                        className="form-group"
                        custom={0}
                        variants={formInputVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label htmlFor="name">Full Name *</label>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          whileFocus="focus"
                        />
                      </motion.div>
                      <motion.div 
                        className="form-group"
                        custom={1}
                        variants={formInputVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label htmlFor="email">Email Address *</label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          whileFocus="focus"
                        />
                      </motion.div>
                    </div>

                    <div className="form-row">
                      <motion.div 
                        className="form-group"
                        custom={2}
                        variants={formInputVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label htmlFor="phone">Phone Number</label>
                        <motion.input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          whileFocus="focus"
                        />
                      </motion.div>
                      <motion.div 
                        className="form-group"
                        custom={3}
                        variants={formInputVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label htmlFor="subject">Subject *</label>
                        <motion.input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Project Inquiry"
                          whileFocus="focus"
                        />
                      </motion.div>
                    </div>

                    <motion.div 
                      className="form-group"
                      custom={4}
                      variants={formInputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label htmlFor="message">Message *</label>
                      <motion.textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project or inquiry..."
                        whileFocus="focus"
                      />
                    </motion.div>

                    <motion.button 
                      type="submit" 
                      className="contact-submit-btn"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <div className="form-footer">
                      <p>
                        <i className="fas fa-lock"></i>
                        Your information is secure with us
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Office Map ──────────────────────────────────────────────── */}
          <motion.div
            ref={mapRef}
            className="contact-map-section"
            variants={mapVariants}
            initial="hidden"
            animate={isMapInView ? "visible" : "hidden"}
          >
            <div className="contact-map-header">
              <span className="contact-map-label">Our Location</span>
              <h2>Visit Our Office</h2>
            </div>
            <motion.div 
              className="map-container"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <iframe
                title="Office Map"
                src={getMapSrc()}
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;