// ServicesPreview.jsx - Clean Version with Hero-like Background
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import ServiceCard from './ServiceCard';
import './styles/ServicesPreview.css';

const ServicesPreview = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.1 });
  
  const featuredSlugs = ['saas-product-development', 'custom-software-development', 'ai-engineered-marketing', ];
  const featuredServices = featuredSlugs
    .map(slug => servicesData.find(s => s.slug === slug))
    .filter(Boolean);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.92,
      rotateX: -8,
      filter: 'blur(8px)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        type: 'spring',
        stiffness: 120,
        damping: 15,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      scale: 1.03,
      y: -8,
      rotateX: 1,
      boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(229,182,62,0.06)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        type: 'spring', 
        stiffness: 150, 
        damping: 15,
        duration: 0.5
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.25,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 120
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      rotate: -12,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 12,
        delay: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.92,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4,
        duration: 0.7,
        type: 'spring',
        stiffness: 150
      }
    }
  };

  

  return (
    <motion.section 
      ref={sectionRef}
      className="services-preview"
    >
      {/* ===== HERO-LIKE BACKGROUND (CLEAN) ===== */}
      <div className="services-bg-container">
        {/* Digital Grid - matching Hero */}
        <div className="services-digital-grid"></div>
        
        {/* Radial Spotlight - matching Hero */}
        <div className="services-radial-spotlight"></div>
        
        {/* Gold Particles - matching Hero */}
        <div className="services-particles">
          <div className="services-particle gold-blur-1"></div>
          <div className="services-particle gold-blur-2"></div>
          <div className="services-particle gold-blur-3"></div>
          <div className="services-particle gold-blur-4"></div>
          <div className="services-particle gold-blur-5"></div>
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="services-gradient-overlay"></div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container">
        <motion.div
          ref={headingRef}
          className="services-header"
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
        >
        
          
          {/* Animated Title with Word Stagger */}
          <motion.h2 
            className="section-title"
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
          >
            
            
            <motion.span
              variants={wordVariants}
              style={{ display: 'inline-block' }}
            >
              <span className="highlight">The Core Systems</span>
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            variants={subtitleVariants}
          >
            Comprehensive technology and digital solutions tailored to your business needs.
          </motion.p>
        </motion.div>
        
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.slug}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="service-card-wrapper"
            >
              <ServiceCard
                service={service}
                index={index}
              />
              <motion.div 
                className="card-decorative-line"
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center section-action"
          variants={buttonVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/services')}
            whileHover={{ 
              scale: 1.05,
              y: -3,
              boxShadow: '0 15px 50px rgba(229, 182, 62, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Services</span>
            <motion.span 
              className="btn-arrow"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesPreview;