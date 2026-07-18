// Footer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const brandVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const newsletterVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const floatingParticleVariants = {
    animate: (i) => ({
      y: [0, -20 - Math.random() * 30, 0],
      x: [0, (Math.random() - 0.5) * 40, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [0.5, 1.2, 0.5],
      transition: {
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    setTimeout(() => {
      setStatus('success');
      setMessage('🎉 Subscribed successfully!');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceLinks = [
    { name: 'Custom Software', path: '/services/custom-software' },
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
    { name: 'AI Solutions', path: '/services/ai-solutions' },
    { name: 'UI/UX Design', path: '/services/ui-ux-design' }
  ];

  const socialLinks = [
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: '#0077b5' },
    { icon: 'fab fa-twitter', label: 'Twitter', color: '#1da1f2' },
    { icon: 'fab fa-facebook-f', label: 'Facebook', color: '#1877f2' },
    { icon: 'fab fa-youtube', label: 'YouTube', color: '#ff0000' },
    { icon: 'fab fa-instagram', label: 'Instagram', color: '#e4405f' }
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="footer"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Animated Background Orbs */}
      <div className="footer-bg-orbs">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="footer-orb"
            custom={i}
            variants={floatingParticleVariants}
            animate="animate"
            style={{
              position: 'absolute',
              width: 150 + Math.random() * 250,
              height: 150 + Math.random() * 250,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(229, 182, 62, ${0.02 + Math.random() * 0.04}), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="footer-particles">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="footer-particle"
            custom={i}
            variants={floatingParticleVariants}
            animate="animate"
            style={{
              position: 'absolute',
              width: 2 + Math.random() * 5,
              height: 2 + Math.random() * 5,
              borderRadius: '50%',
              background: `rgba(229, 182, 62, ${0.1 + Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand Column with Text Logo */}
          <motion.div 
            className="footer-section brand-column"
            variants={brandVariants}
          >
            <motion.div 
              className="footer-logo-wrapper"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="footer-logo"
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="text-logo">
                  <span className="logo-sync">SYNC</span>
                  <span className="logo-deft">DEFT</span>
                </div>
              </motion.div>
              <motion.div 
                className="logo-glow"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="logo-shine"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Technology & Digital Consulting company transforming businesses
              through innovative solutions and strategic insights.
            </motion.p>
            
            <motion.div 
              className="footer-contacts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: 'fas fa-map-marker-alt', text: 'New York, USA' },
                { icon: 'fas fa-phone', text: '+1 (555) 123-4567' },
                { icon: 'fas fa-envelope', text: 'info@syncdeft.com' }
              ].map((item, index) => (
                <motion.p 
                  key={index}
                  className="contact-item"
                  whileHover={{ 
                    x: 8,
                    color: '#ffffff',
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <motion.i 
                    className={item.icon}
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 10,
                      transition: { type: 'spring', stiffness: 400 }
                    }}
                  />
                  {item.text}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-section"
            variants={sectionVariants}
          >
            <motion.h4
              whileHover={{ 
                color: '#E5B63E',
                transition: { duration: 0.3 }
              }}
            >
              Quick Links
              <motion.span 
                className="section-underline"
                initial={{ width: 0 }}
                animate={{ width: 30 }}
                transition={{ delay: 0.5 }}
              />
            </motion.h4>
            <ul>
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link to={link.path}>
                    <motion.span
                      className="link-text"
                      animate={{
                        color: hoveredLink === link.name ? '#E5B63E' : '#94a3b8',
                        x: hoveredLink === link.name ? 8 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {link.name}
                    </motion.span>
                    {hoveredLink === link.name && (
                      <motion.span 
                        className="link-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        ●
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div 
            className="footer-section"
            variants={sectionVariants}
          >
            <motion.h4
              whileHover={{ 
                color: '#E5B63E',
                transition: { duration: 0.3 }
              }}
            >
              Our Services
              <motion.span 
                className="section-underline"
                initial={{ width: 0 }}
                animate={{ width: 30 }}
                transition={{ delay: 0.6 }}
              />
            </motion.h4>
            <ul>
              {serviceLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link to={link.path}>
                    <motion.span
                      className="link-text"
                      animate={{
                        color: hoveredLink === link.name ? '#E5B63E' : '#94a3b8',
                        x: hoveredLink === link.name ? 8 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {link.name}
                    </motion.span>
                    {hoveredLink === link.name && (
                      <motion.span 
                        className="link-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        ●
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div 
            className="footer-section newsletter-section"
            variants={newsletterVariants}
          >
            <motion.h4
              whileHover={{ 
                color: '#E5B63E',
                transition: { duration: 0.3 }
              }}
            >
              Stay Connected
              <motion.span 
                className="section-underline"
                initial={{ width: 0 }}
                animate={{ width: 30 }}
                transition={{ delay: 0.7 }}
              />
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Subscribe to our newsletter for insights and technology updates.
            </motion.p>
            <motion.form 
              className="newsletter-form" 
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="newsletter-input-wrapper"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={status === 'loading'}
                />
                <motion.div 
                  className="input-focus-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: email ? 1 : 0 }}
                />
              </motion.div>
              <motion.button 
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 30px rgba(229, 182, 62, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                  backgroundImage: 'linear-gradient(135deg, #E5B63E, #f0c84a, #E5B63E)'
                }}
              >
                {status === 'loading' ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <i className="fas fa-spinner"></i>
                  </motion.span>
                ) : (
                  <span>Subscribe <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >→</motion.span></span>
                )}
              </motion.button>
            </motion.form>
            
            <AnimatePresence>
              {message && (
                <motion.div 
                  className={`newsletter-status ${status}`}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  variants={socialVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ 
                    y: -8,
                    scale: 1.2,
                    backgroundColor: social.color,
                    borderColor: social.color,
                    color: '#ffffff',
                    boxShadow: `0 8px 30px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <i className={social.icon}></i>
                  {hoveredSocial === social.label && (
                    <motion.span 
                      className="social-tooltip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      {social.label}
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          variants={bottomVariants}
        >
          <div className="footer-bottom-content">
            <motion.p
              whileHover={{ color: '#E5B63E' }}
              transition={{ duration: 0.3 }}
            >
              &copy; {new Date().getFullYear()} SYNC DEFT. All rights reserved.
            </motion.p>

            <motion.div className="footer-bottom-links">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text, index) => (
                <motion.span
                  key={text}
                  whileHover={{ color: '#E5B63E', y: -2 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;