// src/components/ServiceCard.js
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, index, parallaxY }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Different animation variants based on card position
  const getCardVariants = () => {
    const position = index % 3; // 0: left, 1: center, 2: right
    
    switch(position) {
      case 0: // Left card - slides from left with rotation
        return {
          hidden: { 
            opacity: 0, 
            x: -120,
            rotateY: -15,
            scale: 0.85
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: index * 0.15,
              staggerChildren: 0.1
            }
          }
        };
      case 1: // Center card - zooms in with glow
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.7,
            y: 80,
            filter: 'blur(10px)'
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 80,
              damping: 18,
              delay: index * 0.15 + 0.1
            }
          }
        };
      case 2: // Right card - slides from right with rotation
        return {
          hidden: { 
            opacity: 0, 
            x: 120,
            rotateY: 15,
            scale: 0.85
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: index * 0.15 + 0.2
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: index * 0.1 }
          }
        };
    }
  };

  // Floating animation variants
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3
      }
    },
    hover: {
      y: -12,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  // Icon pulse animation
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: index * 0.15 + 0.3
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };

  // Highlight items stagger
  const highlightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2 + index * 0.1
      }
    }
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  // Glow pulse animation
  const glowVariants = {
    initial: { opacity: 0.3, scale: 1 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4 + index,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: 0.8,
      scale: 1.08,
      transition: { duration: 0.5 }
    }
  };

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / (rect.height / 8);
    const rotateY = (x - xc) / (rect.width / 8);
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
    setIsHovered(false);
  };

  const cardVariants = getCardVariants();

  const handleCardClick = () => {
    navigate(`/services/${service.slug}`);
  };

  // Get technology highlights with icons
  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return '⚛️';
    if (techLower.includes('node')) return '🚀';
    if (techLower.includes('python')) return '🐍';
    if (techLower.includes('aws')) return '☁️';
    if (techLower.includes('docker')) return '🐳';
    if (techLower.includes('vue')) return '🟢';
    if (techLower.includes('angular')) return '🔴';
    if (techLower.includes('mongodb')) return '🍃';
    if (techLower.includes('postgres')) return '🐘';
    if (techLower.includes('firebase')) return '🔥';
    if (techLower.includes('next')) return '▲';
    if (techLower.includes('typescript')) return '📘';
    return '⚡';
  };

  return (
    <motion.div
      ref={cardRef}
      className="premium-service-card"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ y: parallaxY }}
    >
      {/* Animated Background Glow */}
      <motion.div 
        className="service-card-glow"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "animate"}
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(229, 182, 62, ${isHovered ? 0.15 : 0.05}), 
            transparent 70%)`
        }}
      />

      {/* High-tech background pattern */}
      <div className="service-card-bg-graphic">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id={`circuit-grid-${service.slug}`} width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#circuit-grid-${service.slug})`} opacity="0.08" />
          <motion.path 
            d="M 0 60 L 60 60 L 90 90 L 160 90 L 180 110 L 200 110" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.8" 
            opacity="0.12"
            animate={{
              pathLength: isHovered ? 1 : 0.6,
              opacity: isHovered ? 0.25 : 0.12
            }}
            transition={{ duration: 0.8 }}
          />
          <motion.circle 
            cx="60" cy="60" r="2.5" 
            fill="currentColor" 
            opacity="0.2"
            animate={{
              r: isHovered ? 4 : 2.5,
              opacity: isHovered ? 0.5 : 0.2
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle 
            cx="90" cy="90" r="2.5" 
            fill="currentColor" 
            opacity="0.2"
            animate={{
              r: isHovered ? 4 : 2.5,
              opacity: isHovered ? 0.5 : 0.2
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.circle 
            cx="160" cy="90" r="2.5" 
            fill="currentColor" 
            opacity="0.2"
            animate={{
              r: isHovered ? 4 : 2.5,
              opacity: isHovered ? 0.5 : 0.2
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
      </div>

      {/* Card floating animation */}
      <motion.div 
        className="service-card-content"
        variants={floatVariants}
        initial="initial"
        animate={isHovered ? "hover" : "animate"}
      >
        <div className="service-card-top">
          <motion.div 
            className="service-card-icon"
            variants={iconVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
          >
            <i className={service.icon || 'fas fa-cog'}></i>
          </motion.div>
          
          {/* Number badge */}
          <motion.div 
            className="service-number-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: 0.15, 
              scale: 1,
              transition: { delay: index * 0.1 + 0.2, duration: 0.5 }
            } : {}}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </div>

        <motion.h3 
          className="service-card-title"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.1 + 0.15 }
          } : {}}
        >
          {service.title}
        </motion.h3>

        <motion.p 
          className="service-card-desc"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.1 + 0.25 }
          } : {}}
        >
          {service.description}
        </motion.p>

        {/* Tech highlights with stagger animation */}
        {service.technologies && service.technologies.length > 0 && (
          <motion.div 
            className="service-card-highlights"
            variants={highlightContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {service.technologies.slice(0, 3).map((tech, i) => (
              <motion.div 
                key={i} 
                className="highlight-tag"
                variants={highlightItemVariants}
                whileHover={{ 
                  x: 8,
                  transition: { type: 'spring', stiffness: 200 }
                }}
              >
                <span className="highlight-icon">{getTechIcon(tech)}</span>
                <span className="highlight-text">{tech}</span>
                <motion.span 
                  className="highlight-pulse"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          className="service-card-footer"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.1 + 0.4 }
          } : {}}
        >
          <motion.span 
            className="service-learn-more"
            whileHover={{ gap: '0.75rem' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Learn More
            <motion.span 
              className="learn-more-arrow"
              animate={isHovered ? { x: 8 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              →
            </motion.span>
          </motion.span>
          
          {/* Animated line */}
          <motion.div 
            className="learn-more-line"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorative elements */}
      <motion.div 
        className="corner-decoration top-right"
        animate={{
          rotate: isHovered ? 45 : 0,
          opacity: isHovered ? 0.3 : 0.1
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div 
        className="corner-decoration bottom-left"
        animate={{
          rotate: isHovered ? -45 : 0,
          opacity: isHovered ? 0.3 : 0.1
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default ServiceCard;