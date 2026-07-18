// Proof.jsx - Professional Edition with Modern Layout
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Proof.css';
import { FaRocket, FaShieldAlt, FaGlobe, FaAward, FaCode, FaUsers } from 'react-icons/fa';
import { MdOutlineAnalytics, MdOutlineAutoAwesome } from 'react-icons/md';
import { BsGraphUp, BsLightningCharge } from 'react-icons/bs';
import CTASection from './CTASection';

const Proof = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      animateCounters();
    }
  }, [isInView]);

  const animateCounters = () => {
    counterRefs.current.forEach((ref, index) => {
      if (ref) {
        const target = parseInt(ref.dataset.target);
        const duration = 2000;
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          ref.textContent = current + (index === 0 ? '+' : '');
        }, 30);
      }
    });
  };

  const stats = [
    {
      icon: <FaRocket />,
      value: 10,
      label: 'Years of Excellence',
      suffix: '+',
      description: 'Market-Validated Creative & Marketing Execution',
      color: '#E5B63E'
    },
    {
      icon: <FaShieldAlt />,
      value: 50,
      label: 'Projects Deployed',
      suffix: '+',
      description: 'Regional Software, App, & Automation Systems',
      color: '#f0c84a'
    },
    {
      icon: <FaGlobe />,
      value: 25,
      label: 'Global Markets',
      suffix: '+',
      description: 'Enterprise-Grade Efficiency & Scaling Infrastructures',
      color: '#d4a832'
    }
  ];

  const features = [
    {
      icon: <MdOutlineAnalytics />,
      title: 'Data-Driven Strategy',
      description: 'Consumer psychology meets AI-powered analytics for maximum impact'
    },
    {
      icon: <BsLightningCharge />,
      title: 'Rapid Automation',
      description: 'Custom software solutions that streamline operations and scale'
    },
    {
      icon: <FaUsers />,
      title: 'Expert Execution Squad',
      description: 'Battle-tested team bridging marketing and technology'
    },
    {
      icon: <MdOutlineAutoAwesome />,
      title: 'AI-Ready Infrastructure',
      description: 'Future-proof systems designed for the AI era'
    },
    {
      icon: <BsGraphUp />,
      title: 'Proven Growth',
      description: '10+ years of measurable success across industries'
    },
    {
      icon: <FaAward />,
      title: 'Award-Winning Solutions',
      description: 'Recognized for innovation and marketing excellence'
    }
  ];

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

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      filter: 'blur(10px)'
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

  const statCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9,
      filter: 'blur(6px)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    }),
    hover: {
      y: -12,
      scale: 1.03,
      boxShadow: '0 30px 60px rgba(229, 182, 62, 0.08), 0 0 40px rgba(229, 182, 62, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  const featureCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.92,
      filter: 'blur(4px)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      borderColor: 'rgba(229, 182, 62, 0.25)',
      boxShadow: '0 20px 40px rgba(229, 182, 62, 0.06)',
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
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const horizontalLineVariants = {
    hidden: { 
      width: 0,
      opacity: 0
    },
    visible: {
      width: '100%',
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const badgeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotate: -15,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        delay: 0.1
      }
    }
  };

  const trustVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(6px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.5,
        duration: 0.7,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="proof-section" 
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* ===== SOPHISTICATED BACKGROUND ===== */}
      <div className="proof-bg-container">
        <div className="proof-half-white-bg"></div>
        <div className="proof-digital-grid"></div>
        <div className="proof-radial-spotlight"></div>
        <div className="proof-particles">
          <div className="proof-particle gold-blur-1"></div>
          <div className="proof-particle gold-blur-2"></div>
          <div className="proof-particle gold-blur-3"></div>
          <div className="proof-particle gold-blur-4"></div>
          <div className="proof-particle gold-blur-5"></div>
          <div className="proof-particle gold-blur-6"></div>
        </div>
        <div className="proof-gradient-overlay"></div>
      </div>

      <div className="proof-container">
        {/* ===== HEADER ===== */}
        <motion.div 
          className="proof-header"
          variants={headerVariants}
        >
          
          
          <motion.h1 className="main-title" variants={headingVariants}>
            <span className="gradient-text">A Decade of Creative DNA.</span>
            <br />
            <span className="creative-dna">Engineered for the AI Era.</span>
            
          </motion.h1>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.6 }
            } : {}}
          >
            Pure software development houses build complex platforms that nobody discovers.
            Overnight AI agencies lack deep consumer psychology and marketing experience.
            <br /><br />
            <strong>We've spent the last 10 years bridging that exact gap.</strong>
            <br />
            We combine a battle-tested marketing legacy with regional software automation successes
            to deliver an execution squad that knows how to build, automate, and grow.
          </motion.p>
        </motion.div>

        {/* ===== STATS GRID ===== */}
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-card"
              custom={index}
              variants={statCardVariants}
              whileHover="hover"
              style={{ '--accent-color': stat.color }}
            >
              <div className="stat-card-glow"></div>
              <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-value-wrapper">
                <span 
                  className="stat-value" 
                  ref={el => counterRefs.current[index] = el}
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <h3 className="stat-title">{stat.label}</h3>
              <p className="stat-description">{stat.description}</p>
              <div className="stat-progress" style={{ background: stat.color }}>
                <motion.div 
                  className="progress-bar" 
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.15 }}
                  style={{ background: stat.color }}
                />
              </div>
              <div className="stat-number-badge">{String(index + 1).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== FEATURES SECTION ===== */}
        <motion.div 
          className="features-section"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Horizontal Line Above */}
          <motion.div 
            className="features-horizontal-line"
            variants={horizontalLineVariants}
          >
            <motion.div 
              className="horizontal-line-content"
              initial={{ width: 0 }}
              animate={isVisible ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="line-icon">✦</span>
            </motion.div>
          </motion.div>

          <div className="features-header">
           
            <motion.h2
              variants={headingVariants}
            >
              Why We're <span className="highlight">Different</span>
            </motion.h2>
          </div>

          {/* Features Grid - 3 in a row */}
          <motion.div 
            className="features-grid"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                custom={index}
                variants={featureCardVariants}
                whileHover="hover"
              >
                <div className="feature-hover-glow"></div>
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="feature-arrow">
                  <span className="arrow-line"></span>
                  <span className="arrow-head">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        

        <CTASection/>
      </div>
    </motion.section>
  );
};

export default Proof;