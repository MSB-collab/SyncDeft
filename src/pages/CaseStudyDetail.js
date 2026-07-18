// CaseStudyDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import './CaseStudyDetail.css';

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

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchCaseStudyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, [slug]);

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

  const fetchCaseStudyData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching case study from API:', `${API_BASE_URL}/case-studies/slug/${slug}`);
      
      // Fetch the specific case study
      const res = await fetch(`${API_BASE_URL}/case-studies/slug/${slug}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Case study not found');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const currentStudy = await res.json();
      
      if (!currentStudy || !currentStudy._id) {
        throw new Error('Invalid case study data');
      }
      
      setStudy(currentStudy);
      console.log('Case study fetched:', currentStudy.title);

      // Fetch all case studies for related content
      try {
        console.log('Fetching related case studies...');
        const listRes = await fetch(`${API_BASE_URL}/case-studies`);
        
        if (listRes.ok) {
          const allStudies = await listRes.json();
          
          if (Array.isArray(allStudies)) {
            // Filter related by industry
            let filtered = allStudies
              .filter(s => 
                s.industry?.toLowerCase() === currentStudy.industry?.toLowerCase() && 
                s._id !== currentStudy._id
              )
              .slice(0, 3);
            
            // If not enough related by industry, add more from other industries
            if (filtered.length < 3) {
              const extra = allStudies
                .filter(s => s._id !== currentStudy._id && !filtered.find(f => f._id === s._id));
              filtered.push(...extra.slice(0, 3 - filtered.length));
            }
            
            setRelatedStudies(filtered.slice(0, 3));
            console.log(`Found ${filtered.length} related case studies`);
          } else {
            console.warn('Case studies data is not an array');
            setRelatedStudies([]);
          }
        } else {
          console.warn('Related case studies API returned:', listRes.status);
          setRelatedStudies([]);
        }
      } catch (relatedErr) {
        console.warn('Could not fetch related case studies:', relatedErr);
        setRelatedStudies([]);
      }
      
    } catch (error) {
      console.error('Error fetching case study:', error);
      setError(error.message || 'Failed to load case study');
      setStudy(null);
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

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
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

  // Loading State
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading case study details...</p>
      </div>
    );
  }

  // Error State
  if (error || !study) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <h2>{error || 'Case Study Not Found'}</h2>
        <p>The case study you are looking for does not exist or has been removed.</p>
        <Link to="/case-studies" className="btn-primary">
          <i className="fas fa-arrow-left"></i>
          Back to Case Studies
        </Link>
      </div>
    );
  }

  // Get video URL with proper handling
  const videoUrl = getMediaUrl(study.video);
  const thumbnailUrl = getMediaUrl(study.thumbnail);

  return (
    <main className="case-study-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="case-study-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="case-study-hero">
        <div className="case-study-hero-bg">
          <div className="case-study-hero-bg-gradient"></div>
          <div className="case-study-hero-bg-pattern"></div>
        </div>

        {/* Floating Icons */}
        <div className="case-study-floating-icons">
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
            className="case-study-hero-content"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.div
              className="case-study-breadcrumb"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/case-studies">Case Studies</Link>
              <span className="separator">/</span>
              <span className="current">{study.title || 'Case Study'}</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="case-study-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="badge-icon">✦</span>
              <span>{study.industry || 'Technology'}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="case-study-main-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {study.title || 'Untitled Case Study'}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="case-study-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {study.description || 'No description available.'}
            </motion.p>

            {/* Gradient Line */}
            <motion.div
              className="case-study-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            {/* Quick Stats */}
            <motion.div
              className="case-study-stats"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { label: 'Industry', value: study.industry || 'Technology' },
                { label: 'Client', value: study.client || 'Confidential' },
                { label: 'Completed', value: study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Recent' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  variants={fadeInUp}
                >
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="case-study-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Video Section ──────────────────────────────────────────────────── */}
      <section className="case-study-video-section">
        <div className="container">
          <motion.div
            className="case-study-video-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                preload="metadata"
                className="case-study-video-player"
                poster={thumbnailUrl || undefined}
                onError={(e) => {
                  console.warn('Video failed to load');
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="video-placeholder">
                <i className="fas fa-play-circle"></i>
                <span>Video not available</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Content Section ────────────────────────────────────────────────── */}
      <section className="case-study-content-section">
        <div className="container">
          <div className="case-study-grid">
            {/* Left Column - Main Content */}
            <motion.div
              className="case-study-left-col"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Challenge */}
              {study.challenge && (
                <motion.div className="content-block challenge-block" variants={fadeInUp}>
                  <span className="block-icon">⚡</span>
                  <span className="block-label">Challenge</span>
                  <h2>The Challenge</h2>
                  <div className="block-divider"></div>
                  <p>{study.challenge}</p>
                </motion.div>
              )}

              {/* Solution */}
              {study.solution && (
                <motion.div className="content-block solution-block" variants={fadeInUp}>
                  <span className="block-icon">💡</span>
                  <span className="block-label">Solution</span>
                  <h2>Our Solution</h2>
                  <div className="block-divider"></div>
                  <p>{study.solution}</p>
                </motion.div>
              )}

              {/* Results */}
              {study.results && (
                <motion.div className="content-block results-block" variants={fadeInUp}>
                  <span className="block-icon">📈</span>
                  <span className="block-label">Results</span>
                  <h2>The Results</h2>
                  <div className="block-divider"></div>
                  <p>{study.results}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Sidebar */}
            <motion.div
              className="case-study-right-col"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="sidebar-card">
                <h3>Project Details</h3>
                <div className="meta-item">
                  <span className="meta-label">Industry</span>
                  <span className="meta-value">{study.industry || 'Technology'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Client</span>
                  <span className="meta-value">{study.client || 'Confidential'}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Completed</span>
                  <span className="meta-value">
                    {study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    }) : 'Recent'}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{study.duration || '3 months'}</span>
                </div>

                {study.technologies && study.technologies.length > 0 && (
                  <div className="meta-technologies">
                    <h4>Technologies Used</h4>
                    <div className="tech-badges-container">
                      {study.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge-item">
                          {renderTechBadge(tech)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="sidebar-cta">
                  <button
                    className="btn-primary sidebar-btn"
                    onClick={() => navigate('/contact')}
                  >
                    <i className="fas fa-paper-plane"></i>
                    Start a Similar Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related Case Studies ───────────────────────────────────────────── */}
      {relatedStudies.length > 0 && (
        <section className="related-case-studies">
          <div className="container">
            <motion.div
              className="related-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">More Work</span>
              <h2 className="section-title">
                Related <span className="text-gradient">Case Studies</span>
              </h2>
              <div className="section-divider">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>

            <motion.div
              className="related-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {relatedStudies.map((rel, index) => (
                <RelatedCard
                  key={rel._id || index}
                  study={rel}
                  index={index}
                  getMediaUrl={getMediaUrl}
                  onPlay={() => setActiveVideoUrl(getMediaUrl(rel.video))}
                  onClickDetails={() => navigate(`/case-studies/${rel.slug || rel._id}`)}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="case-study-cta">
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
                <span className="cta-badge">Ready to Transform?</span>
                <h2>Ready to Transform Your Business?</h2>
                <p>
                  Let's discuss how our engineering teams can deliver similar
                  business impact for your organization.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button onClick={() => navigate('/contact')} className="btn-primary cta-btn">
                    <i className="fas fa-rocket"></i>
                    Let's Connect
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
                onError={() => {
                  console.error('Modal video failed to load');
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

// ── Related Card Component ──────────────────────────────────────────────────
const RelatedCard = ({ study, index, getMediaUrl, onPlay, onClickDetails }) => {
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

  const cardVariants = {
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
      className="related-case-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, amount: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClickDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="related-card-media">
        {videoUrl && !videoError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="related-card-video"
            onError={() => {
              console.warn('Related video failed to load');
              setVideoError(true);
            }}
          />
        ) : (
          <div className="related-card-placeholder">
            <i className="fas fa-play-circle"></i>
          </div>
        )}
        <div className="related-card-overlay"></div>
        <div className="related-card-badge">{study.industry || 'Technology'}</div>

        <div className="related-play-button" onClick={(e) => { e.stopPropagation(); onPlay(); }}>
          <motion.button
            className="related-play-btn"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-play"></i>
          </motion.button>
        </div>
      </div>

      <div className="related-card-body">
        <h3>{study.title || 'Case Study'}</h3>
        <p>{study.description || 'Learn more about this project.'}</p>
        <div className="related-card-footer">
          <span className="related-meta">
            <i className="fas fa-calendar-alt"></i>
            {study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }) : 'Recent'}
          </span>
          <span className="related-view-link">
            View Study <i className="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyDetail;