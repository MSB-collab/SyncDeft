// CaseStudiesSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CaseStudiesSection.css';

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

const CaseStudiesSection = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedCaseStudies();
  }, []);

  const fetchFeaturedCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching featured case studies from API:', `${API_BASE_URL}/case-studies/featured`);
      
      const response = await fetch(`${API_BASE_URL}/case-studies/featured`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Case studies data is not an array:', data);
        setCaseStudies([]);
      } else {
        console.log(`Fetched ${data.length} featured case studies`);
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Error fetching featured case studies:', error);
      setError('Failed to load case studies');
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If loading or no data, return null (as per original behavior)
  if (loading || caseStudies.length === 0) return null;

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
        duration: 0.6
      }
    }
  };

  return (
    <section className="case-studies-section">
      {/* Sophisticated Background Effects */}
      <div className="case-studies-bg-container">
        <div className="case-studies-half-white-bg"></div>
        <div className="case-studies-digital-grid"></div>
        <div className="case-studies-radial-spotlight"></div>
        <div className="case-studies-particles">
          <div className="case-studies-particle gold-blur-1"></div>
          <div className="case-studies-particle gold-blur-2"></div>
          <div className="case-studies-particle gold-blur-3"></div>
          <div className="case-studies-particle gold-blur-4"></div>
          <div className="case-studies-particle gold-blur-5"></div>
          <div className="case-studies-particle gold-blur-6"></div>
        </div>
        <div className="case-studies-gradient-overlay"></div>
      </div>

      <div className="container">
        {/* Centered Header Section */}
        <motion.div
          className="section-header-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            type: 'spring',
            stiffness: 80,
            damping: 15
          }}
        >
          

          <motion.h2 
            className="main-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Real Business Results</span>
            
          </motion.h2>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '120px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 120 }}
          />

          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Explore real projects, client success stories, and software solutions delivered by <strong>TDC.USA</strong>.
          </motion.p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div 
          className="case-studies-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {caseStudies.map((study, index) => (
            <CaseStudyCard 
              key={study._id || index} 
              study={study} 
              getMediaUrl={getMediaUrl}
              onPlay={() => setActiveVideoUrl(getMediaUrl(study.video))}
              onClickDetails={() => navigate(`/case-studies/${study.slug || study._id}`)}
              variants={itemVariants}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div 
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                duration: 0.5
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="video-modal-close" 
                onClick={() => setActiveVideoUrl(null)}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times"></i>
              </motion.button>
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                className="modal-video-element"
                onError={() => {
                  console.error('Video failed to load');
                  setActiveVideoUrl(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Sub-component for individual card
const CaseStudyCard = ({ study, getMediaUrl, onPlay, onClickDetails, variants, index }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
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
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    }
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
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

  const videoUrl = getMediaUrl(study.video);

  return (
    <motion.div
      ref={cardRef}
      className={`case-study-card card-${index % 3}`}
      variants={variants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={onClickDetails}
      style={{ cursor: 'pointer' }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="case-study-media-wrapper">
        {videoUrl && !videoError ? (
          <motion.video 
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="case-study-video-preview"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            onError={() => {
              console.warn('Video failed to load:', videoUrl);
              setVideoError(true);
            }}
          />
        ) : (
          <div className="case-study-placeholder">
            <i className="fas fa-play-circle"></i>
            <span>Preview</span>
          </div>
        )}
        <div className="video-overlay-gradient"></div>
        
        {/* Industry Badge */}
        <div className="industry-badge-pill">
          {study.industry || 'Technology'}
        </div>
        
        {/* Card Number Badge */}
        <div className="card-number-badge">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Play Button Overlay */}
        <div className="play-button-overlay-container" onClick={(e) => { e.stopPropagation(); onPlay(); }}>
          <motion.div 
            className="play-button-pulse-ring"
            animate={isHovered ? { scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] } : { scale: 1, opacity: 0.8 }}
            transition={{ 
              repeat: isHovered ? Infinity : 0, 
              duration: 1.5, 
              ease: 'easeInOut' 
            }}
          />
          <motion.button 
            className="play-button-circle"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-play"></i>
          </motion.button>
        </div>
      </div>

      <div className="case-study-body">
        <motion.h3 
          className="case-study-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
        >
          {study.title || 'Case Study'}
        </motion.h3>
        <motion.p 
          className="case-study-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
        >
          {study.description || 'Learn how we helped this client achieve remarkable results.'}
        </motion.p>
        
        {/* Tags */}
        <motion.div 
          className="case-study-tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          {study.tags && study.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag-pill">{tag}</span>
          ))}
        </motion.div>

        <motion.button 
          className="watch-case-study-btn" 
          onClick={(e) => { e.stopPropagation(); onClickDetails(); }}
          whileHover={{ gap: '0.75rem' }}
          whileTap={{ scale: 0.95 }}
        >
          Watch Case Study <motion.i 
            className="fas fa-arrow-right"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CaseStudiesSection;