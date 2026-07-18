// WhyChoose.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import './WhyChoose.css';

const WhyChoose = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.2 });
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Advanced container variants with stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Card variants with 3D entrance and scroll animation
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateX: i % 2 === 0 ? -20 : 20,
      rotateY: i % 2 === 0 ? -15 : 15,
      filter: 'blur(10px)'
    }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
        delay: i * 0.12,
        duration: 0.8
      }
    }),
    hover: {
      scale: 1.05,
      y: -15,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // Icon variants with 3D flip and pulse
  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0,
      filter: 'blur(5px)'
    },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        delay: i * 0.12 + 0.3,
        duration: 0.6
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // ===== ENHANCED HEADING ANIMATION VARIANTS =====
  
  // Character-level stagger for main heading
  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -30,
      scale: 0.5,
      filter: 'blur(12px)'
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 14,
        delay: i * 0.05,
        duration: 0.7
      }
    })
  };

  // Word-level animation for subtitle
  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        delay: i * 0.08 + 0.2,
        duration: 0.6
      }
    })
  };

  // Badge animation with glow pulse
  const badgeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
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
        stiffness: 180,
        damping: 12,
        delay: 0.1
      }
    },
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 20px rgba(249, 195, 73, 0.1)',
        '0 0 50px rgba(249, 195, 73, 0.25)',
        '0 0 20px rgba(249, 195, 73, 0.1)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Heading container with 3D perspective
  const headingContainerVariants = {
    hidden: { 
      opacity: 0,
      perspective: 800,
      rotateX: 15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Subtitle with wave effect
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.92,
      filter: 'blur(6px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 120
      }
    }
  };

  // Floating highlight with bounce
  const floatingVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        type: 'spring',
        stiffness: 150,
        damping: 12
      }
    },
    float: {
      y: [0, -12, 0],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Section 3D transform based on mouse
  const section3DTransform = {
    rotateX: mousePosition.y * 1.5,
    rotateY: mousePosition.x * 1.5,
    perspective: 1200
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
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

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  const whyData = [
    {
      icon: 'fa-solid fa-cubes',
      title: 'Custom Software Solutions',
      description: 'Tailored applications built from the ground up to solve your unique business challenges, optimize operations, and drive growth.',
    },
    {
      icon: 'fa-solid fa-arrows-spin',
      title: 'Agile Development Process',
      description: 'Iterative delivery and rapid feedback cycles ensure complete adaptability, delivering premium code on schedule and budget.',
    },
    {
      icon: 'fa-solid fa-comments',
      title: 'Transparent Communication',
      description: 'We maintain full visibility with daily updates, collaborative workspaces, and direct developer access so you are always in control.',
    },
    {
      icon: 'fa-solid fa-headset',
      title: 'Long-Term Support',
      description: 'Ongoing post-launch optimization, cloud infrastructure management, security audits, and dedicated support for your ongoing success.',
    }
  ];

  // Split text into words for subtitle animation
  const subtitleText = "We partner with businesses to deliver future-proof solutions through collaborative engineering and robust processes.";
  const words = subtitleText.split(' ');

  // Split heading into characters with special handling for "TDC.USA"
  const headingText = "Why Choose";
  const headingChars = headingText.split('');

  return (
    <section 
      ref={sectionRef} 
      className="why-choose-section"
      style={section3DTransform}
    >
      {/* ===== SIMPLIFIED BACKGROUND ===== */}
      <div className="why-bg-container">
        <div className="why-orbs-wrapper">
          <motion.div 
            className="why-orb why-orb-1"
            style={{ y: y1, opacity: opacity1 }}
          />
          <motion.div 
            className="why-orb why-orb-2"
            style={{ y: y2, opacity: opacity1 }}
          />
          <motion.div 
            className="why-orb why-orb-3"
            style={{ y: y1, opacity: opacity1 }}
          />
        </div>

        <div className="why-grid-lines">
          <div className="why-grid-line horizontal"></div>
          <div className="why-grid-line vertical"></div>
        </div>

        <div 
          className="why-mouse-glow"
          style={{
            left: `${(mousePosition.x + 0.5) * 100}%`,
            top: `${(mousePosition.y + 0.5) * 100}%`
          }}
        >
          <div className="mouse-glow-inner"></div>
        </div>
      </div>

      <div className="container">
        {/* ===== ENHANCED HEADER SECTION ===== */}
        <motion.div
          ref={headingRef}
          className="why-header"
          variants={headingContainerVariants}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
        >
          
          
          {/* Character-staggered heading */}
          <motion.h2 className="section-title">
            {headingChars.map((char, index) => {
              // Check if this is the start of "TDC.USA"
              const isTDC = headingText.substring(index).startsWith('TDC.USA');
              const isSpace = char === ' ';
              
              return (
                <motion.span
                  key={index}
                  custom={index}
                  variants={charVariants}
                  initial="hidden"
                  animate={isHeadingInView ? "visible" : "hidden"}
                  style={{ 
                    display: 'inline-block',
                    whiteSpace: isSpace ? 'pre' : 'normal'
                  }}
                  className={isTDC ? 'highlight' : ''}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </motion.h2>

          {/* Animated underline with glow */}
          <motion.div className="title-underline-wrapper">
            <motion.div 
              className="title-underline"
              initial={{ width: 0, opacity: 0 }}
              animate={isHeadingInView ? { 
                width: '100%', 
                opacity: 1,
                transition: { duration: 0.8, delay: 0.5 }
              } : { width: 0, opacity: 0 }}
            />
            <motion.div 
              className="title-underline-glow"
              initial={{ opacity: 0 }}
              animate={isHeadingInView ? { 
                opacity: [0, 0.5, 0],
                transition: { duration: 2, delay: 0.7, repeat: Infinity }
              } : { opacity: 0 }}
            />
          </motion.div>
          
          {/* Word-staggered subtitle */}
          <motion.p 
            className="section-subtitle"
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

         

          {/* Decorative floating elements */}
          <motion.div 
            className="heading-decoration decoration-1"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={isHeadingInView ? { 
              opacity: 0.06, 
              scale: 1, 
              rotate: 0,
              transition: { delay: 0.8, duration: 0.6, type: 'spring' }
            } : {}}
          />
          <motion.div 
            className="heading-decoration decoration-2"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={isHeadingInView ? { 
              opacity: 0.04, 
              scale: 1, 
              rotate: 0,
              transition: { delay: 0.9, duration: 0.6, type: 'spring' }
            } : {}}
          />
        </motion.div>

        {/* Cards Grid */}
        <div className="why-choose-connect-container">
          <motion.div
            className="why-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isSectionInView ? "visible" : "hidden"}
          >
            {whyData.map((item, index) => (
              <motion.div
                key={index}
                className="why-card"
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="why-card-glow" />
                <div className="why-card-border" />
                <div className="why-card-pattern" />

                <motion.div
                  className="why-icon-wrapper"
                  custom={index}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isSectionInView ? ["visible", "pulse"] : "hidden"}
                  whileHover="hover"
                >
                  <i className={item.icon}></i>
                </motion.div>

                <motion.div 
                  className="why-number-badge"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isSectionInView ? { 
                    opacity: 0.06, 
                    scale: 1,
                    transition: { delay: index * 0.12 + 0.2, type: 'spring' }
                  } : {}}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isSectionInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.12 + 0.25 }
                  } : {}}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isSectionInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.12 + 0.35 }
                  } : {}}
                >
                  {item.description}
                </motion.p>

                <motion.div 
                  className="why-learn-more"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isSectionInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.12 + 0.45 }
                  } : {}}
                >
                  <span>Learn More</span>
                  <motion.span 
                    className="learn-more-arrow"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.div>

                <motion.div 
                  className="card-progress"
                  initial={{ scaleX: 0 }}
                  animate={isSectionInView ? { 
                    scaleX: 1,
                    transition: { delay: index * 0.12 + 0.5, duration: 0.8 }
                  } : {}}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="why-bottom-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.8, duration: 0.6, type: 'spring' }
          } : {}}
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="cta-glow-ring"
          />
          <p>Ready to start your project?</p>
          <motion.button 
            className="why-cta-btn"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contact'}
          >
            <span>Get Started</span>
            <motion.span 
              className="cta-arrow"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;