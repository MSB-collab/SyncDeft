// Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import { SkeletonGrid } from '../components/SkeletonLoader';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Projects.css';

// FIX: Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const DEFAULT_PROJECT_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">SYNC DEFT</text></svg>`;

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_PROJECT_IMAGE;
  if (imagePath.startsWith('http')) return imagePath;
  // Use the same base URL for images
  return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
};

const handleImageError = (e) => {
  e.target.src = DEFAULT_PROJECT_IMAGE;
};

const getCategoryIcon = (category) => {
  const catLower = category?.toLowerCase() || '';
  if (catLower.includes('web') || catLower.includes('ecommerce')) return 'fa-solid fa-cart-shopping';
  if (catLower.includes('saas') || catLower.includes('analytics') || catLower.includes('dashboard')) return 'fa-solid fa-chart-simple';
  if (catLower.includes('mobile') || catLower.includes('fitness')) return 'fa-solid fa-mobile-screen-button';
  return 'fa-solid fa-laptop';
};

const getProjectEntryVariant = (index) => {
  const col = index % 3;
  if (col === 0) return { hidden: { opacity: 0, x: -40, y: 20 }, visible: { opacity: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 80, damping: 14 } } };
  if (col === 1) return { hidden: { opacity: 0, y: 55, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } } };
  return { hidden: { opacity: 0, x: 40, y: 20 }, visible: { opacity: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 80, damping: 14 } } };
};

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [error, setError] = useState(null);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchProjects();
    window.scrollTo(0, 0);
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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching projects from:', `${API_BASE_URL}/projects`);
      
      const response = await fetch(`${API_BASE_URL}/projects`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Projects fetched:', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message);
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

  return (
    <main className="projects-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="projects-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="projects-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="projects-header-bg">
          <div className="projects-header-bg-gradient"></div>
          <div className="projects-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="projects-floating-icons">
          {['🎯', '💻', '🚀', '📱', '⚡', '✨'].map((icon, i) => (
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
            className="projects-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="projects-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              <motion.span 
                className="projects-pre-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                 
                <span>OUR PORTFOLIO</span>
               
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="projects-main-heading"
            >
              <span className="heading-light">Showcasing Our<span className="heading-highlight"> Best</span></span>
              
              <span className="heading-gradient">Projects</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="projects-header-subtitle"
            >
              Explore our portfolio of innovative digital solutions that have 
              helped businesses transform, grow, and succeed in the digital age.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

           

            {/* Filter Buttons */}
            <motion.div 
              className="projects-filter-group"
              variants={fadeUpVariants}
            >
              <button className="filter-btn active">All Projects</button>
              <button className="filter-btn">Web Development</button>
              <button className="filter-btn">Mobile Apps</button>
              <button className="filter-btn">SaaS Solutions</button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="projects-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Projects Grid ─────────────────────────────────────────────────── */}
      <section className="projects-list">
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="projects-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="section-title">
              Our <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="section-subtitle">
              Each project represents a unique challenge solved with creativity, 
              expertise, and cutting-edge technology.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div 
              className="error-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="error-message">
                <i className="fa-solid fa-circle-exclamation"></i>
                <h3>Failed to load projects</h3>
                <p>{error}</p>
                <button onClick={fetchProjects} className="retry-btn">
                  <i className="fa-solid fa-rotate"></i> Retry
                </button>
              </div>
            </motion.div>
          )}

          {loading ? (
            <SkeletonGrid type="project" count={6} />
          ) : (
            <motion.div
              className="projects-grid-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {projects.length === 0 && !error ? (
                <motion.p className="no-projects" variants={fadeUpVariants}>
                  No projects available yet.
                </motion.p>
              ) : (
                projects.map((project, i) => (
                  <motion.div
                    key={project._id}
                    className="project-card"
                    variants={getProjectEntryVariant(i)}
                    onClick={() => navigate(`/projects/${project._id}`)}
                    style={{ cursor: 'pointer' }}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  >
                    <div className="project-image-container">
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className="project-category-overlay-icon">
                        <i className={getCategoryIcon(project.category)}></i>
                      </div>
                      <div className="project-category-overlay-label">
                        {project.category || 'WEB APPLICATION'}
                      </div>
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech-badges">
                        {project.technologies && project.technologies.slice(0, 4).map(tech => renderTechBadge(tech))}
                        {project.technologies && project.technologies.length > 4 && (
                          <span className="tech-badge more-badge">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                      <div className="project-card-footer">
                        <span className="view-details-label">View Details</span>
                        <div className="arrow-circle-button">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Projects;