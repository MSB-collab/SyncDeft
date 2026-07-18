// Careers.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { SkeletonGrid } from '../components/SkeletonLoader';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Careers.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const perksData = [
  { icon: 'fa-rocket', label: 'Fast Growth' },
  { icon: 'fa-globe', label: 'Remote-Friendly' },
  { icon: 'fa-heart', label: 'Great Benefits' },
  { icon: 'fa-users', label: 'Strong Culture' },
];

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchJobs();
    // Auto scroll to top on reload
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

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching jobs from API:', `${API_BASE_URL}/jobs`);
      
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Jobs data is not an array:', data);
        setJobs([]);
      } else {
        console.log(`Fetched ${data.length} jobs`);
        
        // Filter for open jobs only
        const openJobs = data.filter(job => {
          // Check if job is active/open
          const isActive = job.activeJob !== false;
          const isOpen = job.status === 'Open' || job.status === undefined || job.status === null;
          return isActive && isOpen;
        });
        
        console.log(`Found ${openJobs.length} open jobs`);
        setJobs(openJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load job listings. Please refresh the page.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
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

  const perkVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }),
    hover: {
      scale: 1.1,
      color: '#f9c349',
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  const jobCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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
      y: -6,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // If there's an error, show error state
  if (error) {
    return (
      <main className="careers-page">
        <div className="careers-error-container" style={{ 
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
    <main className="careers-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="careers-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="careers-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="careers-header-bg">
          <div className="careers-header-bg-gradient"></div>
          <div className="careers-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="careers-floating-icons">
          {['🚀', '💼', '🌟', '🎯', '💡', '✨'].map((icon, i) => (
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
            className="careers-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="careers-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="careers-main-heading"
            >
              <span className="heading-light">Build Your <span className="heading-highlight">Dream</span> <span className="heading-gradient">Career</span> </span>
              
              
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="careers-header-subtitle"
            >
              Join a team of passionate innovators and technology leaders 
              who are shaping the future of digital transformation.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

          

            {/* Perks */}
            <motion.div
              className="careers-perks-bar"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {perksData.map((perk, i) => (
                <motion.div
                  key={perk.label}
                  className="careers-perk-item"
                  custom={i}
                  variants={perkVariants}
                  whileHover="hover"
                >
                  <motion.i 
                    className={`fas ${perk.icon}`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.3
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <span>{perk.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="careers-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Job Listings ─────────────────────────────────────────────────── */}
      <section className="careers-list">
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="careers-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Find Your <span className="text-gradient">Opportunity</span>
            </h2>
            <p className="section-subtitle">
              We're looking for talented individuals who are passionate about 
              technology and innovation to join our growing team.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          {loading ? (
            <SkeletonGrid type="career" count={3} />
          ) : jobs.length === 0 ? (
            <motion.div
              className="no-jobs"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem'
              }}
            >
              <motion.i 
                className="fas fa-briefcase no-content-icon"
                style={{ fontSize: '4rem', color: '#f9c349', marginBottom: '1rem', display: 'block' }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No Open Positions</h3>
              <p style={{ color: '#94a3b8' }}>Check back later for new opportunities.</p>
            </motion.div>
          ) : (
            <motion.div
              className="jobs-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {jobs.map((job, i) => (
                <motion.div
                  key={job._id || i}
                  className="job-card"
                  custom={i}
                  variants={jobCardVariants}
                  whileHover="hover"
                  onClick={() => navigate(`/careers/${job._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="job-header">
                    <div className="job-title-group">
                      <h3>{job.title || 'Untitled Position'}</h3>
                      <div className="job-badges">
                        <span className={`job-type ${job.type?.toLowerCase().replace(' ', '-') || 'full-time'}`}>
                          {job.type || 'Full Time'}
                        </span>
                        <span className="job-dept-badge">{job.department || 'General'}</span>
                      </div>
                    </div>
                    <motion.div 
                      className="job-arrow"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <i className="fas fa-arrow-right"></i>
                    </motion.div>
                  </div>

                  <div className="job-details">
                    <span className="job-detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      {job.location || 'Remote'}
                    </span>
                    <span className="job-detail-item">
                      <i className="fas fa-briefcase"></i>
                      {job.experienceLevel || 'Mid-Level'}
                    </span>
                    {job.salary && (
                      <span className="job-detail-item">
                        <i className="fas fa-dollar-sign"></i>
                        {job.salary}
                      </span>
                    )}
                  </div>

                  <p className="job-description">
                    {job.description || job.summary?.substring(0, 150) + '...' || 'No description available.'}
                  </p>

                  <div className="job-footer">
                    <span className="job-posted">
                      <i className="fas fa-calendar-alt"></i>
                      Posted {new Date(job.postedDate || job.createdAt || Date.now()).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <motion.button
                      className="job-apply-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/careers/${job._id}`);
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 25px rgba(249, 195, 73, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                      <i className="fas fa-arrow-right"></i>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Careers;