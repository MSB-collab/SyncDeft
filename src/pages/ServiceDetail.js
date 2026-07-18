// ServiceDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import {
  containerVariants,
  fadeUpVariants,
  defaultViewport,
} from '../utils/animationVariants';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

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

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Animation Variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

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

  const benefitCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const processStepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      x: 5,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const processStepRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      x: -5,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.2
      }
    }
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

  return (
    <main className="service-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="service-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <motion.section 
        className="service-hero"
        variants={pageVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Clean Background */}
        <div className="service-hero-bg">
          <div className="service-hero-bg-gradient"></div>
          <div className="service-hero-bg-pattern"></div>
        </div>

        {/* Floating Icons */}
        <div className="service-floating-icons">
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
                opacity: 0.06,
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
            className="service-hero-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
             
            >
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={headerContentVariants}
              className="service-main-heading"
            >
              <span className="heading-highlight">{service.title}</span>
              <span className="heading-gradient">Service</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={headerContentVariants}
              className="service-hero-description"
            >
              {service.description}
            </motion.p>

            {/* Gradient Line */}
            <motion.div 
              className="hero-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            {/* CTA Buttons */}
            <motion.div 
              className="service-hero-actions"
              variants={headerContentVariants}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = `/contact?job=${encodeURIComponent(service.title)}`}
              >
                <i className="fas fa-paper-plane"></i>
                Request Quote
                <i className="fas fa-arrow-right"></i>
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-play-circle"></i>
                Watch Demo
              </motion.button>
            </motion.div>

           
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="service-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.section>

      {/* ── Overview Section ───────────────────────────────────────────────── */}
      <section className="service-overview">
        <div className="container">
          <motion.div
            className="overview-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <div className="overview-content">
              <span className="overview-label">Overview</span>
              <h2>What We Offer</h2>
              <p>{service.overview}</p>
            </div>
            <div className="overview-stats">
              <div className="stat-box">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">200+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits Section ───────────────────────────────────────────────── */}
      <section className="service-benefits">
        <div className="container">
          <motion.div
            className="service-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
           
            <h2 className="section-title">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
            <p className="section-subtitle">
              We deliver exceptional value through our expertise and commitment to excellence.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <motion.div 
            className="benefits-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {service.benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="benefit-card"
                custom={index}
                variants={benefitCardVariants}
                whileHover="hover"
              >
                <div className="benefit-icon-wrapper">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="benefit-content">
                  <p>{benefit}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Technologies Section ───────────────────────────────────────────── */}
      <section className="service-technologies">
        <div className="container">
          <motion.div
            className="service-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="section-title">
              Technologies & <span className="text-gradient">Frameworks</span>
            </h2>
            <p className="section-subtitle">
              Leveraging cutting-edge tools and modern frameworks for optimal results.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <motion.div 
            className="tech-tags-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {service.technologies.map((tech, index) => (
              <motion.span 
                key={index} 
                className="tech-badge"
                variants={fadeUpVariants}
                custom={index}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#f9c349',
                  color: '#0D0D0D',
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process Section ───────────────────────────────────────────────── */}
      <section className="service-process">
        <div className="container">
          <motion.div
            className="service-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="section-title">
              How We <span className="text-gradient">Work</span>
            </h2>
            <p className="section-subtitle">
              A systematic approach to delivering robust, scalable solutions.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <div className="process-timeline">
            {service.process.map((step, index) => (
              <motion.div 
                key={index} 
                className={`process-step ${index % 2 === 0 ? 'left' : 'right'}`}
                variants={index % 2 === 0 ? processStepVariants : processStepRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover="hover"
              >
                <div className="process-step-number">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="process-step-content">
                  <h3>{step}</h3>
                  <p>
                    {index === 0 && 'We begin by understanding your vision, goals, and requirements to ensure alignment.'}
                    {index === 1 && 'Our team creates detailed architectural designs and prototypes for your approval.'}
                    {index === 2 && 'We build your solution using agile methodologies with regular progress updates.'}
                    {index === 3 && 'Comprehensive testing ensures quality, performance, and reliability.'}
                    {index === 4 && 'Seamless deployment with ongoing support and maintenance.'}
                  </p>
                  <div className="process-step-line"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────────────── */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="service-faqs">
          <div className="container">
            <motion.div
              className="service-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6 }}
            >
              
              <h2 className="section-title">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="section-subtitle">
                Common inquiries about our {service.title.toLowerCase()} service.
              </p>
              <div className="section-divider">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>

            <motion.div 
              className="faq-accordion"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {service.faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                  custom={index}
                  variants={faqItemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="faq-question" 
                    onClick={() => toggleFaq(index)}
                    whileHover={{ backgroundColor: 'rgba(249, 195, 73, 0.05)' }}
                  >
                    <h3>
                      <span className="faq-number">{String(index + 1).padStart(2, '0')}.</span>
                      {faq.question}
                    </h3>
                    <motion.span 
                      className="faq-toggle-icon"
                      animate={{ 
                        rotate: activeFaq === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className={`fas ${activeFaq === index ? 'fa-minus' : 'fa-plus'}`}></i>
                    </motion.span>
                  </motion.div>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div 
                        className="faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="service-cta">
        <div className="container">
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ 
              duration: 0.6,
              type: 'spring',
              stiffness: 200
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="cta-content">
              <span className="cta-badge">Ready to Start?</span>
              <h2>Partner With Us Today</h2>
              <p>
                Ready to transform your ideas into production-ready solutions? 
                Let's setup a consulting session with our engineering leads.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="btn-primary cta-btn">
                  <i className="fas fa-rocket"></i>
                  Get Started Today
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;