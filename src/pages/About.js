// About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonGrid } from '../components/SkeletonLoader';
import Counter from '../components/Counter';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './About.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

// Get the base URL without /api for images
const getImageBaseUrl = () => {
  return API_BASE_URL.replace('/api', '');
};

const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="24" fill="%23475569">User</text></svg>`;
const DEFAULT_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="200" height="60" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23475569">Logo</text></svg>`;

const getTestimonialImageUrl = (imagePath, isLogo = false) => {
  if (!imagePath) return isLogo ? DEFAULT_LOGO : DEFAULT_AVATAR;
  
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

const coreValues = [
  { icon: 'fa-lightbulb', title: 'Innovation', desc: 'Pushing boundaries with creative solutions that redefine industry standards.' },
  { icon: 'fa-handshake', title: 'Integrity', desc: 'Building trust through honesty, transparency, and ethical practices.' },
  { icon: 'fa-users', title: 'Collaboration', desc: 'Working together to achieve excellence and deliver exceptional results.' },
  { icon: 'fa-star', title: 'Excellence', desc: 'Delivering quality in everything we do with unwavering commitment.' },
];

const teamMembers = [
  { 
    name: 'John Doe', 
    role: 'CEO & Founder', 
    bio: 'Visionary leader with 20+ years of experience in technology consulting.',
    avatar: '👨‍💼',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  { 
    name: 'Jane Smith', 
    role: 'CTO', 
    bio: 'Technology innovator specializing in AI and cloud architecture.',
    avatar: '👩‍💻',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'
  },
  { 
    name: 'Mike Johnson', 
    role: 'Head of Consulting', 
    bio: 'Strategic advisor helping enterprises transform through digital innovation.',
    avatar: '👨‍🏫',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  { 
    name: 'Sarah Williams', 
    role: 'VP of Operations', 
    bio: 'Operations expert ensuring excellence in project delivery.',
    avatar: '👩‍💼',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
  },
];

const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchTestimonials();
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

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching testimonials from API:', `${API_BASE_URL}/testimonials?active=true`);
      
      const response = await fetch(`${API_BASE_URL}/testimonials?active=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Testimonials data is not an array:', data);
        setTestimonials([]);
      } else {
        console.log(`Fetched ${data.length} testimonials`);
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials. Please refresh the page.');
      setTestimonials([]);
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

  const valueCardVariants = {
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
      y: -6,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const teamCardVariants = {
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
      y: -6,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const testimonialCardVariants = {
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
      <main className="about-page">
        <div className="about-error-container" style={{ 
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
    <main className="about-page">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="about-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div 
        ref={headerRef}
        className="about-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
      >
        {/* Clean Background Pattern */}
        <div className="about-header-bg">
          <div className="about-header-bg-gradient"></div>
          <div className="about-header-bg-pattern"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="about-floating-icons">
          {['🏢', '💡', '🚀', '🌟', '🎯', '✨'].map((icon, i) => (
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
            className="about-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div 
              className="about-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              <motion.span 
                className="about-pre-pill"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span>ABOUT US</span>
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={pageHeaderTitle}
              className="about-main-heading"
            >
              <span className="heading-light">Empowering <span className="heading-highlight">Digital</span>  <span className="heading-gradient">Transformation</span> </span>
              
             
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={pageHeaderSubtitle} 
              className="about-header-subtitle"
            >
              We are a team of passionate technologists and consultants dedicated 
              to helping businesses thrive in the digital age through innovation 
              and strategic excellence.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div 
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            {/* Stats */}
            <motion.div 
              className="about-stats"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '200+', label: 'Projects Delivered' },
                { number: '98%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  variants={fadeUpVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                >
                  <motion.span 
                    className="stat-number"
                    variants={statNumberVariants}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="about-header-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="about-mission">
        <div className="container">
          <motion.div
            className="mission-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <div className="mission-content">
              <span className="mission-label">Our Purpose</span>
              <h2>Our Mission</h2>
              <p>
                To empower businesses with innovative technology solutions that drive growth,
                efficiency, and competitive advantage in the digital economy.
              </p>
              <h2>Our Vision</h2>
              <p>
                To be the global leader in technology consulting, creating sustainable value for
                clients through digital transformation and strategic innovation.
              </p>
            </div>

            <div className="mission-stats">
              <div className="stat-item">
                <h3><Counter value="2014" duration={1.5} /></h3>
                <p>Founded</p>
              </div>
              <div className="stat-item">
                <h3><Counter value="50+" /></h3>
                <p>Team Members</p>
              </div>
              <div className="stat-item">
                <h3><Counter value="20+" /></h3>
                <p>Countries Served</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="about-values">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide every decision we make.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <motion.div
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {coreValues.map((val, i) => (
              <motion.div
                key={val.title}
                className="value-card"
                custom={i}
                variants={valueCardVariants}
                whileHover="hover"
              >
                <div className="value-icon-wrapper">
                  <i className={`fas ${val.icon}`}></i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
                <div className="value-progress">
                  <span></span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership Team ───────────────────────────────────────────────── */}
      <section className="about-team">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Leadership <span className="text-gradient">Team</span>
            </h2>
            <p className="section-subtitle">
              Visionaries dedicated to shaping the future of technology.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          <motion.div
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-card"
                custom={i}
                variants={teamCardVariants}
                whileHover="hover"
              >
                <div className="team-image-container">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-member-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div className="team-image-overlay">
                    <div className="team-social-links">
                      <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                      <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                      <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className="team-card-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="about-testimonials">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Client Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="section-subtitle">
              What our partners say about working with us.
            </p>
            <div className="section-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>

          {loading ? (
            <SkeletonGrid type="testimonial" count={3} />
          ) : (
            <motion.div
              className="testimonials-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {testimonials.length > 0 ? (
                testimonials.slice(0, 3).map((t, i) => {
                  const imageUrl = getTestimonialImageUrl(t.profileImage);
                  
                  return (
                    <motion.div
                      key={t._id || i}
                      className="testimonial-card"
                      custom={i}
                      variants={testimonialCardVariants}
                      whileHover="hover"
                    >
                      <div className="testimonial-avatar-wrapper">
                        <img
                          src={imageUrl}
                          alt={t.clientName || 'Client'}
                          className="client-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_AVATAR;
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="rating-stars">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <i 
                            key={idx} 
                            className={`fas fa-star ${idx < (t.rating || 5) ? 'active' : 'inactive'}`}
                          />
                        ))}
                      </div>
                      <p className="testimonial-review">"{t.review || 'Great experience working with the team!'}"</p>
                      <div className="testimonial-client-meta">
                        <h4>{t.clientName || 'Happy Client'}</h4>
                        <p className="client-designation">{t.designation || 'Client'}</p>
                        <div className="client-company-row">
                          <span className="company-name">{t.companyName || t.company || 'Company'}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="no-testimonials" style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#94a3b8'
                }}>
                  <p>No testimonials available yet. Check back soon!</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default About;