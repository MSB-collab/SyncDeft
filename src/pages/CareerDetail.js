// CareerDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CareerDetail.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const CareerDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchJobDetails();
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

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching job details from API:', `${API_BASE_URL}/jobs/${slug}`);
      
      const response = await fetch(`${API_BASE_URL}/jobs/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Job opening not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data._id) {
        throw new Error('Invalid job data received');
      }
      
      setJob(data);
      console.log('Job fetched successfully:', data.title);
    } catch (err) {
      console.error('Error loading job details:', err);
      setError(err.message || 'Error loading job opening.');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced Benefits with icons and descriptions
  const getJobBenefits = () => {
    const defaultBenefits = [
      { 
        icon: 'fa-heart', 
        title: 'Health & Wellness',
        description: 'Comprehensive health, dental, and vision insurance options for you and your family.'
      },
      { 
        icon: 'fa-coins', 
        title: 'Financial Security',
        description: '401(k) retirement plan with corporate matching contributions and competitive compensation.'
      },
      { 
        icon: 'fa-laptop-house', 
        title: 'Work Anywhere',
        description: 'Flexible remote-first work environment with home office stipends and equipment provided.'
      },
      { 
        icon: 'fa-umbrella-beach', 
        title: 'Work-Life Balance',
        description: 'Generous paid time off (PTO), flexible hours, and observed annual holidays.'
      },
      { 
        icon: 'fa-graduation-cap', 
        title: 'Learning & Growth',
        description: 'Ongoing learning budgets for professional courses, certifications, and conferences.'
      },
      { 
        icon: 'fa-users', 
        title: 'Great Culture',
        description: 'Collaborative team environment with regular social events and team building activities.'
      }
    ];

    if (job?.benefits) {
      if (typeof job.benefits === 'string') {
        const benefitsArray = job.benefits.split('\n').filter(b => b.trim());
        return benefitsArray.map((benefit, index) => ({
          icon: defaultBenefits[index % defaultBenefits.length].icon,
          title: benefit.split(':')[0]?.trim() || `Benefit ${index + 1}`,
          description: benefit.split(':')[1]?.trim() || benefit
        }));
      }
      if (Array.isArray(job.benefits)) {
        return job.benefits.map((benefit, index) => ({
          icon: defaultBenefits[index % defaultBenefits.length].icon,
          title: typeof benefit === 'string' ? benefit : benefit.title || `Benefit ${index + 1}`,
          description: typeof benefit === 'string' ? benefit : benefit.description || benefit
        }));
      }
    }
    
    return defaultBenefits;
  };

  // Format responsibilities
  const getResponsibilities = () => {
    if (job?.responsibilities) {
      if (typeof job.responsibilities === 'string') {
        return job.responsibilities.split('\n').filter(r => r.trim());
      }
      if (Array.isArray(job.responsibilities)) {
        return job.responsibilities;
      }
    }
    return [
      'Collaborate with cross-functional teams to deliver high-quality solutions.',
      'Participate in the full software development lifecycle from planning to deployment.',
      'Write clean, maintainable, and efficient code following best practices.',
      'Troubleshoot, debug, and optimize existing systems and applications.',
      'Stay current with emerging technologies and industry trends.'
    ];
  };

  // Format requirements
  const getRequirements = () => {
    if (job?.requirements) {
      if (typeof job.requirements === 'string') {
        return job.requirements.split('\n').filter(r => r.trim());
      }
      if (Array.isArray(job.requirements)) {
        return job.requirements;
      }
    }
    return [
      'Bachelor\'s degree in Computer Science, Engineering, or related field.',
      '3+ years of experience in software development or related role.',
      'Strong knowledge of modern programming languages and frameworks.',
      'Excellent problem-solving and analytical skills.',
      'Strong communication and teamwork abilities.'
    ];
  };

  const jobBenefits = getJobBenefits();
  const responsibilities = getResponsibilities();
  const requirements = getRequirements();

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

  const staggerBenefits = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const benefitCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 60px rgba(249, 195, 73, 0.15)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <i className="fas fa-spinner"></i>
        </motion.div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Error loading job opening</h2>
        <p>{error || 'The requested career opportunity could not be found.'}</p>
        <button onClick={() => navigate('/careers')} className="btn-primary">
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <main className="career-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="career-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="career-hero">
        <div className="career-hero-bg">
          <div className="career-hero-bg-gradient"></div>
          <div className="career-hero-bg-pattern"></div>
        </div>

        <div className="container">
          <motion.div
            className="career-hero-content"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.div
              className="career-breadcrumb"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/careers">Careers</Link>
              <span className="separator">/</span>
              <span className="current">{job.title || 'Position'}</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="career-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="badge-icon">✦</span>
              <span>{job.type || 'FULL TIME'}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="career-main-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {job.title || 'Untitled Position'}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              className="career-meta-grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="fas fa-building"></i>
                <span>{job.department || 'General'}</span>
              </motion.div>
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="fas fa-map-marker-alt"></i>
                <span>{job.location || 'Remote'}</span>
              </motion.div>
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="fas fa-graduation-cap"></i>
                <span>{job.experienceLevel || 'Mid-Level'}</span>
              </motion.div>
              {job.salary && (
                <motion.div className="meta-item" variants={fadeInUp}>
                  <i className="fas fa-dollar-sign"></i>
                  <span>{job.salary}</span>
                </motion.div>
              )}
              <motion.div className="meta-item" variants={fadeInUp}>
                <i className="fas fa-calendar-alt"></i>
                <span>Posted: {new Date(job.postedDate || job.createdAt || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </motion.div>
            </motion.div>

            {/* Gradient Line */}
            <motion.div
              className="career-gradient-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            {/* Action Button */}
            <motion.div
              className="career-hero-actions"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/careers/${slug}/apply`} className="btn-primary">
                  <i className="fas fa-paper-plane"></i>
                  Apply Now
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="career-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Job Details ────────────────────────────────────────────────────── */}
      <section className="career-details">
        <div className="container">
          <div className="career-layout">
            {/* Main Content */}
            <motion.div
              className="career-main"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Description */}
              <motion.div className="detail-block" variants={fadeInUp}>
                <span className="block-label">About the Role</span>
                <h2>Role Description</h2>
                <p>{job.description || 'No description available for this position.'}</p>
              </motion.div>

              {/* Responsibilities */}
              <motion.div className="detail-block responsibilities-block" variants={fadeInUp}>
                <span className="block-label">What You'll Do</span>
                <h2>Key Responsibilities</h2>
                <ul className="detail-list">
                  {responsibilities.map((resp, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {resp}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requirements */}
              <motion.div className="detail-block requirements-block" variants={fadeInUp}>
                <span className="block-label">What You'll Need</span>
                <h2>Role Requirements</h2>
                <ul className="detail-list">
                  {requirements.map((req, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Enhanced Benefits Section */}
              <motion.div className="detail-block benefits-block" variants={fadeInUp}>
                <span className="block-label">What We Offer</span>
                <h2>Benefits & Perks</h2>
                <motion.div 
                  className="benefits-grid"
                  variants={staggerBenefits}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {jobBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="benefit-card"
                      variants={benefitCardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredBenefit(index)}
                      onHoverEnd={() => setHoveredBenefit(null)}
                      style={{
                        background: hoveredBenefit === index 
                          ? 'linear-gradient(135deg, rgba(249, 195, 73, 0.12), rgba(245, 166, 35, 0.08))'
                          : 'rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      <motion.div 
                        className="benefit-icon-wrapper"
                        variants={iconVariants}
                      >
                        <i className={`fas ${benefit.icon}`}></i>
                      </motion.div>
                      <div className="benefit-content">
                        <h4>{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </div>
                      <motion.div 
                        className="benefit-hover-effect"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="career-sidebar"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="sidebar-card"
                whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <h3>Ready to Apply?</h3>
                <p>
                  Submit your application today and join our team of innovators.
                  Our recruitment team will review your application within 48 hours.
                </p>

                <div className="sidebar-stats">
                  <div className="stat-item">
                    <span className="stat-number">48hrs</span>
                    <span className="stat-label">Response Time</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Interview Rate</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/careers/${slug}/apply`} className="btn-primary sidebar-btn">
                    <i className="fas fa-paper-plane"></i>
                    Apply Now
                  </Link>
                </motion.div>

                <div className="sidebar-footer">
                  <span className="deadline">
                    <i className="fas fa-clock"></i>
                    {job.applicationDeadline ? (
                      <>Deadline: {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</>
                    ) : (
                      'Open until filled'
                    )}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="career-cta">
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
                <span className="cta-badge">Join Our Team</span>
                <h2>Ready to Make an Impact?</h2>
                <p>
                  Take the next step in your career and join a team that's
                  shaping the future of technology and digital innovation.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/careers" className="btn-primary cta-btn">
                    <i className="fas fa-briefcase"></i>
                    Explore All Careers
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

export default CareerDetail;