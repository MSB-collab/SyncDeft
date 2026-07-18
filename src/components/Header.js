// Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import logo from '../assets/syncdeft.png';
import './Header.css';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
    fetchCaseStudies();
    fetchJobs();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects for header...');
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(Array.isArray(data) ? data.slice(0, 4) : []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      console.log('Fetching blogs for header...');
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data.slice(0, 4) : []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchCaseStudies = async () => {
    try {
      console.log('Fetching case studies for header...');
      const response = await fetch(`${API_BASE_URL}/case-studies`);
      if (response.ok) {
        const data = await response.json();
        setCaseStudies(Array.isArray(data) ? data.slice(0, 3) : []);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs for header...');
      const response = await fetch(`${API_BASE_URL}/jobs`);
      if (response.ok) {
        const data = await response.json();
        setJobs(Array.isArray(data) ? data.slice(0, 3) : []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileAccordion(null);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const handleDropdownHover = (dropdown) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (key) => {
    setOpenMobileAccordion(openMobileAccordion === key ? null : key);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const services = servicesData;

  return (
    <>
      <header 
        ref={headerRef} 
        className={`header ${isScrolled ? 'scrolled' : ''}`}
      >
        {/* Background Elements */}
        <div className="header-half-white-bg"></div>
        <div className="header-bg-glow">
          <div className="header-glow-orb orb-1"></div>
          <div className="header-glow-orb orb-2"></div>
        </div>

        {/* Floating Particles */}
        <div className="header-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                width: 2 + Math.random() * 4,
                height: 1 + Math.random() * 3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 40, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="container">
          <nav className="nav">
            {/* Logo */}
            <div className="logo" onClick={() => navigate('/')}>
              <div className="logo-container">
                <img src={logo} alt="SYNC DEFT" className="logo-image" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="nav-links desktop-only">
              <li>
                <Link 
                  to="/" 
                  className={isActive('/') ? 'active-nav-link' : ''}
                >
                  <span className="nav-link-text">Home</span>
                  {isActive('/') && <span className="nav-hover-underline"></span>}
                </Link>
              </li>

              <li>
                <Link 
                  to="/services" 
                  className={isActive('/services') ? 'active-nav-link' : ''}
                >
                  <span className="nav-link-text">Services</span>
                  {isActive('/services') && <span className="nav-hover-underline"></span>}
                </Link>
              </li>

              <li>
                <Link 
                  to="/projects" 
                  className={isActive('/projects') ? 'active-nav-link' : ''}
                >
                  <span className="nav-link-text">Projects</span>
                  {isActive('/projects') && <span className="nav-hover-underline"></span>}
                </Link>
              </li>

              {/* Insights Dropdown */}
              <li 
                className="dropdown-trigger-wrapper"
                onMouseEnter={() => handleDropdownHover('insights')}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  className={`dropdown-trigger-label ${isActive('/blogs') || isActive('/case-studies') ? 'active-nav-link' : ''}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="nav-link-text">Insights</span>
                </button>

                <AnimatePresence>
                  {openDropdown === 'insights' && (
                    <motion.div 
                      className="mega-menu-dropdown insights-mega-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      onMouseEnter={() => handleDropdownHover('insights')}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="insights-dropdown-grid">
                        {/* Blogs Section */}
                        <div className="insights-section">
                          <h3>
                            <i className="fas fa-newspaper"></i>
                            <Link to="/blogs" className="insights-view-all" onClick={() => setOpenDropdown(null)}>
                              Blogs
                            </Link>
                          </h3>
                          
                        </div>

                        {/* Case Studies Section */}
                        <div className="insights-section">
                          <h3>
                            <i className="fas fa-briefcase"></i>
                            <Link to="/case-studies" className="insights-view-all" onClick={() => setOpenDropdown(null)}>
                              Case Studies
                            </Link>
                          </h3>
                          
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link 
                  to="/about" 
                  className={isActive('/about') ? 'active-nav-link' : ''}
                >
                  <span className="nav-link-text">About</span>
                  {isActive('/about') && <span className="nav-hover-underline"></span>}
                </Link>
              </li>

              {/* Career Link */}
              <li>
                <Link 
                  to="/careers" 
                  className={isActive('/careers') ? 'active-nav-link' : ''}
                >
                  <span className="nav-link-text">Careers</span>
                  {isActive('/careers') && <span className="nav-hover-underline"></span>}
                </Link>
              </li>

              

              <li>
                <button 
                  className="get-started-btn"
                  onClick={() => navigate('/contact')}
                >
                  <span>Get Started</span>
                  <motion.i 
                    className="fas fa-arrow-right btn-icon"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </button>
              </li>
            </ul>

            {/* Hamburger Menu */}
            <button 
              className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.ul 
                  className="nav-links mobile-menu"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <li>
                    <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                  </li>

                  <li>
                    <Link to="/services" onClick={toggleMobileMenu}>Services</Link>
                  </li>

                  <li>
                    <Link to="/projects" onClick={toggleMobileMenu}>Projects</Link>
                  </li>

                  {/* Mobile Insights Accordion */}
                  <li className="mobile-accordion-li">
                    <div 
                      className="mobile-accordion-header"
                      onClick={() => toggleMobileAccordion('insights')}
                    >
                      <span>Insights</span>
                      <motion.i 
                        className={`fas fa-chevron-${openMobileAccordion === 'insights' ? 'up' : 'down'} accordion-arrow ${openMobileAccordion === 'insights' ? 'rotated' : ''}`}
                      />
                    </div>
                    <AnimatePresence>
                      {openMobileAccordion === 'insights' && (
                        <motion.ul 
                          className="mobile-accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <li>
                            <Link to="/blogs" onClick={toggleMobileMenu}>Blogs</Link>
                          </li>
                          <li>
                            <Link to="/case-studies" onClick={toggleMobileMenu}>Case Studies</Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <Link to="/about" onClick={toggleMobileMenu}>About</Link>
                  </li>

                  <li>
                    <Link to="/careers" onClick={toggleMobileMenu}>Careers</Link>
                  </li>

                  <li>
                    <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
                  </li>

                  <li>
                    <button 
                      className="get-started-btn mobile-btn"
                      onClick={() => {
                        toggleMobileMenu();
                        navigate('/contact');
                      }}
                    >
                      Get Started
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
      <div className="header-spacer"></div>
    </>
  );
};

export default Header;