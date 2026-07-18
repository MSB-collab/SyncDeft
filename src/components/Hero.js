// Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';
import Sync from "../assets/sync.png"

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8, rotateX: -15 },
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

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10, y: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1],
        type: 'spring',
        stiffness: 250,
        damping: 18
      }
    }
  };

  const descVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.92, rotateX: -3 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], 
        delay: 0.3,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    }
  };

  const ctasVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], 
        delay: 0.4,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    }
  };

  const trustContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.5
      }
    }
  };

  const trustItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.85, rotateX: -8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        type: 'spring',
        stiffness: 180,
        damping: 16
      }
    }
  };

  return (
    <section className="hero-section-premium">
      {/* Background gradients */}
      <div className="hero-digital-grid"></div>
      <div className="hero-radial-spotlight"></div>
      <div className="hero-particles">
        <div className="hero-particle gold-blur-1"></div>
        <div className="hero-particle gold-blur-2"></div>
        <div className="hero-particle gold-blur-3"></div>
        <div className="hero-particle gold-blur-4"></div>
        <div className="hero-particle gold-blur-5"></div>
        <div className="hero-particle gold-blur-6"></div>
      </div>

      {/* Half White Background Overlay */}
      <div className="hero-half-white-bg"></div>

      {/* Hero Entrance Overlay */}
      <motion.div 
        className="hero-entrance-overlay"
        initial={{ opacity: 1, scale: 1.3 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="container">
        <div className="hero-grid">
          {/* Left Column - Text Content */}
          <div className="hero-left-col">
            

            <motion.div 
              className="hero-headline-wrapper"
              variants={headingContainerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <h1 className="hero-title-premium">
                <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>We Engineer</motion.span>{' '}
                <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>Your Infrastructure.</motion.span>{' '}
                <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>We Automate</motion.span>{' '}
                <motion.span style={{ display: 'inline-block' }} variants={wordVariants}>Your Scale.</motion.span>
              </h1>
            </motion.div>

            <motion.p 
              className="hero-subheading-premium"
              variants={descVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              Merging 10 years of market-validated creative execution with production-grade AI engineering, workflow automation, and custom SaaS development to systematically slash your company's overhead and capture global market share.
            </motion.p>

            <motion.div 
              className="hero-ctas-premium"
              variants={ctasVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.button 
                className="hero-btn-primary" 
                onClick={() => navigate('/contact')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 50px rgba(229, 182, 62, 0.5)',
                  y: -2
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
                  backgroundImage: 'linear-gradient(135deg, #E5B63E, #f0c84a, #d4a832, #E5B63E)'
                }}
              >
                Initialize System Audit <span className="cta-arrow">&rarr;</span>
              </motion.button>
              <motion.button 
                className="hero-btn-secondary" 
                onClick={() => navigate('/projects')}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(229, 182, 62, 0.5)',
                  boxShadow: '0 15px 40px rgba(229, 182, 62, 0.1)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                Request Architecture Brief
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-trust-indicators"
              variants={trustContainerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <motion.div className="trust-indicator-item" variants={trustItemVariants}>
                <motion.i 
                  className="fa-solid fa-circle-check"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                />
                10+ Years Validated
              </motion.div>
              <motion.div className="trust-indicator-item" variants={trustItemVariants}>
                <motion.i 
                  className="fa-solid fa-circle-check"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                />
                Production-Grade AI
              </motion.div>
              <motion.div className="trust-indicator-item" variants={trustItemVariants}>
                <motion.i 
                  className="fa-solid fa-circle-check"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                />
                Global Market Reach
              </motion.div>
              <motion.div className="trust-indicator-item" variants={trustItemVariants}>
                <motion.i 
                  className="fa-solid fa-circle-check"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                />
                Workflow Automation
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Logo Image with Enhanced Animations */}
          <motion.div 
            className="hero-right-col"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
          >
            <div className="hero-logo-container">
              {/* Rotating Border Animation */}
              <div className="hero-logo-rotating-border"></div>
              
              {/* Multiple Glow Layers */}
              <div className="hero-logo-glow-primary"></div>
              <div className="hero-logo-glow-secondary"></div>
              
              <motion.img 
                src={Sync} 
                alt="Sync Logo" 
                className="hero-logo-image"
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  filter: 'drop-shadow(0 0 60px rgba(229, 182, 62, 0.4))',
                  transition: {
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15
                  }
                }}
              />
              
              {/* Particle Rings */}
              <div className="hero-logo-particles">
                <div className="particle-ring ring-1"></div>
                <div className="particle-ring ring-2"></div>
                <div className="particle-ring ring-3"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;