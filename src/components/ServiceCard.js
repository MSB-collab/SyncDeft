// src/components/ServiceCard.js
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, index, parallaxY }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // ===== BIG MODERN ANIMATIONS =====
  const getCardVariants = () => {
    const position = index % 3;
    switch(position) {
      case 0:
        return {
          hidden: { opacity: 0, x: -150, rotateY: -20, scale: 0.8 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 90,
              damping: 22,
              delay: index * 0.12,
            }
          }
        };
      case 1:
        return {
          hidden: { opacity: 0, scale: 0.6, y: 100, filter: 'blur(12px)' },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 70,
              damping: 18,
              delay: index * 0.12 + 0.1
            }
          }
        };
      case 2:
        return {
          hidden: { opacity: 0, x: 150, rotateY: 20, scale: 0.8 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 90,
              damping: 22,
              delay: index * 0.12 + 0.2
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.1 } }
        };
    }
  };

  // ===== FLOATING (bigger & smoother) =====
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4 + index * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.25
      }
    },
    hover: {
      y: -18,
      transition: { type: 'spring', stiffness: 250, damping: 18 }
    }
  };

  // ===== ICON (big & bold) =====
  const iconVariants = {
    hidden: { scale: 0, rotate: -200 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 14,
        delay: index * 0.12 + 0.25
      }
    },
    hover: {
      scale: 1.25,
      rotate: 12,
      transition: { type: 'spring', stiffness: 280, damping: 10 }
    }
  };

  // ===== HIGHLIGHTS STAGGER =====
  const highlightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25 + index * 0.1
      }
    }
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 140, damping: 14 }
    }
  };

  // ===== GLOW (big & dramatic) =====
  const glowVariants = {
    initial: { opacity: 0.2, scale: 0.9 },
    animate: {
      opacity: [0.2, 0.7, 0.2],
      scale: [0.9, 1.1, 0.9],
      transition: {
        duration: 5 + index,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 0.6 }
    }
  };

  // ===== 3D TILT =====
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / (rect.height / 6);
    const rotateY = (x - xc) / (rect.width / 6);
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    }
    setIsHovered(false);
  };

  const handleCardClick = () => {
    navigate(`/services/${service.slug}`);
  };

  // ===== TECH ICONS =====
  const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('react')) return '⚛️';
    if (t.includes('node')) return '🚀';
    if (t.includes('python')) return '🐍';
    if (t.includes('aws')) return '☁️';
    if (t.includes('docker')) return '🐳';
    if (t.includes('vue')) return '🟢';
    if (t.includes('angular')) return '🔴';
    if (t.includes('mongodb')) return '🍃';
    if (t.includes('postgres')) return '🐘';
    if (t.includes('firebase')) return '🔥';
    if (t.includes('next')) return '▲';
    if (t.includes('typescript')) return '📘';
    return '⚡';
  };

  const cardVariants = getCardVariants();

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
      {/* ===== GLOW ===== */}
      <motion.div
        className="service-card-glow"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "animate"}
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(255, 215, 80, ${isHovered ? 0.25 : 0.08}), 
            transparent 70%)`
        }}
      />

      {/* ===== BG GRAPHIC (circuit) ===== */}
      <div className="service-card-bg-graphic">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none">
          <defs>
            <pattern id={`circuit-${service.slug}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#circuit-${service.slug})`} opacity="0.06" />
          <motion.path
            d="M 0 50 L 50 50 L 80 80 L 150 80 L 170 100 L 200 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.1"
            animate={{
              pathLength: isHovered ? 1 : 0.5,
              opacity: isHovered ? 0.3 : 0.1
            }}
            transition={{ duration: 0.9 }}
          />
          <motion.circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.15" animate={{ r: isHovered ? 6 : 4, opacity: isHovered ? 0.4 : 0.15 }} />
          <motion.circle cx="80" cy="80" r="4" fill="currentColor" opacity="0.15" animate={{ r: isHovered ? 6 : 4, opacity: isHovered ? 0.4 : 0.15 }} />
          <motion.circle cx="150" cy="80" r="4" fill="currentColor" opacity="0.15" animate={{ r: isHovered ? 6 : 4, opacity: isHovered ? 0.4 : 0.15 }} />
        </svg>
      </div>

      {/* ===== CONTENT ===== */}
      <motion.div
        className="service-card-content"
        variants={floatVariants}
        initial="initial"
        animate={isHovered ? "hover" : "animate"}
      >
        {/* TOP: ICON + NUMBER */}
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
          <motion.div
            className="service-number-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.12, scale: 1, transition: { delay: index * 0.1 + 0.2, duration: 0.6 } } : {}}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </div>

        {/* TITLE */}
        <motion.h3
          className="service-card-title"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.15 } } : {}}
        >
          {service.title}
        </motion.h3>

        {/* DESCRIPTION */}
        <motion.p
          className="service-card-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.25 } } : {}}
        >
          {service.description}
        </motion.p>

        {/* TECH HIGHLIGHTS */}
        {service.technologies && service.technologies.length > 0 && (
          <motion.div
            className="service-card-highlights"
            variants={highlightContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {service.technologies.slice(0, 3).map((tech, i) => (
              <motion.div key={i} className="highlight-tag" variants={highlightItemVariants}>
                <span className="highlight-icon">{getTechIcon(tech)}</span>
                <span className="highlight-text">{tech}</span>
                <motion.span
                  className="highlight-pulse"
                  animate={{ opacity: [0, 1, 0], scale: [1, 1.6, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FOOTER */}
        <motion.div
          className="service-card-footer"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.4 } } : {}}
        >
          <motion.span
            className="service-learn-more"
            whileHover={{ gap: '1rem' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Learn More
            <motion.span
              className="learn-more-arrow"
              animate={isHovered ? { x: 10 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              →
            </motion.span>
          </motion.span>
          <motion.div
            className="learn-more-line"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* CORNER DECORATIONS */}
      <motion.div
        className="corner-decoration top-right"
        animate={{ rotate: isHovered ? 45 : 0, opacity: isHovered ? 0.35 : 0.08 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="corner-decoration bottom-left"
        animate={{ rotate: isHovered ? -45 : 0, opacity: isHovered ? 0.35 : 0.08 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default ServiceCard;