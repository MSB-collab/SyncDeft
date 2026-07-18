// CareersSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SkeletonGrid } from './SkeletonLoader';
import './CareersSection.css';

// Direct API URL without env (for reference, though this component receives jobs as props)
// The jobs are passed from parent component which fetches from API

const CareersSection = ({ loading, jobs }) => {
  const navigate = useNavigate();

  // Premium animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Premium animation variants for items
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: 'spring', 
        stiffness: 90, 
        damping: 14,
        duration: 0.7
      }
    }
  };

  // Section header animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  // Get job type icon
  const getJobTypeIcon = (type) => {
    const icons = {
      'full-time': 'fa-clock',
      'part-time': 'fa-hourglass-half',
      'contract': 'fa-file-contract',
      'remote': 'fa-globe',
      'internship': 'fa-graduation-cap',
      'freelance': 'fa-user-tie',
      'hybrid': 'fa-building'
    };
    return icons[type?.toLowerCase()] || 'fa-briefcase';
  };

  // Format job description with fallback
  const getJobDescription = (job) => {
    if (job.description) {
      // If description is long, truncate it
      return job.description.length > 120 
        ? job.description.substring(0, 120) + '...' 
        : job.description;
    }
    if (job.summary) {
      return job.summary.length > 120 
        ? job.summary.substring(0, 120) + '...' 
        : job.summary;
    }
    return 'Join our team and work on cutting-edge projects with modern technologies.';
  };

  // Get department with fallback
  const getDepartment = (job) => {
    return job.department || job.dept || 'Engineering';
  };

  // Get location with fallback
  const getLocation = (job) => {
    return job.location || 'Remote';
  };

  // Get experience level with fallback
  const getExperienceLevel = (job) => {
    return job.experienceLevel || job.experience || 'Mid-Level';
  };

  // Get job type with fallback
  const getJobType = (job) => {
    return job.type || job.jobType || 'Full-Time';
  };

  // Get job title with fallback
  const getJobTitle = (job) => {
    return job.title || 'Position Available';
  };

  if (loading) {
    return (
      <section className="home-careers">
        <div className="container">
          <div className="section-header-careers">
            <h2 className="section-title text-center">Career Opportunities</h2>
            <div className="section-title-underline-careers"></div>
            <p className="section-subtitle text-center">
              Join our fast-growing engineering and design teams.
            </p>
          </div>
          <SkeletonGrid type="career" count={3} />
        </div>
      </section>
    );
  }

  // Ensure jobs is an array
  const jobsArray = Array.isArray(jobs) ? jobs : [];
  
  // Filter for open jobs only
  const openJobs = jobsArray.filter(job => {
    const isActive = job.activeJob !== false;
    const isOpen = job.status === 'Open' || job.status === undefined || job.status === null;
    return isActive && isOpen;
  });

  // Display only 3 jobs
  const displayJobs = openJobs.slice(0, 3);

  if (displayJobs.length === 0) return null;

  return (
    <section className="home-careers">
      {/* Animated Background Orbs */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="container">
        <motion.div
          className="section-header-careers"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              type: 'spring',
              stiffness: 80,
              damping: 15
            }}
          >
            Career <span className="highlight-careers">Opportunities</span>
          </motion.h2>

          <motion.div
            className="section-title-underline-careers"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
          />
          
          <motion.p 
            className="section-subtitle text-center"
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join our fast-growing engineering and design teams.
          </motion.p>
        </motion.div>

        <motion.div
          className="jobs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayJobs.map((job, index) => (
            <motion.div
              key={job._id || index}
              className="job-card"
              variants={itemVariants}
              onClick={() => navigate(`/careers/${job._id}`)}
              style={{ cursor: 'pointer' }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                transition: { 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Job Icon Background */}
              <div className="job-icon"></div>

              <div className="job-header">
                <motion.h3
                  whileHover={{ 
                    color: '#E5B63E',
                    x: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {getJobTitle(job)}
                </motion.h3>
                <motion.span 
                  className={`job-type ${getJobType(job).toLowerCase().replace(' ', '-')}`}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <i className={`fas ${getJobTypeIcon(getJobType(job))}`} style={{ marginRight: '4px' }}></i>
                  {getJobType(job)}
                </motion.span>
              </div>

              <div className="job-details">
                <motion.span
                  whileHover={{ 
                    color: '#E5B63E',
                    transition: { duration: 0.3 }
                  }}
                >
                  <i className="fas fa-building"></i> {getDepartment(job)}
                </motion.span>
                <motion.span
                  whileHover={{ 
                    color: '#E5B63E',
                    transition: { duration: 0.3 }
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i> {getLocation(job)}
                </motion.span>
                <motion.span
                  whileHover={{ 
                    color: '#E5B63E',
                    transition: { duration: 0.3 }
                  }}
                >
                  <i className="fas fa-briefcase"></i> {getExperienceLevel(job)}
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0.8 }}
                whileHover={{ 
                  color: 'rgba(255,255,255,0.8)',
                  transition: { duration: 0.3 }
                }}
              >
                {getJobDescription(job)}
              </motion.p>

              <div className="job-card-footer">
                <motion.button
                  className="apply-btn"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    navigate(`/careers/${job._id}`); 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    x: 6,
                    boxShadow: '0 8px 30px rgba(229, 182, 62, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now 
                  <motion.span 
                    className="btn-arrow"
                    whileHover={{ x: 6 }}
                  >
                    &rarr;
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center section-action">
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/careers')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              delay: 0.5,
              type: 'spring',
              stiffness: 80,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              y: -3,
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Opportunities
            <motion.span 
              className="btn-arrow"
              whileHover={{ x: 8 }}
            >
              &rarr;
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;