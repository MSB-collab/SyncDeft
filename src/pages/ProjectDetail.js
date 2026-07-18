// ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import './ProjectDetail.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const DEFAULT_PROJECT_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">SYNC DEFT</text></svg>`;

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_PROJECT_IMAGE;
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
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

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchProjectDetails();
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

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching projects from:', `${API_BASE_URL}/projects`);
      
      const response = await fetch(`${API_BASE_URL}/projects`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Projects fetched successfully:', data.length);
      
      // Find project by slug (or _id if using ObjectId)
      const foundProject = data.find(p => p._id === slug || p.slug === slug);
      
      if (!foundProject) {
        throw new Error('Project not found');
      }
      
      setProject(foundProject);

      // Find related projects (same category, exclude current)
      const filteredRelated = data
        .filter(p => p.category === foundProject.category && p._id !== foundProject._id && p.slug !== foundProject.slug)
        .slice(0, 3);
      
      setRelatedProjects(filteredRelated);
    } catch (err) {
      console.error('Error loading project details:', err);
      setError(err.message || 'Error loading project.');
    } finally {
      setLoading(false);
    }
  };

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

  const floatAnimation = {
    float: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    shimmer: {
      x: ['-100%', '200%'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
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

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      scale: 1.12,
      backgroundColor: '#f9c349',
      color: '#0D0D0D',
      boxShadow: '0 8px 30px rgba(249, 195, 73, 0.3)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Error loading project</h2>
        <p>{error || 'The requested project could not be found.'}</p>
        <button onClick={() => navigate('/projects')} className="btn-primary">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <main className="project-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="project-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="project-hero">
        <div className="project-hero-bg">
          <div className="project-hero-bg-gradient"></div>
          <div className="project-hero-bg-pattern"></div>
        </div>

        <div className="container">
          <div className="project-hero-grid">
            {/* Left Content */}
            <motion.div
              className="project-hero-content"
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="project-breadcrumb"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/projects">Projects</Link>
                <span className="separator">/</span>
                <span className="current">{project.title}</span>
              </motion.div>

              <motion.div 
                className="project-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="badge-icon">✦</span>
                <span>{project.category || 'CASE STUDY'}</span>
              </motion.div>

              <motion.h1 
                className="project-main-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.title}
              </motion.h1>

              <motion.p 
                className="project-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {project.description}
              </motion.p>

              <motion.div 
                className="project-gradient-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />

              <motion.div 
                className="project-meta-grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: 'Client', value: project.client || 'Confidential' },
                  { label: 'Industry', value: project.industry || 'Technology' },
                  { label: 'Completed', value: project.completionDate ? new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Ongoing' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="meta-item"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <span className="meta-label">{item.label}</span>
                    <span className="meta-value">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="project-actions"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact" className="btn-primary">
                    <i className="fas fa-paper-plane"></i>
                    Start a Project
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side Image */}
            <motion.div 
              className="project-hero-image-wrapper"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="project-hero-image-container"
                variants={floatAnimation}
                animate="float"
              >
                <div className="image-wrapper">
                  <motion.div 
                    className="image-shimmer"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                  <img 
                    src={getImageUrl(project.image)} 
                    alt={project.title} 
                    onError={handleImageError}
                  />
                  <div className="image-overlay-glow"></div>
                  
                  {/* Image Badges */}
                  <div className="image-badges">
                    <motion.span 
                      className="image-badge"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <i className="fas fa-check-circle"></i>
                      Completed
                    </motion.span>
                    {project.technologies && project.technologies.length > 0 && (
                      <motion.span 
                        className="image-badge tech-badge"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <i className="fas fa-code"></i>
                        {project.technologies.length}+ Tech
                      </motion.span>
                    )}
                  </div>

                  {/* Image Stats Overlay */}
                  <motion.div 
                    className="image-stats-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="image-stat">
                      <span className="image-stat-number">98%</span>
                      <span className="image-stat-label">Satisfaction</span>
                    </div>
                    <div className="image-stat-divider"></div>
                    <div className="image-stat">
                      <span className="image-stat-number">2x</span>
                      <span className="image-stat-label">Faster Delivery</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="project-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Challenge, Solution, Results Section ───────────────────────────── */}
      <section className="project-details">
        <div className="container">
          {/* Overview */}
          <motion.div 
            className="detail-block overview-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="detail-block-content">
              <span className="block-label">Overview</span>
              <h2>Project Overview</h2>
              <p>{project.description}</p>
            </div>
          </motion.div>

          {/* Challenge */}
          {project.challenge && (
            <motion.div 
              className="detail-block challenge-block"
              custom={0}
              variants={blockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <div className="block-icon-wrapper challenge-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="detail-block-content">
                <span className="block-label">Challenge</span>
                <h2>The Challenge</h2>
                <p>{project.challenge}</p>
              </div>
            </motion.div>
          )}

          {/* Solution */}
          {project.solution && (
            <motion.div 
              className="detail-block solution-block"
              custom={1}
              variants={blockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <div className="block-icon-wrapper solution-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="detail-block-content">
                <span className="block-label">Solution</span>
                <h2>Our Solution</h2>
                <p>{project.solution}</p>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {project.results && (
            <motion.div 
              className="detail-block results-block"
              custom={2}
              variants={blockVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <div className="block-icon-wrapper results-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="detail-block-content">
                <span className="block-label">Results</span>
                <h2>The Results</h2>
                <p>{project.results}</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Technologies Section ───────────────────────────────────────────── */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="project-technologies">
          <div className="container">
            <motion.div
              className="tech-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">Tech Stack</span>
              <h2 className="section-title">
                Technologies <span className="text-gradient">Used</span>
              </h2>
              <div className="section-divider">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>

            <motion.div 
              className="tech-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-item"
                  custom={index}
                  variants={techItemVariants}
                  whileHover="hover"
                >
                  {renderTechBadge(tech)}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Related Projects Section ────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="related-projects">
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
                Related <span className="text-gradient">Projects</span>
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
              {relatedProjects.map((rel, index) => (
                <motion.div 
                  key={rel._id} 
                  className="related-card"
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate(`/projects/${rel._id}`)}
                >
                  <div className="related-card-image">
                    <img 
                      src={getImageUrl(rel.image)} 
                      alt={rel.title}
                      onError={handleImageError}
                    />
                    <div className="related-card-overlay">
                      <span className="related-category">{rel.category || 'Project'}</span>
                    </div>
                  </div>
                  <div className="related-card-content">
                    <h3>{rel.title}</h3>
                    <p>{rel.description?.substring(0, 80)}...</p>
                    <div className="related-card-footer">
                      <span className="view-link">View Project</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="project-cta">
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
                <h2>Interested in a Similar Project?</h2>
                <p>
                  Let's collaborate to build something exceptional that elevates 
                  your business and drives innovation.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-primary cta-btn">
                    <i className="fas fa-rocket"></i>
                    Let's Talk
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;