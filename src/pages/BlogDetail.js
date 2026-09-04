// BlogDetail.jsx - The Art of Hiring (Modern Split Layout)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './BlogDetail.css';

// Direct API URL without env
// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23f9c349">SYNC DEFT</text></svg>`;

// Cloudinary base URL pattern
const CLOUDINARY_URL_PATTERN = 'res.cloudinary.com';

/**
 * Get the correct image URL - handles both Cloudinary and local images
 * @param {string} imagePath - The image path or URL
 * @returns {string} - The complete image URL
 */
const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_BLOG_IMAGE;
  
  // If it's already a full URL (Cloudinary, HTTP, HTTPS, or data URL), return as is
  if (imagePath.startsWith('http://') || 
      imagePath.startsWith('https://') || 
      imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  // If it contains Cloudinary URL pattern, it's already a full URL
  if (imagePath.includes(CLOUDINARY_URL_PATTERN)) {
    // Ensure it has https:// if it's a Cloudinary URL without protocol
    if (imagePath.startsWith('//')) {
      return `https:${imagePath}`;
    }
    return imagePath;
  }
  
  // For local development, if it starts with /uploads, prepend the base URL
  if (imagePath.startsWith('/uploads')) {
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  
  // For relative paths that don't start with /
  if (!imagePath.startsWith('/')) {
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}/${imagePath}`;
  }
  
  // Default fallback - treat as local path
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
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
  const [activeSection, setActiveSection] = useState('');

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

      const sections = document.querySelectorAll('.blog-heading-h2, .blog-heading-h3');
      let current = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id || section.textContent;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchBlogAndRelated = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching blog with slug:', slug);
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
      
      console.log('Blog fetched:', data.title);
      console.log('Image URL:', data.featuredImage || data.image);
      setBlog(data);

      try {
        const relatedRes = await fetch(`${API_BASE_URL}/blogs/${slug}/related`);
        
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          if (Array.isArray(relatedData)) {
            setRelatedBlogs(relatedData);
          } else {
            setRelatedBlogs([]);
          }
        } else {
          setRelatedBlogs([]);
        }
      } catch (relatedErr) {
        console.error('Error fetching related blogs:', relatedErr);
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
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

  // Format content
  const formatContent = (content) => {
    if (!content) return ['No content available.'];
    
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((p) => {
      if (p.includes('|') && p.includes('---')) {
        return { type: 'table', content: p };
      }
      if (p.startsWith('# ')) {
        return { type: 'h1', content: p.replace('# ', '') };
      }
      if (p.startsWith('## ')) {
        return { type: 'h2', content: p.replace('## ', '') };
      }
      if (p.startsWith('### ')) {
        return { type: 'h3', content: p.replace('### ', '') };
      }
      if (p.startsWith('- ')) {
        return { type: 'list', content: p };
      }
      return { type: 'paragraph', content: p };
    });
  };

  const parseTable = (tableContent) => {
    const lines = tableContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;

    const headerLine = lines[0];
    const dataLines = lines.slice(2);

    const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
    const dataRows = dataLines.map(line => {
      return line.split('|').map(cell => cell.trim()).filter(cell => cell);
    });

    return { headers, rows: dataRows };
  };

  const parseList = (listContent) => {
    const items = listContent.split('\n').filter(item => item.trim().startsWith('- '));
    return items.map(item => item.replace('- ', '').trim());
  };

  const extractHeadings = (content) => {
    const headings = [];
    const lines = content.split('\n');
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        headings.push({ level: 'h2', text: line.replace('## ', '').trim() });
      } else if (line.startsWith('### ')) {
        headings.push({ level: 'h3', text: line.replace('### ', '').trim() });
      }
    });
    return headings;
  };

  const contentBlocks = formatContent(blog.content);
  const tocHeadings = extractHeadings(blog.content);

  const renderBlock = (block, index) => {
    const id = block.type === 'h2' || block.type === 'h3' 
      ? block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
      : undefined;

    switch (block.type) {
      case 'h1':
        return (
          <motion.h1
            key={index}
            className="blog-heading-h1"
            custom={index}
            variants={contentVariants}
          >
            {block.content}
          </motion.h1>
        );
      case 'h2':
        return (
          <motion.h2
            key={index}
            id={id}
            className="blog-heading-h2"
            custom={index}
            variants={contentVariants}
          >
            {block.content}
          </motion.h2>
        );
      case 'h3':
        return (
          <motion.h3
            key={index}
            id={id}
            className="blog-heading-h3"
            custom={index}
            variants={contentVariants}
          >
            {block.content}
          </motion.h3>
        );
      case 'table': {
        const tableData = parseTable(block.content);
        if (!tableData) return null;
        return (
          <motion.div
            key={index}
            className="blog-table-wrapper"
            custom={index}
            variants={contentVariants}
          >
            <table className="blog-table">
              <thead>
                <tr>
                  {tableData.headers.map((header, i) => (
                    <th key={i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        );
      }
      case 'list': {
        const items = parseList(block.content);
        return (
          <motion.ul
            key={index}
            className="blog-list"
            custom={index}
            variants={contentVariants}
          >
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </motion.ul>
        );
      }
      case 'paragraph':
      default:
        return (
          <motion.p
            key={index}
            className="blog-paragraph"
            custom={index}
            variants={contentVariants}
          >
            {block.content}
          </motion.p>
        );
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title || 'Sync Deft Blog';
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

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

          {/* Hero Split Layout - Image Right, Content Left */}
          <div className="blog-hero-split">
            {/* Left Content */}
            <motion.div
              className="blog-hero-content"
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
            >
              <div className="hero-content-wrapper">
                {/* Badge */}
                <motion.div
                  className="blog-badge"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="badge-icon">✦</span>
                  <span>{blog.category || 'TALENT & CULTURE'}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="blog-main-heading"
                  variants={fadeInUp}
                >
                  {blog.title || 'The Art of Hiring'}
                </motion.h1>

                {/* Excerpt */}
                {(blog.excerpt || blog.metaDescription) && (
                  <motion.p 
                    className="blog-excerpt"
                    variants={fadeInUp}
                  >
                    {blog.excerpt || blog.metaDescription}
                  </motion.p>
                )}

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
                  <motion.div className="meta-item" variants={fadeInUp}>
                    <i className="far fa-clock"></i>
                    <span>{blog.readTime || '8 min read'}</span>
                  </motion.div>
                </motion.div>

                {/* Gradient Line */}
                <motion.div
                  className="blog-gradient-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />

                {/* Stats */}
                <motion.div
                  className="hero-stats"
                  variants={fadeInUp}
                >
                  <div className="hero-stat">
                    <span className="stat-number">{blog.views || 0}</span>
                    <span className="stat-label">Views</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="stat-number">{blog.likes || 0}</span>
                    <span className="stat-label">Likes</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="stat-number">Hiring</span>
                    <span className="stat-label">Insights</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="blog-hero-image"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              <div className="hero-image-wrapper">
                <motion.div 
                  className="hero-image-container"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="hero-image-glow"></div>
                  <img
                    src={getImageUrl(blog.featuredImage || blog.image)}
                    alt={blog.title || 'Blog post image'}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  {/* Image Badges */}
                  <div className="hero-image-badges">
                    <span className="hero-badge featured">
                      <i className="fas fa-check-circle"></i>
                      Featured
                    </span>
                    <span className="hero-badge insights">
                      <i className="fas fa-lightbulb"></i>
                      Talent Strategy
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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

      {/* ── Article Content with Sidebar ────────────────────────────────── */}
      <section className="blog-content-section">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <motion.article
              className="blog-article"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contentBlocks.map((block, index) => renderBlock(block, index))}

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

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside className="blog-sidebar">
              {/* Share Section */}
              <motion.div
                className="sidebar-share"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="sidebar-title">Share this Article</h4>
                <div className="share-buttons">
                  <button 
                    className="share-btn twitter"
                    onClick={() => handleShare('twitter')}
                    aria-label="Share on Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button 
                    className="share-btn linkedin"
                    onClick={() => handleShare('linkedin')}
                    aria-label="Share on LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                  <button 
                    className="share-btn facebook"
                    onClick={() => handleShare('facebook')}
                    aria-label="Share on Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button 
                    className="share-btn email"
                    onClick={() => handleShare('email')}
                    aria-label="Share via Email"
                  >
                    <i className="fas fa-envelope"></i>
                  </button>
                  <button 
                    className="share-btn copy"
                    onClick={() => handleShare('copy')}
                    aria-label="Copy link"
                  >
                    <i className="fas fa-link"></i>
                  </button>
                </div>
              </motion.div>

              {/* Table of Contents */}
              {tocHeadings.length > 0 && (
                <motion.div
                  className="sidebar-toc"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="sidebar-title">In this Article</h4>
                  <nav className="toc-nav">
                    <ul className="toc-list">
                      {tocHeadings.map((heading, index) => (
                        <li 
                          key={index}
                          className={`toc-item ${heading.level === 'h3' ? 'toc-sub' : ''} ${activeSection === heading.text ? 'active' : ''}`}
                        >
                          <a 
                            href={`#${heading.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const target = document.getElementById(heading.text.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                              if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            <span className="toc-marker"></span>
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              )}

              {/* Keyword */}
              {blog.targetKeyword && (
                <motion.div
                  className="sidebar-keyword"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="keyword-pill">
                    <i className="fas fa-key"></i>
                    <span>Target: {blog.targetKeyword}</span>
                  </div>
                </motion.div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Articles ──────────────────────────────────────────────── */}
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
                         item.metaDescription?.substring(0, 80) || 
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
                  Want to see how these hiring insights can be leveraged for your team?
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