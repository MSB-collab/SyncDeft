// TrustedBySection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './TrustedBySection.css';

// Automatically import all logos from the assets folder using require.context
const importAllLogos = () => {
  try {
    const context = require.context('../assets/logos', false, /\.(png|jpe?g|svg|webp)$/);
    return context.keys().map(context);
  } catch (error) {
    console.error('Error importing logos dynamically:', error);
    return [];
  }
};

const TrustedBySection = () => {
  const logos = importAllLogos();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  
  if (logos.length === 0) return null;

  // Split logos into two rows
  const midPoint = Math.ceil(logos.length / 2);
  const row1Logos = logos.slice(0, midPoint);
  const row2Logos = logos.slice(midPoint);

  // Repeat logo arrays for seamless infinite scrolling
  const row1Items = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
  const row2Items = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

  // Get logo name from URL
  const getLogoName = (url) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
  };

  // Get clean company name for display
  const getCompanyName = (url) => {
    const name = getLogoName(url);
    return name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <section className="trusted-by-section" ref={sectionRef}>
      {/* Premium Background Effects */}
      <div className="trusted-bg-effects">
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        <div className="bg-glow bg-glow-3"></div>
        <div className="bg-grid"></div>
        <div className="bg-noise"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, -100 - Math.random() * 200, null],
              x: [null, (Math.random() - 0.5) * 200, null],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(229, 182, 62, ${0.1 + Math.random() * 0.2}), transparent)`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* Header Section */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
         

          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Trusted By{' '}
            <span className="gradient-text">Leading Brands</span>
            <span className="title-underline"></span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join 500+ organizations that trust TDC.USA for digital transformation,
            innovative software solutions, and cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Logo Marquee Section */}
        <motion.div 
          className="logo-marquee-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Row 1 - Left to Right */}
          <div className="logo-marquee-row">
            <div className="logo-marquee-track track-left">
              {row1Items.map((logoUrl, index) => {
                const uniqueKey = `row1-${index}`;
                const isHovered = hoveredIndex === uniqueKey;
                const companyName = getCompanyName(logoUrl);
                return (
                  <motion.div 
                    key={uniqueKey} 
                    className="logo-item-wrapper"
                    onMouseEnter={() => setHoveredIndex(uniqueKey)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedLogo(logoUrl)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className={`logo-item ${isHovered ? 'hovered' : ''}`}>
                      <div className="logo-circle-bg">
                        {/* Animated Ring */}
                        <div className="logo-ring"></div>
                        
                        {/* Shine Effect */}
                        <div className="logo-shine"></div>
                        
                        {/* Gradient Border */}
                        <div className="logo-border-gradient"></div>
                        
                        {/* Logo Image */}
                        <img 
                          src={logoUrl} 
                          alt={companyName} 
                          className="partner-logo"
                          loading="lazy"
                          draggable="false"
                        />
                        
                        {/* Hover Zoom Indicator */}
                        {isHovered && (
                          <motion.div 
                            className="logo-zoom-indicator"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M15 3h6v6M14 10L21 3M9 21H3v-6M10 14L3 21" />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      {/* Tooltip - Shows on Hover */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="logo-tooltip-wrapper"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="logo-tooltip">
                              <span className="tooltip-name">{companyName}</span>
                              <span className="tooltip-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                  <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                Trusted Partner
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Premium Divider */}
          <div className="marquee-divider">
            <div className="divider-line"></div>
            <motion.div 
              className="divider-dot"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="divider-dot-inner"></div>
            </motion.div>
            <div className="divider-line"></div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="logo-marquee-row">
            <div className="logo-marquee-track track-right">
              {row2Items.map((logoUrl, index) => {
                const uniqueKey = `row2-${index}`;
                const isHovered = hoveredIndex === uniqueKey;
                const companyName = getCompanyName(logoUrl);
                return (
                  <motion.div 
                    key={uniqueKey} 
                    className="logo-item-wrapper"
                    onMouseEnter={() => setHoveredIndex(uniqueKey)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedLogo(logoUrl)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className={`logo-item ${isHovered ? 'hovered' : ''}`}>
                      <div className="logo-circle-bg">
                        <div className="logo-ring"></div>
                        <div className="logo-shine"></div>
                        <div className="logo-border-gradient"></div>
                        <img 
                          src={logoUrl} 
                          alt={companyName} 
                          className="partner-logo"
                          loading="lazy"
                          draggable="false"
                        />
                        {isHovered && (
                          <motion.div 
                            className="logo-zoom-indicator"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M15 3h6v6M14 10L21 3M9 21H3v-6M10 14L3 21" />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="logo-tooltip-wrapper"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="logo-tooltip">
                              <span className="tooltip-name">{companyName}</span>
                              <span className="tooltip-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                  <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                Trusted Partner
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        
      </div>

      {/* Logo Zoom Modal */}
      <AnimatePresence>
        {selectedLogo && (
          <motion.div 
            className="logo-zoom-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLogo(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedLogo(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              <div className="modal-logo-wrapper">
                <div className="modal-logo-circle">
                  <img src={selectedLogo} alt="Logo" className="modal-logo" />
                </div>
              </div>
              
              <div className="modal-info">
                <h3>{getCompanyName(selectedLogo)}</h3>
                <div className="modal-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Trusted Partner
                </div>
                <p>Proudly partnering with TDC.USA for innovative technology solutions.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TrustedBySection;