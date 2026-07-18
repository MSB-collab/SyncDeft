// CaseStudies.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './CaseStudies.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

// Get the base URL without /api for media
const getMediaBaseUrl = () => {
  return API_BASE_URL.replace('/api', '');
};

const getMediaUrl = (path) => {
  if (!path) return '';
  
  // If it's already a full URL or data URL, return as is
  if (path.startsWith('http://') || 
      path.startsWith('https://') || 
      path.startsWith('data:')) {
    return path;
  }
  
  // If it starts with /, just prepend the base URL
  const baseUrl = getMediaBaseUrl();
  if (path.startsWith('/')) {
    return `${baseUrl}${path}`;
  }
  
  // Otherwise, add a slash between base and path
  return `${baseUrl}/${path}`;
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaseStudies();
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

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching case studies from API:', `${API_BASE_URL}/case-studies`);
      
      const response = await fetch(`${API_BASE_URL}/case-studies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Case studies data is not an array:', data);
        setCaseStudies([]);
      } else {
        console.log(`Fetched ${data.length} case studies`);
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setError('Failed to load case studies. Please refresh the page.');
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveVideoUrl(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      y: -10,
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // If there's an error, show error state
  if (error) {
    return (
      <main className="case-studies-page">
        <div className="case-studies-error-container" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#f9c349', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '2rem',
              padding: '12px 32px',
              background: '#f9c349',
              border: 'none',
              borderRadius: '8px',
              color: '#0D0D0D',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="case-studies-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="case-studies-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="case-studies-hero">
        <div className="case-studies-hero-bg">
          <div className="case-studies-hero-bg-gradient"></div>
          <div className="case-studies-hero-bg-pattern"></div>
        </div>

        {/* Floating Icons */}
        <div className="case-studies-floating-icons">
          {['🏆', '📊', '🚀', '💡', '🎯', '✨'].map((icon, i) => (
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
            className="case-studies-hero-content"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              className="case-studies-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              <span>Success Stories</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="case-studies-main-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="heading-light">Client <span className="heading-highlight">Success</span> <span className="heading-gradient">Stories</span> </span>
              
              
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="case-studies-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Discover how we empower businesses around the globe to scale and
              optimize operations through premium technology solutions.
            </motion.p>

            {/* Gradient Line */}
            <motion.div
              className="case-studies-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

           
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="case-studies-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Main Grid Section ─────────────────────────────────────────────── */}
      <section className="case-studies-grid-section">
        <div className="container">
          <motion.div
            className="case-studies-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Our <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="section-subtitle">
              Explore real-world examples of how we've helped businesses transform
              and achieve remarkable results.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
              <p>Loading case studies...</p>
            </div>
          ) : (
            <>
              {caseStudies.length === 0 ? (
                <div className="empty-message">
                  <i className="fas fa-folder-open"></i>
                  <h3>No case studies available</h3>
                  <p>Please check back later for our success stories.</p>
                </div>
              ) : (
                <motion.div
                  className="case-studies-grid-container"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  {caseStudies.map((study, i) => (
                    <CaseStudyCard
                      key={study._id || i}
                      study={study}
                      index={i}
                      getMediaUrl={getMediaUrl}
                      onPlay={() => setActiveVideoUrl(getMediaUrl(study.video))}
                      onClickDetails={() => navigate(`/case-studies/${study.slug || study._id}`)}
                    />
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="case-studies-cta">
        <div className="container">
          <motion.div
            className="cta-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="cta-box"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="cta-content">
                <span className="cta-badge">Ready to Start?</span>
                <h2>Ready to Write Your Success Story?</h2>
                <p>
                  Let's collaborate to build something exceptional that elevates
                  your business and drives measurable results.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => navigate('/contact')} className="btn-primary cta-btn">
                    <i className="fas fa-rocket"></i>
                    Let's Talk
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Fullscreen Video Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={() => setActiveVideoUrl(null)}>
                <i className="fas fa-times"></i>
              </button>
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                className="modal-video-element"
                onError={(e) => {
                  console.error('Video failed to load');
                  setActiveVideoUrl(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

// ── Card Sub-component ────────────────────────────────────────────────────────
const CaseStudyCard = ({ study, index, getMediaUrl, onPlay, onClickDetails }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && study.video && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay failed:', err);
        setVideoError(true);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Define card variants inside the component to avoid issues
  const cardItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const videoUrl = getMediaUrl(study.video);

  return (
    <motion.div
      className="case-study-card"
      variants={cardItemVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, amount: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClickDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="case-study-media-wrapper">
        {videoUrl && !videoError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="case-study-video-preview"
            onError={() => {
              console.warn('Video failed to load:', videoUrl);
              setVideoError(true);
            }}
          />
        ) : (
          <div className="case-study-placeholder">
            <i className="fas fa-play-circle"></i>
            <span>Video Preview</span>
          </div>
        )}
        <div className="video-overlay-gradient"></div>

        {/* Industry Badge */}
        <div className="industry-badge-pill">
          <i className="fas fa-tag"></i>
          {study.industry || 'Technology'}
        </div>

        {/* Play Button Overlay */}
        <div className="play-button-overlay-container" onClick={(e) => { e.stopPropagation(); onPlay(); }}>
          <motion.div
            className="play-button-pulse-ring"
            animate={isHovered ? { scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] } : {}}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.button
            className="play-button-circle"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
          >
            <i className="fas fa-play"></i>
          </motion.button>
        </div>
      </div>

      <div className="case-study-body">
        <h3 className="case-study-title">{study.title || 'Case Study'}</h3>
        <p className="case-study-desc">
          {study.description || 'Learn how we helped this client achieve remarkable results.'}
        </p>
        <div className="case-study-footer">
          <span className="case-study-meta">
            <i className="fas fa-calendar-alt"></i>
            {study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }) : 'Recent'}
          </span>
          <button 
            className="watch-case-study-btn" 
            onClick={(e) => { 
              e.stopPropagation(); 
              onClickDetails(); 
            }}
          >
            Watch Case Study <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudies;