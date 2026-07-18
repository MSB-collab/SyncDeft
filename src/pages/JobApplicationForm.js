// JobApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './JobApplicationForm.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const JobApplicationForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    coverLetter: ''
  });

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
      console.log('Fetching job details from:', `${API_BASE_URL}/jobs/${slug}`);
      
      const response = await fetch(`${API_BASE_URL}/jobs/${slug}`);
      
      if (!response.ok) {
        throw new Error('The job opening you are applying for could not be found.');
      }
      
      const data = await response.json();
      console.log('Job details fetched:', data);
      setJob(data);
    } catch (err) {
      console.error('Error fetching job details for application:', err);
      setError(err.message || 'Error loading job details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeError('');
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      const isValidExt = ['pdf', 'doc', 'docx'].includes(ext);
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isValidExt) {
        setResumeError('Only PDF, DOC, and DOCX files are allowed!');
        setResumeFile(null);
        e.target.value = null;
        return;
      }
      if (!isLt5M) {
        setResumeError('File size exceeds 5MB limit.');
        setResumeFile(null);
        e.target.value = null;
        return;
      }

      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;

    if (!resumeFile) {
      setResumeError('Resume file is required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('jobId', job._id);
      submitData.append('jobTitle', job.title);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('linkedin', formData.linkedin);
      submitData.append('portfolio', formData.portfolio);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('resume', resumeFile);

      console.log('Submitting application to:', `${API_BASE_URL}/applications`);
      
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        console.log('Application submitted successfully');
        setSubmitted(true);
      } else {
        let errorMessage = 'Failed to submit application.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = `Server error (${response.status}): ${response.statusText || 'Unable to process request'}`;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Error submitting job application:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    focus: {
      scale: 1.02,
      borderColor: '#f9c349',
      boxShadow: '0 0 30px rgba(249, 195, 73, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading application form...</p>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <h2>Error loading job opening</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/careers')} className="btn-primary">
          Back to Careers
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <main className="application-success-page">
        <div className="container">
          <motion.div
            className="success-card"
            variants={successVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="success-icon-wrapper">
              <motion.div
                className="success-icon-ring"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: ['0 0 20px rgba(249, 195, 73, 0.2)', '0 0 60px rgba(249, 195, 73, 0.4)', '0 0 20px rgba(249, 195, 73, 0.2)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <i className="fas fa-check-circle"></i>
              </motion.div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Application Submitted Successfully!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for applying for the <strong>{job?.title}</strong> position.
              Our recruitment team will review your application and contact you
              via email or phone if your profile matches our requirements.
            </motion.p>
            <motion.div
              className="success-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => navigate('/careers')}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-briefcase"></i>
                Back to Careers
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="job-application-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="application-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
      />

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="application-hero">
        <div className="application-hero-bg">
          <div className="application-hero-bg-gradient"></div>
          <div className="application-hero-bg-pattern"></div>
        </div>

        <div className="container">
          <motion.div
            className="application-hero-content"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.div
              className="application-breadcrumb"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/careers">Careers</Link>
              <span className="separator">/</span>
              <Link to={`/careers/${slug}`}>{job?.title}</Link>
              <span className="separator">/</span>
              <span className="current">Apply</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="application-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="badge-icon">✦</span>
              <span>Apply Now</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="application-main-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Submit Your Application
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="application-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {job?.title} · {job?.department} · {job?.location}
            </motion.p>

            {/* Gradient Line */}
            <motion.div
              className="application-gradient-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="application-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="#0D0D0D"
              opacity="1"
            />
          </svg>
        </div>
      </section>

      {/* ── Form Section ────────────────────────────────────────────────────── */}
      <section className="application-form-section">
        <div className="container">
          <motion.div
            className="application-form-wrapper"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {error && (
              <motion.div
                className="form-error-alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="application-form">
              <motion.div
                className="form-grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Full Name */}
                <motion.div className="form-group" custom={0} variants={inputVariants}>
                  <label htmlFor="fullName">
                    Full Name <span className="required">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* Email */}
                <motion.div className="form-group" custom={1} variants={inputVariants}>
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john.doe@example.com"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div className="form-group" custom={2} variants={inputVariants}>
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* Location */}
                <motion.div className="form-group" custom={3} variants={inputVariants}>
                  <label htmlFor="location">
                    Location <span className="required">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Austin, TX"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* LinkedIn */}
                <motion.div className="form-group" custom={4} variants={inputVariants}>
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <motion.input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* Portfolio */}
                <motion.div className="form-group" custom={5} variants={inputVariants}>
                  <label htmlFor="portfolio">Portfolio URL</label>
                  <motion.input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://myportfolio.com"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>

                {/* Resume Upload */}
                <motion.div className="form-group full-width" custom={6} variants={inputVariants}>
                  <label htmlFor="resume">
                    Resume Upload <span className="required">*</span>
                    <span className="file-hint">(PDF, DOC, DOCX - Max 5MB)</span>
                  </label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="file-upload-area">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Drop your resume here or click to browse</span>
                    </div>
                  </div>
                  {resumeFile && (
                    <motion.div
                      className="selected-file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <i className="fas fa-file-pdf"></i>
                      <span>{resumeFile.name}</span>
                      <span className="file-size">
                        ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </motion.div>
                  )}
                  {resumeError && (
                    <div className="form-error-text">{resumeError}</div>
                  )}
                </motion.div>

                {/* Cover Letter */}
                <motion.div className="form-group full-width" custom={7} variants={inputVariants}>
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <motion.textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="6"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you are interested in this position and what makes you a great fit..."
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>
              </motion.div>

              {/* Form Actions */}
              <motion.div
                className="form-actions"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={submitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Submit Application
                    </>
                  )}
                </motion.button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to={`/careers/${slug}`} className="btn-secondary cancel-btn">
                    Cancel
                  </Link>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="application-cta">
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
                <span className="cta-badge">Questions?</span>
                <h2>Need Help With Your Application?</h2>
                <p>
                  If you have any questions about the application process or
                  the role, feel free to reach out to our recruitment team.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn-primary cta-btn">
                    <i className="fas fa-envelope"></i>
                    Contact Recruitment
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

export default JobApplicationForm;