// CTASection.jsx - Modern Edition Matching Proof Screen
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './CTASection.css';

const CTASection = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.92,
      y: 40,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 35,
      scale: 0.95,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0,
      y: 25,
      scale: 0.96,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        type: 'spring',
        stiffness: 150
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      rotate: -12,
      filter: 'blur(5px)'
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

  const trustItemVariants = {
    hidden: { 
      opacity: 0,
      y: 25,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.6 + i * 0.12,
        duration: 0.5,
        type: 'spring',
        stiffness: 120
      }
    })
  };

  const section3DTransform = {
    rotateX: mousePosition.y * 1.2,
    rotateY: mousePosition.x * 1.2,
    perspective: 1200
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="cta-section"
      style={section3DTransform}
      variants={containerVariants}
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
    >
      {/* ===== SOPHISTICATED HALF-WHITE BACKGROUND ===== */}
      <div className="cta-bg-container">
        {/* Half White Background */}
        <div className="cta-half-white-bg"></div>
        
        {/* Golden Gradient Orbs */}
        <div className="cta-orbs-wrapper">
          <motion.div 
            className="cta-orb orb-1"
            style={{ y: y1, opacity: opacity1 }}
          />
          <motion.div 
            className="cta-orb orb-2"
            style={{ y: y2, opacity: opacity1 }}
          />
          <motion.div 
            className="cta-orb orb-3"
            style={{ y: y1, opacity: opacity1 }}
          />
          <motion.div 
            className="cta-orb orb-4"
            style={{ y: y2, opacity: opacity1 }}
          />
        </div>

        {/* Subtle Grid Overlay */}
        <div className="cta-grid-overlay"></div>

        {/* Floating Gold Shapes */}
        <div className="cta-shapes">
          <div className="cta-shape shape-1"></div>
          <div className="cta-shape shape-2"></div>
          <div className="cta-shape shape-3"></div>
          <div className="cta-shape shape-4"></div>
          <div className="cta-shape shape-5"></div>
          <div className="cta-shape shape-6"></div>
        </div>

        {/* Light Particles */}
        <div className="cta-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="cta-particle"
              animate={{
                y: [0, -30 - Math.random() * 40, 0],
                x: [0, (Math.random() - 0.5) * 50, 0],
                opacity: [0.04, 0.12, 0.04],
                scale: [0.5, 1.2, 0.5],
                transition: {
                  duration: 12 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }
              }}
              style={{
                position: 'absolute',
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(229, 182, 62, ${0.05 + Math.random() * 0.1}), transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="cta-gradient-overlay"></div>
      </div>

      <div className="container">
        <motion.div
          ref={contentRef}
          className="cta-content-wrapper"
          variants={contentVariants}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          whileHover={{
            scale: 1.005,
            y: -2,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20
            }
          }}
        >
          {/* Content Glow */}
          <div className="content-glow"></div>

         

          {/* Title */}
          <motion.h2 
            className="cta-title"
            variants={titleVariants}
          >
            Ready to <span className="highlight">Transform</span> Your Business?
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="cta-subtitle"
            variants={subtitleVariants}
          >
            Let's discuss how Sync Deft can help you achieve your digital transformation goals and drive innovation at scale.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="cta-button-wrapper"
            variants={buttonVariants}
          >
            <motion.button
              className="cta-btn-primary"
              onClick={() => navigate('/contact')}
              whileHover={{ 
                scale: 1.04,
                y: -3,
                boxShadow: '0 15px 50px rgba(229, 182, 62, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-text">Start Your Journey</span>
              <motion.span 
                className="btn-arrow"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <span className="btn-shine"></span>
            </motion.button>

            <motion.button
              className="cta-btn-secondary"
              onClick={() => navigate('/services')}
              whileHover={{ 
                scale: 1.04,
                y: -3,
                borderColor: 'rgba(229, 182, 62, 0.4)',
                backgroundColor: 'rgba(229, 182, 62, 0.04)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Services</span>
              <motion.span 
                className="btn-secondary-arrow"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div className="cta-trust-indicators">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '10+', label: 'Years Experience' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="trust-item"
                custom={i}
                variants={trustItemVariants}
                initial="hidden"
                animate={isContentInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -4,
                  transition: { type: 'spring', stiffness: 400 }
                }}
              >
                <motion.span 
                  className="trust-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.12, type: 'spring' }}
                >
                  {item.number}
                </motion.span>
                <span className="trust-label">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Wave */}
          <motion.div 
            className="cta-wave"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;