// Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Services.css';

const Services = () => {
  const services = servicesData;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeService, setActiveService] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

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

  return (
    <main className="services-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="services-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="services-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="services-header-bg">
          <div className="services-header-bg-gradient"></div>
          <div className="services-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="services-floating-icons">
          {['⚡', '🚀', '💡', '🎯', '🌟', '✨'].map((icon, i) => (
            <motion.div
              key={i}
              className="floating-icon"
              custom={i}
              variants={floatingIconVariants}
              animate="animate"
              style={{
                position: 'absolute',
                fontSize: `${1.5 + i * 0.3}rem`,
                opacity: 0.08,
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
            className="services-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="services-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              <motion.span 
                className="services-pre-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                
                <span>OUR SERVICES</span>
                
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="services-main-heading"
            >
              <span className="heading-light">Transform Your <span className="heading-highlight">Business With</span></span>
              
              <span className="heading-gradient">Expert Solutions</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="services-header-subtitle"
            >
              We deliver cutting-edge technology and digital consulting services 
              that drive innovation, growth, and lasting success for your business.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

           
           

            {/* CTA Buttons */}
            <motion.div 
              className="services-cta-group"
              variants={fadeUpVariants}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Work
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M10 8l6 4-6 4V8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="services-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section className="services-list">
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="services-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Comprehensive <span className="text-gradient">Solutions</span>
            </h2>
            <p className="section-subtitle">
              Discover our full range of services designed to meet your unique 
              business needs and drive measurable results.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <motion.div
            className="services-grid-responsive"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;