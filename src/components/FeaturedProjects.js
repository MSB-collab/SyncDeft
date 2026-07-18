// FeaturedProjects.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { getImageUrl } from '../utils/imageUtils';
import './FeaturedProjects.css';

const FeaturedProjects = ({ loading, projects }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.2 });

  // Ensure projects is always an array and has fallback data
  const projectsArray = Array.isArray(projects) && projects.length > 0 ? projects : [];
  const displayProjects = projectsArray.slice(0, 3);

  // Enhanced card variants with staggered entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        delay: i * 0.12,
        duration: 0.7,
      },
    }),
  };

  // Heading character stagger
  const charVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -25, scale: 0.6, filter: 'blur(8px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 14,
        delay: i * 0.045,
      },
    }),
  };

  const titleText = 'Featured Projects';

  // Helper function to get image URL with multiple fallbacks
  const getProjectImage = (imagePath) => {
    if (!imagePath) {
      return 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=Project';
    }
    
    // Try to get the URL from the utility
    try {
      return getImageUrl(imagePath);
    } catch (e) {
      console.warn('Error getting image URL:', e);
      return 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=Project';
    }
  };

  // Handle image error with progressive fallback
  const handleImageError = (projectId, e) => {
    const currentSrc = e.target.src;
    const errorCount = imageErrors[projectId] || 0;
    
    console.warn(`Image error for project ${projectId}, attempt ${errorCount + 1}`);
    
    // Don't try to fix data URLs or already failed images
    if (currentSrc.startsWith('data:')) {
      return;
    }
    
    // Try different fallback strategies
    const fallbacks = [
      // Strategy 1: Try with cache busting
      () => {
        if (!currentSrc.includes('?t=')) {
          e.target.src = currentSrc + '?t=' + Date.now();
          return true;
        }
        return false;
      },
      // Strategy 2: Try placeholder with different text
      () => {
        e.target.src = 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=Project+Image';
        return true;
      },
      // Strategy 3: Try SVG data URL
      () => {
        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23E5B63E">Project</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2364748b">No Image Available</text></svg>';
        return true;
      }
    ];
    
    // Try the next fallback strategy
    const currentAttempt = errorCount;
    if (currentAttempt < fallbacks.length) {
      const success = fallbacks[currentAttempt]();
      if (success) {
        setImageErrors(prev => ({ ...prev, [projectId]: currentAttempt + 1 }));
        return;
      }
    }
    
    // All fallbacks failed, prevent infinite loop
    e.target.onerror = null;
  };

  // Handle image load success
  const handleImageLoad = (projectId) => {
    setImageLoadStatus(prev => ({ ...prev, [projectId]: true }));
  };

  // Log projects for debugging
  useEffect(() => {
    if (displayProjects.length > 0) {
      console.log('FeaturedProjects rendering with projects:', displayProjects.length);
      displayProjects.forEach((p, i) => {
        console.log(`Project ${i+1}: ${p.title}, has image: ${!!p.image}`);
      });
    } else {
      console.log('FeaturedProjects: No projects to display');
    }
  }, [displayProjects]);

  // Loading skeleton
  if (loading) {
    return (
      <section className="featured-projects loading-section">
        <div className="container">
          <div className="projects-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
          </div>
          <div className="projects-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="project-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section ref={sectionRef} className="featured-projects">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headingRef}
          className="projects-header"
          initial="hidden"
          animate={isHeadingInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="section-title">
            {titleText.split('').map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={charVariants}
                initial="hidden"
                animate={isHeadingInView ? 'visible' : 'hidden'}
                style={{ display: 'inline-block' }}
                className={char === ' ' ? 'space-char' : ''}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            animate={isHeadingInView ? { width: '160px', opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 120 }}
          />

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 25 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore our recent successful projects that deliver real results and
            create lasting impact for businesses worldwide.
          </motion.p>

          <motion.div
            className="projects-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="stat-number">{displayProjects.length}</span>
              <span className="stat-label">Featured</span>
            </motion.div>
            <div className="stat-divider"></div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="stat-number">100%</span>
              <span className="stat-label">Success</span>
            </motion.div>
            <div className="stat-divider"></div>
            <motion.div
              className="stat-item"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="stat-number">10+</span>
              <span className="stat-label">Years</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
        >
          {displayProjects.length > 0 ? (
            displayProjects.map((project, index) => {
              const projectId = project._id || `project-${index}`;
              const imageUrl = getProjectImage(project.image);
              const isLoaded = imageLoadStatus[projectId];
              
              return (
                <motion.div
                  key={projectId}
                  className="project-card"
                  custom={index}
                  variants={cardVariants}
                  onClick={() => navigate(`/projects/${project._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Image */}
                  <div className="project-image-container">
                    <img
                      src={imageUrl}
                      alt={project.title || 'Project'}
                      className="project-image"
                      onLoad={() => handleImageLoad(projectId)}
                      onError={(e) => handleImageError(projectId, e)}
                      loading="lazy"
                      style={{ 
                        opacity: isLoaded ? 1 : 0.7,
                        transition: 'opacity 0.5s ease'
                      }}
                    />
                    <div className="project-image-overlay" />
                  </div>

                  {/* Content */}
                  <div className="project-content">
                    <div className="project-title-wrapper">
                      <h3>{project.title || 'Untitled Project'}</h3>
                      <div className="project-title-line"></div>
                    </div>

                    <p>
                      {project.description || 'No description available'}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="project-tech-stack">
                      {project.techStack && Array.isArray(project.techStack) && 
                        project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      {project.techStack && Array.isArray(project.techStack) && 
                        project.techStack.length > 3 && (
                          <span className="tech-tag more-tag">+{project.techStack.length - 3}</span>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="project-card-footer">
                      <span className="view-details-label">
                        <span className="label-text">View Project</span>
                        <span className="label-arrow">→</span>
                      </span>
                      <div className="arrow-circle">
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="no-projects-message" style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#94a3b8',
              gridColumn: '1 / -1'
            }}>
              <i className="fas fa-folder-open" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ fontSize: '1.1rem' }}>No featured projects available at the moment.</p>
            </div>
          )}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="section-action"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isSectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 150 }}
        >
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/projects')}
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: '0 15px 50px rgba(229, 182, 62, 0.25)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <motion.span
              className="btn-arrow"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProjects;