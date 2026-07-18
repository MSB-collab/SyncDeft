// src/pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import FeaturedProjects from '../components/FeaturedProjects';
import WhyChoose from '../components/WhyChoose';
import IndustriesSection from '../components/IndustriesSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import TrustedBySection from '../components/TrustedBySection';
import LatestBlogs from '../components/LatestBlogs';
import TestimonialsSection from '../components/TestimonialsSection';
import CareersSection from '../components/CareersSection';
import CTASection from '../components/CTASection';
import './Home.css';
import CaseStudies from './CaseStudies';
import Template from '../components/Template';
import Proof from '../components/Proof';

// Direct API URL without env
const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

// Fallback projects data - will show if API fails
const FALLBACK_PROJECTS = [
  {
    _id: 'fallback-1',
    title: 'E-Commerce Platform Development',
    description: 'Modern e-commerce platform with advanced features and seamless user experience.',
    category: 'Web Development',
    image: 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=E-Commerce',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    _id: 'fallback-2',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile application with intuitive design and real-time features.',
    category: 'Mobile App',
    image: 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=Mobile+App',
    techStack: ['React Native', 'Firebase', 'Redux', 'Node.js']
  },
  {
    _id: 'fallback-3',
    title: 'AI Solution for Business',
    description: 'Intelligent AI solution that automates business processes and provides insights.',
    category: 'AI Solution',
    image: 'https://via.placeholder.com/600x400/1a1a2e/E5B63E?text=AI+Solution',
    techStack: ['Python', 'TensorFlow', 'Docker', 'AWS']
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const homeRef = useRef(null);

  // Auto-scroll to top on component mount and reload
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    if (homeRef.current) {
      homeRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      if (homeRef.current) {
        homeRef.current.scrollTop = 0;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching home page data from API:', API_BASE_URL);
      
      // Use direct API URL with timeout
      const fetchWithTimeout = (url, timeout = 8000) => {
        return Promise.race([
          fetch(url),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          )
        ]);
      };

      const [projectsRes, blogsRes, jobsRes, testimonialsRes] = await Promise.all([
        fetchWithTimeout(`${API_BASE_URL}/projects/featured`),
        fetchWithTimeout(`${API_BASE_URL}/blogs`),
        fetchWithTimeout(`${API_BASE_URL}/jobs/featured`),
        fetchWithTimeout(`${API_BASE_URL}/testimonials?featured=true`)
      ]);

      // Parse responses with error handling
      let projectsData = FALLBACK_PROJECTS;
      let blogsData = [];
      let jobsData = [];
      let testimonialsData = [];

      // Projects - Use fallback if API fails
      try {
        if (projectsRes && projectsRes.ok) {
          const data = await projectsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            projectsData = data;
            console.log(`Fetched ${data.length} projects from API`);
            // Log each project image for debugging
            data.forEach((p, i) => {
              console.log(`Project ${i+1}: ${p.title}, image: ${p.image || 'No image'}`);
            });
          } else {
            console.warn('Projects API returned empty or invalid data, using fallback');
            projectsData = FALLBACK_PROJECTS;
          }
        } else {
          console.warn(`Projects API failed (${projectsRes?.status || 'unknown'}), using fallback`);
          projectsData = FALLBACK_PROJECTS;
        }
      } catch (e) {
        console.error('Error fetching projects:', e);
        projectsData = FALLBACK_PROJECTS;
      }

      // Blogs
      try {
        if (blogsRes && blogsRes.ok) {
          const data = await blogsRes.json();
          if (Array.isArray(data)) {
            blogsData = data;
            console.log(`Fetched ${data.length} blogs`);
          }
        }
      } catch (e) {
        console.error('Error fetching blogs:', e);
        blogsData = [];
      }

      // Jobs
      try {
        if (jobsRes && jobsRes.ok) {
          const data = await jobsRes.json();
          if (Array.isArray(data)) {
            jobsData = data;
            console.log(`Fetched ${data.length} jobs`);
          }
        }
      } catch (e) {
        console.error('Error fetching jobs:', e);
        jobsData = [];
      }

      // Testimonials
      try {
        if (testimonialsRes && testimonialsRes.ok) {
          const data = await testimonialsRes.json();
          if (Array.isArray(data)) {
            testimonialsData = data;
            console.log(`Fetched ${data.length} testimonials`);
          }
        }
      } catch (e) {
        console.error('Error fetching testimonials:', e);
        testimonialsData = [];
      }

      // Set state
      setProjects(projectsData);
      setTestimonials(testimonialsData.slice(0, 3));
      
      // Get featured blogs, or fallback to first 3
      let featuredBlogs = blogsData.filter(b => b.featured === true);
      if (featuredBlogs.length < 3) {
        const nonFeatured = blogsData.filter(b => b.featured !== true);
        featuredBlogs = [...featuredBlogs, ...nonFeatured].slice(0, 3);
      }
      setBlogs(featuredBlogs);
      setJobs(jobsData.slice(0, 3));
      
      console.log('Home page data loaded successfully');
      
    } catch (error) {
      console.error('Error fetching home page data:', error);
      setError('Failed to load data. Using fallback content.');
      // Keep fallback projects
      setProjects(FALLBACK_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  // Handle retry
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchData();
  };

  // If there's an error, show a fallback UI
  if (error) {
    return (
      <div className="home-container" ref={homeRef}>
        <Hero />
        <div className="error-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#f9c349', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto' }}>{error}</p>
          <button 
            onClick={handleRetry} 
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
            Retry Loading
          </button>
        </div>
        {/* Still show featured projects with fallback data */}
        <FeaturedProjects loading={false} projects={FALLBACK_PROJECTS} />
      </div>
    );
  }

  return (
    <div className="home-container" ref={homeRef}>
      <Template/>
      <Hero />
      <ServicesPreview />
      {/* <FeaturedProjects loading={loading} projects={projects} /> */}
      <WhyChoose />
      <CaseStudiesSection />
      <TrustedBySection />
      <LatestBlogs loading={loading} blogs={blogs} />
      <TestimonialsSection loading={loading} testimonials={testimonials} />
      <Proof/>
    </div>
  );
};

export default Home;