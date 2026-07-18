// Operational.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Operational.css';
import { FaBuilding, FaUsers, FaChartLine, FaDatabase, FaDollarSign, FaTools } from 'react-icons/fa';
import { GiArtificialIntelligence, GiNetworkBars, GiTargeted } from 'react-icons/gi';
import { MdOutlineSync, MdOutlineDataUsage, MdOutlineSpeed } from 'react-icons/md';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { BsArrowRight, BsGraphUp, BsShieldCheck } from 'react-icons/bs';

const Operational = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('legacy');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const legacyIssues = [
    {
      icon: <FaUsers />,
      title: 'Massive Headcount',
      description: 'Heavy manual overhead driving up retainers and reducing efficiency'
    },
    {
      icon: <FaTools />,
      title: 'Fragmented Tool Stacks',
      description: 'Disconnected data silos causing operational bottlenecks'
    },
    {
      icon: <FaDollarSign />,
      title: 'Inefficient Ad Spend',
      description: 'Expensive ad spend funneled into unoptimized, manual sales flows'
    }
  ];

  const syncSolutions = [
    {
      icon: <GiArtificialIntelligence />,
      title: 'Autonomous AI Workflows',
      description: 'Execute operational tasks 24/7 with intelligent automation'
    },
    {
      icon: <MdOutlineDataUsage />,
      title: 'Unified Data Ecosystems',
      description: 'Custom-built software that unifies your entire database'
    },
    {
      icon: <GiTargeted />,
      title: 'Hyper-Targeted Funnels',
      description: 'Performance funnels optimized by advanced data science'
    }
  ];

  const benefits = [
    {
      icon: <MdOutlineSpeed />,
      title: '3x Faster Operations',
      description: 'Streamlined workflows reduce time-to-market significantly'
    },
    {
      icon: <BsGraphUp />,
      title: '70% Cost Reduction',
      description: 'Automation eliminates unnecessary manual overhead'
    },
    {
      icon: <BsShieldCheck />,
      title: '99.9% Accuracy',
      description: 'AI-driven precision eliminates human errors'
    },
    {
      icon: <HiOutlineLightBulb />,
      title: '24/7 Productivity',
      description: 'Continuous operations without breaks or downtime'
    }
  ];

  return (
    <section className="operational-section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="op-bg-animation">
        <div className="op-particle particle-1"></div>
        <div className="op-particle particle-2"></div>
        <div className="op-particle particle-3"></div>
        <div className="op-particle particle-4"></div>
        <div className="op-particle particle-5"></div>
      </div>

      <div className="operational-container">
        {/* Header */}
        <div className={`op-header ${isVisible ? 'animate-in' : ''}`}>
          <span className="op-badge">
            <BsArrowRight className="badge-icon" />
            PARADIGM SHIFT
          </span>
          <h2 className="op-main-title">
            The Traditional Model is
            <span className="op-highlight"> Costing Your Business.</span>
            <span className="op-subtitle">Shift the Paradigm.</span>
          </h2>
          <div className="op-divider"></div>
        </div>

        {/* Comparison Grid */}
        <div className={`comparison-grid ${isVisible ? 'animate-in' : ''}`}>
          {/* Legacy Model */}
          <div className="comparison-card legacy-card">
            <div className="card-header">
              <div className="card-icon legacy-icon">
                <FaBuilding />
              </div>
              <h3 className="card-title">Fragmentation</h3>
              <span className="card-badge">The Legacy Agency Model</span>
            </div>
            <div className="card-content">
              {legacyIssues.map((issue, index) => (
                <div key={index} className="issue-item">
                  <div className="issue-icon">{issue.icon}</div>
                  <div className="issue-text">
                    <h4>{issue.title}</h4>
                    <p>{issue.description}</p>
                  </div>
                  <div className="issue-line"></div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <span className="cost-tag">💰 High Cost</span>
              <span className="efficiency-tag">⚠️ Low Efficiency</span>
            </div>
          </div>

          {/* VS Divider */}
          <div className="vs-divider">
            <div className="vs-circle">
              <span>VS</span>
            </div>
            <div className="vs-line"></div>
          </div>

          {/* Sync Deft Architecture */}
          <div className="comparison-card sync-card">
            <div className="card-header">
              <div className="card-icon sync-icon">
                <MdOutlineSync />
              </div>
              <h3 className="card-title">Synchronization</h3>
              <span className="card-badge sync-badge">The Sync Deft Architecture</span>
            </div>
            <div className="card-content">
              {syncSolutions.map((solution, index) => (
                <div key={index} className="solution-item">
                  <div className="solution-icon">{solution.icon}</div>
                  <div className="solution-text">
                    <h4>{solution.title}</h4>
                    <p>{solution.description}</p>
                  </div>
                  <div className="solution-line"></div>
                </div>
              ))}
            </div>
            <div className="card-footer sync-footer">
              <span className="cost-tag sync-cost">💎 Optimized Cost</span>
              <span className="efficiency-tag sync-efficiency">🚀 Maximum Efficiency</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`benefits-section ${isVisible ? 'animate-in' : ''}`}>
          <div className="benefits-header">
            <span className="benefits-badge">
              <BsGraphUp className="badge-icon" />
              KEY BENEFITS
            </span>
            <h3>Why Make the Shift?</h3>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <div className="benefit-content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
                <div className="benefit-glow"></div>
              </div>
            ))}
          </div>
        </div>

       

        {/* Decorative Elements */}
        <div className="op-decorative">
          <div className="op-deco-circle circle-1"></div>
          <div className="op-deco-circle circle-2"></div>
          <div className="op-deco-circle circle-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Operational;