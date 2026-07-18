// IndustriesSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './IndustriesSection.css';

const IndustriesSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.2 });
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1, triggerOnce: false });

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Container variants with stagger
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

  // Advanced card variants with 3D entrance
  const getIndustryVariants = (index) => {
    const position = index % 3;
    
    if (position === 0) {
      return {
        hidden: { 
          opacity: 0, 
          x: -60,
          rotateY: -15,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 18,
            delay: index * 0.08,
            duration: 0.8
          }
        }
      };
    } else if (position === 1) {
      return {
        hidden: { 
          opacity: 0, 
          scale: 0.7,
          rotateX: 15,
        },
        visible: {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          transition: {
            type: 'spring',
            stiffness: 90,
            damping: 16,
            delay: index * 0.08 + 0.1,
            duration: 0.8
          }
        }
      };
    } else {
      return {
        hidden: { 
          opacity: 0, 
          x: 60,
          rotateY: 15,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 18,
            delay: index * 0.08 + 0.2,
            duration: 0.8
          }
        }
      };
    }
  };

  // Icon variants with 3D flip and pulse
  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0,
    },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        delay: i * 0.08 + 0.3,
        duration: 0.6
      }
    }),
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      rotate: [0, 3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Heading animation variants
  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
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
      scale: 0.97
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Particle floating animation
  const particleVariants = {
    animate: (i) => ({
      y: [0, -60 - Math.random() * 80, 0],
      x: [0, (Math.random() - 0.5) * 100, 0],
      opacity: [0.1, 0.4, 0.1],
      scale: [0.5, 1.5, 0.5],
      transition: {
        duration: 10 + Math.random() * 8,
        repeat: Infinity,
        delay: i * 0.06,
        ease: "easeInOut"
      }
    })
  };

  // Floating shape variants - Subtle and elegant
  const shapeVariants = {
    animate: (i) => ({
      y: [0, -30 - Math.random() * 40, 0],
      x: [0, (Math.random() - 0.5) * 60, 0],
      rotate: [0, 180, 360],
      opacity: [0.02, 0.06, 0.02],
      transition: {
        duration: 20 + Math.random() * 15,
        repeat: Infinity,
        delay: i * 0.12,
        ease: "easeInOut"
      }
    })
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / (rect.height / 10);
    const rotateY = (x - xc) / (rect.width / 10);
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  const industries = [
    {
      icon: 'fa-solid fa-heart-pulse',
      title: 'Healthcare',
      description: 'Advanced digital health solutions, secure telemedicine platforms, and HIPAA-compliant medical record management systems.',
      solutions: ['Telemedicine Platforms', 'EHR/EMR Integrations', 'Patient Portal Systems'],
      tech: ['React Native', 'Node.js', 'AWS']
    },
    {
      icon: 'fa-solid fa-graduation-cap',
      title: 'Education',
      description: 'Interactive e-learning platforms, virtual classrooms, and comprehensive student information systems for modern academic institutions.',
      solutions: ['LMS Systems Setup', 'Virtual Classrooms', 'E-Learning Portals'],
      tech: ['React', 'WebRTC', 'Firebase']
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Finance',
      description: 'Secure fintech applications, robust payment gateways, and real-time analytic dashboards adhering to strict financial regulations.',
      solutions: ['Fintech Web Apps', 'Payment Gateways', 'Analytics Dashboards'],
      tech: ['Angular', 'Python', 'PostgreSQL']
    },
    {
      icon: 'fa-solid fa-cart-shopping',
      title: 'Retail',
      description: 'Custom e-commerce ecosystems, smart inventory management, and omnichannel digital shopping experiences that drive sales.',
      solutions: ['E-commerce Hubs', 'Inventory Software', 'Omnichannel Systems'],
      tech: ['Next.js', 'Shopify SDK', 'Tailwind']
    },
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'Logistics',
      description: 'Real-time supply chain tracking, fleet management software, and automated warehousing systems to optimize operations.',
      solutions: ['Supply Chain Hubs', 'Fleet Management', 'Automated Warehousing'],
      tech: ['React', 'Google Maps', 'Docker']
    },
    {
      icon: 'fa-solid fa-building-user',
      title: 'Real Estate',
      description: 'Property listing portals, CRM systems for brokers, and virtual touring management platforms that connect buyers and sellers.',
      solutions: ['Property Listings', 'Broker CRM Software', 'Virtual Touring'],
      tech: ['Vue.js', 'Three.js', 'MongoDB']
    }
  ];

  // Section 3D transform - Subtle
  const section3DTransform = {
    rotateX: mousePosition.y * 1,
    rotateY: mousePosition.x * 1,
    perspective: 1200
  };

  return (
    <section 
      ref={sectionRef} 
      className="industries-section"
      style={section3DTransform}
    >
      {/* ===== MODERN ANIMATED BACKGROUND ===== */}
      <div className="industries-bg-container">
        {/* Layer 1: Gradient Orbs with Parallax */}
        <div className="industries-orbs-wrapper">
          <motion.div 
            className="industries-orb industries-orb-1"
            style={{ y: y1, opacity: opacity1 }}
          />
          <motion.div 
            className="industries-orb industries-orb-2"
            style={{ y: y2, opacity: opacity1 }}
          />
          <motion.div 
            className="industries-orb industries-orb-3"
            style={{ y: y1, opacity: opacity1 }}
          />
          <motion.div 
            className="industries-orb industries-orb-4"
            style={{ y: y2, opacity: opacity1 }}
          />
        </div>

        {/* Layer 2: Floating Shapes */}
        <div className="industries-shapes">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`industries-shape shape-${i + 1}`}
              custom={i}
              variants={shapeVariants}
              animate="animate"
            />
          ))}
        </div>

        {/* Layer 3: Floating Particles */}
        <div className="industries-particles">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="industries-particle"
              custom={i}
              variants={particleVariants}
              animate="animate"
              style={{
                position: 'absolute',
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(249, 195, 73, ${0.08 + Math.random() * 0.2}), transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>

        {/* Layer 4: Subtle Grid */}
        <div className="industries-grid-overlay" />

        {/* Layer 5: Noise Texture */}
        <div className="industries-noise" />
      </div>

      <div className="container">
        {/* Header Section */}
        <motion.div
          ref={headingRef}
          className="industries-header"
          variants={headingVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="industries-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-icon">✦</span> INDUSTRIES WE SERVE
          </motion.div>

          <motion.h2 
            className="section-title"
            variants={headingVariants}
          >
            Our Focus <span className="highlight">Industries</span>
          </motion.h2>

          <motion.div className="title-underline-wrapper">
            <motion.div 
              className="title-underline"
              initial={{ width: 0 }}
              animate={isHeadingInView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          <motion.p 
            className="section-subtitle"
            variants={subtitleVariants}
          >
            Delivering tailor-made digital strategies and technical expertise to solve complex challenges across diverse sectors.
          </motion.p>

          {/* Animated counter */}
          <motion.div 
            className="industries-counter"
            initial={{ opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.span 
              className="counter-number"
              initial={{ scale: 0 }}
              animate={isHeadingInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
            >
              6+
            </motion.span>
            <span className="counter-label">Industries Served</span>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="industries-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="industry-card"
              custom={index}
              variants={getIndustryVariants(index)}
              whileHover="hover"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Card Glow */}
              <div className="industry-card-glow" />
              
              {/* Card Border Accent */}
              <div className="industry-card-border" />
              
              {/* Card Pattern */}
              <div className="industry-card-pattern" />

              {/* Icon with pulse */}
              <motion.div
                className="industry-icon-wrapper"
                custom={index}
                variants={iconVariants}
                initial="hidden"
                animate={isSectionInView ? ["visible", "pulse"] : "hidden"}
                whileHover="hover"
              >
                <i className={industry.icon}></i>
              </motion.div>

              {/* Number Badge */}
              <motion.div 
                className="industry-number-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={isSectionInView ? { 
                  opacity: 0.04, 
                  scale: 1,
                  transition: { delay: index * 0.08 + 0.2, type: 'spring' }
                } : {}}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -15 }}
                animate={isSectionInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.08 + 0.25 }
                } : {}}
              >
                {industry.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isSectionInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.08 + 0.35 }
                } : {}}
              >
                {industry.description}
              </motion.p>

              {/* Card Footer with tech tags */}
              <motion.div 
                className="industry-card-footer"
                initial={{ opacity: 0, y: 10 }}
                animate={isSectionInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.08 + 0.45 }
                } : {}}
              >
                <div className="tech-tags">
                  {industry.tech.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="tech-tag"
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Hover Overlay */}
              <div className="industry-hover-overlay">
                <div className="hover-content">
                  <h4>{industry.title} Solutions</h4>
                  <ul className="related-solutions">
                    {industry.solutions.map((solution, i) => (
                      <li key={i}>
                        <span className="solution-icon">✦</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                  <div className="tech-stack-mini">
                    {industry.tech.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  <div className="hover-cta">
                    <span>Learn More</span>
                    <span className="hover-arrow">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;