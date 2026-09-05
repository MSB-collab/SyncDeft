// ProjectDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import './ProjectDetail.css';

const API_BASE_URL = 'https://syncdeftserver-production.up.railway.app/api';

const DEFAULT_PROJECT_IMAGE =
  'data:image/svg+xml;utf8,' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">' +
  '<rect width="1200" height="800" fill="%23eef5ff"/>' +
  '<rect x="80" y="90" width="1040" height="620" rx="28" fill="%23ffffff" stroke="%23dbe7f7"/>' +
  '<text x="600" y="400" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="700" fill="%230b63f6">PROJECT PREVIEW</text>' +
  '</svg>';

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_PROJECT_IMAGE;

  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }

  if (imagePath.includes('res.cloudinary.com')) {
    return imagePath.startsWith('//') ? `https:${imagePath}` : imagePath;
  }

  const baseUrl = API_BASE_URL.replace('/api', '');

  if (imagePath.startsWith('/uploads')) {
    return `${baseUrl}${imagePath}`;
  }

  return `${baseUrl}/${imagePath.replace(/^\/+/, '')}`;
};

const handleImageError = (event) => {
  if (!event?.currentTarget) return;
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_PROJECT_IMAGE;
};

const safeArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return [];
};

const getGallery = (project) => {
  const sources = [
    project?.gallery,
    project?.images,
    project?.screenshots,
    project?.projectImages,
  ];

  for (const source of sources) {
    const items = safeArray(source);
    if (items.length) {
      return items
        .map((item) => {
          if (typeof item === 'string') return item;
          return item?.url || item?.image || item?.src || item?.path || '';
        })
        .filter(Boolean);
    }
  }

  return project?.image ? [project.image] : [];
};

const getFeatureList = (project) => {
  const features = safeArray(project?.features || project?.keyFeatures);

  return features.map((feature, index) => {
    if (typeof feature === 'string') {
      return {
        title: feature,
        description: 'Designed to provide a simple, reliable and user-friendly experience.',
        icon: ['fa-tags', 'fa-plane', 'fa-book-open', 'fa-calendar-days', 'fa-briefcase', 'fa-file-lines'][index % 6],
      };
    }

    return {
      title: feature?.title || feature?.name || `Feature ${index + 1}`,
      description:
        feature?.description ||
        feature?.desc ||
        'A core feature designed around the needs of the users.',
      icon: feature?.icon || ['fa-tags', 'fa-plane', 'fa-book-open', 'fa-calendar-days', 'fa-briefcase', 'fa-file-lines'][index % 6],
    };
  });
};

const getMetricList = (project) => {
  const metrics = safeArray(project?.metrics || project?.stats || project?.resultsStats);

  return metrics
    .map((metric) => {
      if (typeof metric === 'string') return { value: metric, label: '' };
      return {
        value: metric?.value || metric?.number || metric?.stat || '',
        label: metric?.label || metric?.title || metric?.name || '',
      };
    })
    .filter((metric) => metric.value || metric.label)
    .slice(0, 4);
};

const getServices = (project) => {
  const services = safeArray(project?.services || project?.servicesProvided);
  return services.length
    ? services
    : ['UI/UX Design', 'Development', 'Testing', 'Deployment', 'Maintenance'];
};

const getPlatforms = (project) => {
  const platforms = safeArray(project?.platforms || project?.platform);
  if (platforms.length) return platforms.join(', ');
  return project?.type || project?.projectType || 'Web Application';
};

const formatDate = (value) => {
  if (!value) return 'Ongoing';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_BASE_URL}/projects`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const projects = Array.isArray(data)
          ? data
          : Array.isArray(data?.projects)
            ? data.projects
            : [];

        const foundProject = projects.find(
          (item) => item?._id === slug || item?.slug === slug
        );

        if (!foundProject) {
          throw new Error('Project not found');
        }

        if (cancelled) return;

        setProject(foundProject);

        const related = projects
          .filter(
            (item) =>
              item?._id !== foundProject?._id &&
              item?.slug !== foundProject?.slug &&
              (!foundProject?.category || item?.category === foundProject?.category)
          )
          .slice(0, 3);

        setRelatedProjects(related);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading project details:', err);
          setError(err?.message || 'Error loading project.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjectDetails();
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const gallery = useMemo(() => getGallery(project), [project]);
  const features = useMemo(() => getFeatureList(project), [project]);
  const metrics = useMemo(() => getMetricList(project), [project]);
  const services = useMemo(() => getServices(project), [project]);

  const technologies = safeArray(project?.technologies);

  const overviewText =
    project?.overview ||
    project?.description ||
    'A thoughtfully designed digital product built to solve real business needs and deliver a smooth user experience.';

  const challengeText =
    project?.challenge ||
    'Users needed a simpler and more unified way to access the most important services and information without switching between multiple platforms.';

  const solutionText =
    project?.solution ||
    'We designed and developed a clean, scalable and user-friendly platform that brings the core experience into one connected digital product.';

  const resultsText =
    project?.results ||
    'The final product delivers a faster, clearer and more engaging experience with a scalable foundation for future growth.';

  if (loading) {
    return (
      <div className="project-state-screen">
        <div className="project-loader" />
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-state-screen project-error-screen">
        <div className="state-icon">
          <i className="fas fa-exclamation" />
        </div>
        <h2>Project not found</h2>
        <p>{error || 'The requested project could not be found.'}</p>
        <button className="case-btn case-btn-primary" onClick={() => navigate('/projects')}>
          <i className="fas fa-arrow-left" />
          Back to Projects
        </button>
      </div>
    );
  }

  const heroImage = getImageUrl(project.image);
  const phoneImage = getImageUrl(gallery[1] || project.image);

  return (
    <main className="project-detail-page">
      {/* HERO */}
      <section className="case-hero">
        <div className="case-hero-shape case-shape-one" />
        <div className="case-hero-shape case-shape-two" />

        <div className="case-container">
          <motion.div
            className="case-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/projects">Projects</Link>
            <span>›</span>
            <span className="breadcrumb-current">{project.title}</span>
          </motion.div>

          <div className="case-hero-grid">
            <motion.div
              className="case-hero-copy"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="featured-label">
                <span className="featured-dot" />
                FEATURED PROJECT
              </div>

              <h1>{project.title}</h1>

              <p className="hero-lead">
                {project.shortDescription ||
                  project.tagline ||
                  project.description ||
                  'A modern digital product designed to connect people, services and opportunities.'}
              </p>

              <div className="hero-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-btn case-btn-primary"
                  >
                    View Live Project
                    <i className="fas fa-arrow-up-right-from-square" />
                  </a>
                )}

                <Link to="/contact" className="case-btn case-btn-outline">
                  View Case Study
                  <i className="fas fa-download" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="case-device-scene"
              initial={{ opacity: 0, x: 35, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <div className="browser-mockup">
                <div className="browser-topbar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="browser-address">
                    {project.liveUrl || 'project-preview.app'}
                  </div>
                  <div className="browser-controls">
                    <i className="fas fa-ellipsis" />
                  </div>
                </div>

                <div className="browser-screen">
                  <img
                    src={heroImage}
                    alt={`${project.title} preview`}
                    onError={handleImageError}
                  />
                </div>
              </div>

              <motion.div
                className="phone-mockup"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.45 }}
              >
                <div className="phone-speaker" />
                <div className="phone-screen">
                  <img
                    src={phoneImage}
                    alt={`${project.title} mobile preview`}
                    onError={handleImageError}
                  />
                </div>
                <div className="phone-home-bar" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CASE STUDY */}
      <section className="case-main">
        <div className="case-container">
          <div className="case-content-grid">
            <div className="case-primary-content">
              {/* OVERVIEW + CHALLENGE */}
              <div className="overview-challenge-grid">
                <motion.article
                  className="content-block"
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="content-heading">
                    <span className="heading-icon blue-icon">
                      <i className="fas fa-file-lines" />
                    </span>
                    <h2>Overview</h2>
                  </div>
                  <p>{overviewText}</p>
                </motion.article>

                <motion.article
                  className="content-block"
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="content-heading">
                    <span className="heading-icon red-icon">
                      <i className="fas fa-bullseye" />
                    </span>
                    <h2>The Challenge</h2>
                  </div>
                  <p>{challengeText}</p>
                </motion.article>
              </div>

              {/* SOLUTION */}
              <motion.article
                className="content-block solution-content-block"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="content-heading">
                  <span className="heading-icon green-icon">
                    <i className="fas fa-lightbulb" />
                  </span>
                  <h2>Our Solution</h2>
                </div>
                <p>{solutionText}</p>
              </motion.article>

              {/* FEATURES */}
              {features.length > 0 && (
                <motion.section
                  className="case-section"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={stagger}
                >
                  <div className="section-heading-row">
                    <div className="section-heading-left">
                      <span className="section-heading-icon blue-icon">
                        <i className="fas fa-sparkles" />
                      </span>
                      <h2>Key Features</h2>
                    </div>
                  </div>

                  <div className="feature-grid">
                    {features.slice(0, 6).map((feature, index) => (
                      <motion.div
                        className="feature-card"
                        key={`${feature.title}-${index}`}
                        variants={reveal}
                        whileHover={{ y: -5 }}
                      >
                        <div className="feature-card-icon">
                          <i className={`fas ${feature.icon.replace(/^fa-solid\s+/, '')}`} />
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* TECHNOLOGY */}
              {technologies.length > 0 && (
                <motion.section
                  className="case-section technology-section"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="section-heading-row">
                    <div className="section-heading-left">
                      <span className="section-heading-icon blue-icon">
                        <i className="fas fa-code" />
                      </span>
                      <h2>Technology Stack</h2>
                    </div>
                  </div>

                  <div className="tech-groups">
                    <div className="tech-group">
                      <span className="tech-group-title">Technologies</span>
                      <div className="tech-list">
                        {technologies.map((tech, index) => (
                          <motion.div
                            className="tech-pill"
                            key={`${tech}-${index}`}
                            whileHover={{ y: -3 }}
                          >
                            {renderTechBadge(tech)}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* RESULTS */}
              <motion.section
                className="case-section results-section"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="section-heading-row">
                  <div className="section-heading-left">
                    <span className="section-heading-icon blue-icon">
                      <i className="fas fa-chart-line" />
                    </span>
                    <h2>Results / Impact</h2>
                  </div>
                </div>

                {metrics.length > 0 && (
                  <div className="metrics-grid">
                    {metrics.map((metric, index) => (
                      <div className="metric-card" key={`${metric.value}-${index}`}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="results-copy">{resultsText}</p>
              </motion.section>

              {/* GALLERY */}
              {gallery.length > 0 && (
                <motion.section
                  className="case-section gallery-section"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                >
                  <div className="section-heading-row">
                    <div className="section-heading-left">
                      <span className="section-heading-icon blue-icon">
                        <i className="fas fa-images" />
                      </span>
                      <h2>Project Gallery</h2>
                    </div>
                  </div>

                  <div className="gallery-grid">
                    {gallery.slice(0, 6).map((image, index) => (
                      <div className={`gallery-item gallery-item-${index + 1}`} key={`${image}-${index}`}>
                        <img
                          src={getImageUrl(image)}
                          alt={`${project.title} screen ${index + 1}`}
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="case-sidebar">
              <div className="info-card">
                <div className="info-card-title">
                  <span>PROJECT INFORMATION</span>
                </div>

                <div className="info-list">
                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-graduation-cap" />
                    </span>
                    <div>
                      <small>Industry</small>
                      <strong>{project.industry || 'Technology'}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-building" />
                    </span>
                    <div>
                      <small>Project Type</small>
                      <strong>{project.projectType || project.type || 'Web & Mobile Application'}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-desktop" />
                    </span>
                    <div>
                      <small>Platform</small>
                      <strong>{getPlatforms(project)}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-calendar-days" />
                    </span>
                    <div>
                      <small>Duration</small>
                      <strong>{project.duration || '4 Months'}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-users" />
                    </span>
                    <div>
                      <small>Team</small>
                      <strong>{project.team || 'Our Product Team'}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-circle-check" />
                    </span>
                    <div>
                      <small>Project Status</small>
                      <span className="status-badge">
                        {project.status || 'Live'}
                      </span>
                    </div>
                  </div>

                  {project.liveUrl && (
                    <div className="info-row">
                      <span className="info-row-icon">
                        <i className="fas fa-link" />
                      </span>
                      <div>
                        <small>Live Project</small>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="live-project-link"
                        >
                          {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          <i className="fas fa-arrow-up-right-from-square" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-layer-group" />
                    </span>
                    <div>
                      <small>Services Provided</small>
                      <strong>{services.join(', ')}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="info-row-icon">
                      <i className="fas fa-clock" />
                    </span>
                    <div>
                      <small>Completed</small>
                      <strong>{formatDate(project.completionDate)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {project.client && (
                <div className="client-card">
                  <span className="client-label">CLIENT</span>
                  <strong>{project.client}</strong>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="related-section">
          <div className="case-container">
            <div className="related-heading">
              <span className="mini-label">MORE WORK</span>
              <h2>Related <span>Projects</span></h2>
            </div>

            <div className="related-grid">
              {relatedProjects.map((related) => (
                <motion.article
                  className="related-card"
                  key={related._id || related.slug}
                  whileHover={{ y: -7 }}
                  onClick={() => navigate(`/projects/${related.slug || related._id}`)}
                >
                  <div className="related-image">
                    <img
                      src={getImageUrl(related.image)}
                      alt={related.title}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  <div className="related-content">
                    <span>{related.category || 'Project'}</span>
                    <h3>{related.title}</h3>
                    <p>{related.description?.substring(0, 100) || 'Explore this project.'}</p>
                    <div className="related-link">
                      View Project <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="case-cta">
        <div className="case-container">
          <motion.div
            className="cta-panel"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cta-rocket">
              <i className="fas fa-rocket" />
            </div>
            <div className="cta-copy">
              <h2>Have a similar project in mind?</h2>
              <p>Let's build something amazing together!</p>
            </div>
            <Link to="/contact" className="cta-button">
              Let's Talk
              <i className="fas fa-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
