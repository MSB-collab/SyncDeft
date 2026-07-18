// BlogDetail.jsx - Image Top, Title & Content Below
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './BlogDetail.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">SYNC DEFT</text></svg>`;

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

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchBlogAndRelated();
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

  const fetchBlogAndRelated = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching blog details from API:', `${API_BASE_URL}/blogs/${slug}`);
      
      // Fetch blog details
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data._id) {
        throw new Error('Invalid blog data received');
      }
      
      setBlog(data);
      console.log('Blog fetched successfully:', data.title);

      // Fetch related blogs
      try {
        console.log('Fetching related blogs...');
        const relatedRes = await fetch(`${API_BASE_URL}/blogs/${slug}/related`);
        
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          if (Array.isArray(relatedData)) {
            setRelatedBlogs(relatedData);
            console.log(`Fetched ${relatedData.length} related blogs`);
          } else {
            console.warn('Related blogs data is not an array:', relatedData);
            setRelatedBlogs([]);
          }
        } else {
          console.warn('Related blogs API returned:', relatedRes.status);
          setRelatedBlogs([]);
        }
      } catch (relatedErr) {
        console.warn('Could not fetch related blogs:', relatedErr);
        setRelatedBlogs([]);
      }
      
    } catch (err) {
      console.error('Error loading blog details:', err);
      setError(err.message || 'Unable to load blog post');
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
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
      y: [0, -10, 0],
      transition: {
        duration: 5,
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

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  // Loading State
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading article...</p>
      </div>
    );
  }

  // Error State
  if (error || !blog) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <h2>{error || 'Blog not found'}</h2>
        <p>The requested article could not be found.</p>
        <button onClick={() => navigate('/blogs')} className="btn-primary">
          Back to Blogs
        </button>
      </div>
    );
  }

  // Format content paragraphs
  const formatContent = (content) => {
    if (!content) return ['No content available.'];
    return content.split('\n\n').filter(p => p.trim());
  };

  const contentParagraphs = formatContent(blog.content);

  return (
    <main className="blog-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="blog-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          <div className="blog-hero-bg-gradient"></div>
          <div className="blog-hero-bg-pattern"></div>
        </div>

        <div className="container">
          {/* Breadcrumb */}
          <motion.div
            className="blog-breadcrumb"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/blogs">Insights</Link>
            <span className="separator">/</span>
            <span className="current">{blog.title || 'Blog Post'}</span>
          </motion.div>

          {/* Featured Image - Top */}
          <motion.div
            className="blog-featured-image-top"
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="blog-image-container"
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
                  src={getImageUrl(blog.featuredImage || blog.image)}
                  alt={blog.title || 'Blog post image'}
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="image-glow"></div>
                
                {/* Image Badges */}
                <div className="image-badges">
                  <motion.span 
                    className="image-badge"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <i className="fas fa-check-circle"></i>
                    Featured
                  </motion.span>
                  {blog.category && (
                    <motion.span 
                      className="image-badge category-badge"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <i className="fas fa-tag"></i>
                      {blog.category}
                    </motion.span>
                  )}
                </div>

                {/* Image Stats Overlay */}
                <motion.div 
                  className="image-stats-overlay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="image-stat">
                    <i className="fas fa-eye"></i>
                    <span className="stat-text">{blog.views || 0} Views</span>
                  </div>
                  <div className="image-stat-divider"></div>
                  <div className="image-stat">
                    <i className="fas fa-clock"></i>
                    <span className="stat-text">{blog.readTime || '5 min read'}</span>
                  </div>
                  <div className="image-stat-divider"></div>
                  <div className="image-stat">
                    <i className="fas fa-heart"></i>
                    <span className="stat-text">{blog.likes || 0} Likes</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Title & Content - Below Image */}
          <motion.div
            className="blog-content-below"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              className="blog-badge"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <span className="badge-icon">✦</span>
              <span>{blog.category || 'INSIGHTS'}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="blog-main-heading"
              variants={fadeInUp}
            >
              {blog.title || 'Untitled Post'}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              className="blog-meta-grid"
              variants={staggerContainer}
            >
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="fas fa-user"></i>
                <span>By {blog.author || 'Sync Deft Team'}</span>
              </motion.div>
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="far fa-calendar-alt"></i>
                <span>{new Date(blog.publishedDate || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </motion.div>
              {blog.readTime && (
                <motion.div className="meta-item" variants={fadeInUp}>
                  <i className="far fa-clock"></i>
                  <span>{blog.readTime}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Gradient Line */}
            <motion.div
              className="blog-gradient-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            {/* Excerpt / Description */}
            {blog.excerpt && (
              <motion.p 
                className="blog-excerpt"
                variants={fadeInUp}
              >
                {blog.excerpt}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="blog-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Article Content ────────────────────────────────────────────────── */}
      <section className="blog-content-section">
        <div className="container">
          <motion.article
            className="blog-article"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contentParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="blog-paragraph"
                custom={index}
                variants={contentVariants}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                className="blog-tags"
                variants={fadeInUp}
              >
                <span className="tags-label">Tags:</span>
                <div className="tags-list">
                  {blog.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="tag-item"
                      whileHover={{ scale: 1.1, backgroundColor: '#f9c349', color: '#0D0D0D' }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.article>
        </div>
      </section>

      {/* ── Related Articles Section ──────────────────────────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="related-articles">
          <div className="container">
            <motion.div
              className="related-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">More Insights</span>
              <h2 className="section-title">
                Related <span className="text-gradient">Articles</span>
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
              {relatedBlogs.slice(0, 3).map((item, index) => {
                const imageUrl = getImageUrl(item.featuredImage || item.image);
                
                return (
                  <motion.div
                    key={item._id || index}
                    className="related-card"
                    custom={index}
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => navigate(`/blogs/${item.slug || item._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="related-card-image">
                      <img
                        src={imageUrl}
                        alt={item.title || 'Related article'}
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className="related-card-overlay">
                        <span className="related-category">{item.category || 'Insight'}</span>
                      </div>
                    </div>
                    <div className="related-card-content">
                      <h3>{item.title || 'Untitled'}</h3>
                      <p>
                        {item.excerpt || 
                         item.description?.substring(0, 80) || 
                         'Read more about this topic...'}
                      </p>
                      <div className="related-card-footer">
                        <span className="view-link">Read Article</span>
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="blog-cta">
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
                <span className="cta-badge">Accelerate Your Journey</span>
                <h2>Ready to Apply These Insights?</h2>
                <p>
                  Want to see how these insights can be leveraged for your custom product?
                  Speak to our software engineering architects today.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-primary cta-btn">
                    <i className="fas fa-rocket"></i>
                    Contact Our Team
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

export default BlogDetail;