// TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonGrid } from './SkeletonLoader';
import { getTestimonialImageUrl } from '../utils/imageUtils';
import './TestimonialsSection.css';

const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="24" fill="%2394a3b8">User</text></svg>`;
const DEFAULT_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="%23111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="%2394a3b8">Logo</text></svg>`;

const TestimonialsSection = ({ loading, testimonials }) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  useEffect(() => {
    if (testimonials.length === 0 || isTestimonialHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials, isTestimonialHovered]);

  // Animation variants for section header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  // Animation variants for card entrance
  const cardVariants = {
    initial: { 
      opacity: 0, 
      x: 80, 
      scale: 0.9, 
      filter: 'blur(10px)'
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
        duration: 0.7
      }
    },
    exit: {
      opacity: 0,
      x: -80,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5
      }
    }
  };

  // Animation variants for dots
  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    })
  };

  if (loading) {
    return (
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-center">What Our Clients Say</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle text-center">
              Hear from industry leaders about their experience partnering with TDC.USA.
            </p>
          </div>
          <SkeletonGrid type="testimonial" count={1} />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-section">
      {/* Sophisticated Background Effects */}
      <div className="testimonials-bg-container">
        <div className="testimonials-half-white-bg"></div>
        <div className="testimonials-digital-grid"></div>
        <div className="testimonials-radial-spotlight"></div>
        <div className="testimonials-particles">
          <div className="testimonials-particle gold-blur-1"></div>
          <div className="testimonials-particle gold-blur-2"></div>
          <div className="testimonials-particle gold-blur-3"></div>
          <div className="testimonials-particle gold-blur-4"></div>
          <div className="testimonials-particle gold-blur-5"></div>
          <div className="testimonials-particle gold-blur-6"></div>
        </div>
        <div className="testimonials-gradient-overlay"></div>
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
         

          <motion.h2 
            className="main-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              type: 'spring',
              stiffness: 80,
              damping: 15
            }}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '120px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 120 }}
          />
          
          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hear from industry leaders about their experience partnering with <strong>TDC.USA</strong>.
          </motion.p>
        </motion.div>

        <div
          className="testimonials-carousel-wrapper"
          onMouseEnter={() => setIsTestimonialHovered(true)}
          onMouseLeave={() => setIsTestimonialHovered(false)}
        >
          <div className="carousel-inner-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIdx}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="testimonial-card"
              >
                {/* Card Glow Effect */}
                <div className="testimonial-card-glow"></div>
                <div className="testimonial-card-border"></div>

                {/* Quote Icon */}
                <div className="quote-icon-wrapper">
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4zm-8 4h-4v4h4v-4zm8 0h-4v4h4v-4z"/>
                  </svg>
                </div>

                {/* Avatar with Ring */}
                <div className="testimonial-avatar-wrapper">
                  <div className="avatar-ring"></div>
                  <div className="avatar-ring-2"></div>
                  <img
                    src={getTestimonialImageUrl(testimonials[activeTestimonialIdx].profileImage)}
                    alt={testimonials[activeTestimonialIdx].clientName}
                    className="client-avatar"
                    onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                  />
                  <div className="avatar-status online"></div>
                </div>

                {/* Rating Stars */}
                <div className="rating-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.i
                      key={i}
                      className={`fas fa-star ${i < testimonials[activeTestimonialIdx].rating ? 'active' : 'inactive'}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: i < testimonials[activeTestimonialIdx].rating ? 1 : 0.1,
                        scale: i < testimonials[activeTestimonialIdx].rating ? 1 : 0.8
                      }}
                      transition={{ 
                        delay: 0.2 + (i * 0.08),
                        type: 'spring',
                        stiffness: 200,
                        damping: 15
                      }}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <motion.p 
                  className="testimonial-review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {testimonials[activeTestimonialIdx].review}
                </motion.p>

                {/* Client Meta */}
                <div className="testimonial-client-meta">
                  <div className="client-info">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {testimonials[activeTestimonialIdx].clientName}
                    </motion.h4>
                    
                    <motion.p 
                      className="client-designation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {testimonials[activeTestimonialIdx].designation}
                    </motion.p>
                  </div>
                  
                  <div className="client-company-row">
                    <motion.span 
                      className="company-name"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {testimonials[activeTestimonialIdx].companyName || testimonials[activeTestimonialIdx].company}
                    </motion.span>
                    
                    {testimonials[activeTestimonialIdx].companyLogo && (
                      <motion.img
                        src={getTestimonialImageUrl(testimonials[activeTestimonialIdx].companyLogo, true)}
                        alt={testimonials[activeTestimonialIdx].companyName || testimonials[activeTestimonialIdx].company}
                        className="company-logo-img"
                        onError={(e) => { e.target.src = DEFAULT_LOGO; }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                      />
                    )}
                  </div>
                </div>

                {/* Card Number Badge */}
                <div className="card-number-badge">
                  {String(activeTestimonialIdx + 1).padStart(2, '0')}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              className="carousel-nav-btn prev-btn"
              onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous Testimonial"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 8px 40px rgba(229, 182, 62, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>

            <motion.button
              className="carousel-nav-btn next-btn"
              onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
              aria-label="Next Testimonial"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 8px 40px rgba(229, 182, 62, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>

            {/* Dots Navigation */}
            <div className="carousel-dots">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`carousel-dot ${idx === activeTestimonialIdx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonialIdx(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  variants={dotVariants}
                  initial="initial"
                  animate="animate"
                  custom={idx}
                  whileHover={{ 
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default TestimonialsSection;