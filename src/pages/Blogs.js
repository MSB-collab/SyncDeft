// Blogs.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import './Blogs.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';
// const API_BASE_URL = 'http://localhost:5000/api';
const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23f8f9fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">SYNC DEFT</text></svg>`;

// Get the base URL without /api for images
const getImageBaseUrl = () => {
  return API_BASE_URL.replace('/api', '');
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_BLOG_IMAGE;
  
  // If it's already a full URL or data URL, return as is
  if (imagePath.startsWith('http://') || 
      imagePath.startsWith('https://') || 
      imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  // If it starts with /, just prepend the base URL
  const baseUrl = getImageBaseUrl();
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  // Otherwise, add a slash between base and path
  return `${baseUrl}/${imagePath}`;
};

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = DEFAULT_BLOG_IMAGE;
};

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching blogs from API:', `${API_BASE_URL}/blogs`);
      
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Blogs data is not an array:', data);
        setBlogs([]);
      } else {
        console.log(`Fetched ${data.length} blogs`);
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please refresh the page.');
      setBlogs([]);
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

  const blogCardVariants = {
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

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  // If there's an error, show error state
  if (error) {
    return (
      <main className="blogs-page">
        <div className="blogs-error-container" style={{ 
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
    <main className="blogs-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="blogs-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="blogs-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="blogs-header-bg">
          <div className="blogs-header-bg-gradient"></div>
          <div className="blogs-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="blogs-floating-icons">
          {['📝', '✍️', '📚', '💡', '🎯', '✨'].map((icon, i) => (
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
            className="blogs-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="blogs-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              <motion.span 
                className="blogs-pre-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span>OUR BLOG</span>
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="blogs-main-heading"
            >
              <span className="heading-light">Insights & <span className="heading-highlight">Thought</span></span>
              
              <span className="heading-gradient">Leadership</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="blogs-header-subtitle"
            >
              Explore expert insights, industry trends, and innovative ideas 
              from our team of technology and digital consulting professionals.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            {/* Category Filter */}
            <motion.div 
              className="blogs-filter-group"
              variants={fadeUpVariants}
            >
              <button className="filter-btn active">All Posts</button>
              <button className="filter-btn">Technology</button>
              <button className="filter-btn">Business</button>
              <button className="filter-btn">Innovation</button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="blogs-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Blog Grid ────────────────────────────────────────────────────── */}
      <section className="blogs-list">
        <div className="container">
          {/* Section Header */}
          <motion.div 
            className="blogs-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="section-title">
              Featured <span className="text-gradient">Stories</span>
            </h2>
            <p className="section-subtitle">
              Discover our latest insights, thought leadership, and expert 
              perspectives on technology and business innovation.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          {loading ? (
            <SkeletonGrid type="blog" count={6} />
          ) : blogs.length === 0 ? (
            <motion.div
              className="no-blogs"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.i 
                className="fas fa-pen-nib no-content-icon"
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
              <h3>No Blog Posts Yet</h3>
              <p>Check back soon for new content.</p>
            </motion.div>
          ) : (
            <motion.div
              className="blogs-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {blogs.map((blog, i) => {
                // Get the image URL using the utility function
                const imageUrl = getImageUrl(blog.featuredImage || blog.image);
                
                return (
                  <motion.article
                    key={blog._id || i}
                    className="blog-card"
                    custom={i}
                    variants={blogCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false, amount: 0.1 }}
                    onClick={() => navigate(`/blogs/${blog.slug || blog._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="blog-image-wrapper">
                      <motion.img
                        src={imageUrl}
                        alt={blog.title || 'Blog post'}
                        onError={handleImageError}
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: false }}
                        loading="lazy"
                      />
                      <motion.span 
                        className="blog-category"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: false }}
                      >
                        {blog.category || 'Technology'}
                      </motion.span>
                    </div>

                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-date">
                          <i className="fas fa-calendar-alt"></i>
                          {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="blog-read-time">
                          <i className="fas fa-clock"></i>
                          {blog.readTime || '5 min read'}
                        </span>
                      </div>

                      <h3>{blog.title || 'Untitled Post'}</h3>
                      <p className="blog-excerpt">
                        {blog.excerpt || blog.description?.substring(0, 120) + '...' || 'No description available.'}
                      </p>

                      <div className="blog-footer">
                        <div className="blog-author">
                          <i className="fas fa-user-circle"></i>
                          <span>{blog.author || 'Sync Deft Team'}</span>
                        </div>
                        <motion.div 
                          className="read-more"
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <span>Read More</span>
                          <i className="fas fa-arrow-right"></i>
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blogs;