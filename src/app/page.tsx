'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [activePage, setActivePage] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    services: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('_5VLmkhbpDyqVK5Qn');
  }, []);

  const showPage = (pageId: string) => {
    setActivePage(pageId);
    if (pageId !== 'home') {
      window.history.pushState({ page: pageId }, '', '#' + pageId);
    } else {
      window.history.pushState({ page: 'home' }, '', '/');
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS credentials
      const serviceId = 'service_w4y5j3f';
      const templateId = 'template_gujx0yj';
      const autoReplyTemplateId = 'template_gpqqy6n';

      console.log('Attempting to send email with:', {
        serviceId,
        templateId,
        name: formData.name,
        email: formData.email
      });

      // Parameters for team notification (Feedback Request template)
      const teamParams = {
        from_name: formData.name,
        from_email: formData.email,
        email: 'digitalsheakh@gmail.com', // To Email field in template
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        services: formData.services.join(', ') || 'Not specified',
      };

      // Send notification to your team
      console.log('Sending team notification...');
      const response1 = await emailjs.send(serviceId, templateId, teamParams);
      console.log('Team notification sent:', response1);
      
      // Parameters for auto-reply (Auto-Reply template)
      const autoReplyParams = {
        to_name: formData.name,
        email: formData.email, // To Email field in template
      };
      
      // Send auto-reply to customer
      console.log('Sending auto-reply...');
      const response2 = await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams);
      console.log('Auto-reply sent:', response2);

      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', services: [] });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error: any) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        message: error?.message,
        text: error?.text,
        status: error?.status,
        full: JSON.stringify(error)
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Home Page */}
          <div id="home" className={`page-content ${activePage === 'home' ? 'active' : ''}`}>
            <div className="header">
              <h1 className="logo">
                <span className="logo-dark">Sheakh</span>
                <span className="logo-light">.Digital</span>
              </h1>
              <h2 className="tagline">IT solutions for Your Business</h2>
              
              <nav className="nav">
                <a className="nav-link" onClick={() => showPage('websites')}>Websites</a>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('app-development')}>Apps</a>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('digital-marketing')}>Digital Marketing</a>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('seo')}>SEO</a>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('contact')}>Contact Us</a>
              </nav>
            </div>

            <div className="section">
              <h3 className="section-title">Who are we?</h3>
              <p className="section-text">
                We are Digital Sheakh, your trusted partner in digital transformation. We specialize in creating cutting-edge websites, mobile applications, and comprehensive digital marketing solutions that drive real results for businesses worldwide.
              </p>
            </div>

            <div className="section">
              <h3 className="section-title">What makes us different?</h3>
              <p className="section-text">
                At sheakh.digital, we combine creativity with technology to deliver exceptional digital experiences. Our team of experts is dedicated to helping your business thrive in the digital landscape through innovative solutions and data-driven strategies.
              </p>
            </div>

            <div className="section">
              <h3 className="section-title">Ready to get started?</h3>
              <p className="section-text">Let&apos;s bring your vision to life:</p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">Our Services</h3>
              <p className="section-text">Explore what we can do for your business:</p>

              <div className="service-grid">
                <button className="service-btn" onClick={() => showPage('websites')}>
                  <span>Websites</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </button>
                <button className="service-btn" onClick={() => showPage('app-development')}>
                  <span>Mobile Apps</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </button>
                <button className="service-btn" onClick={() => showPage('digital-marketing')}>
                  <span>Digital Marketing</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 11 18-5v12L3 14v-3z"/>
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                  </svg>
                </button>
                <button className="service-btn" onClick={() => showPage('seo')}>
                  <span>SEO</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
            </div>
            <h2 className="footer-logo">
                  <span className="logo-dark">Sheakh</span>
                  <span className="logo-light">.Digital</span>
                </h2>

            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-dot">•</span>
                <span>digitalsheakh@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-dot">•</span>
                <span>www.sheakh.digital</span>
              </div>
              <div className="contact-item">
                <span className="contact-dot">•</span>
                <span>Available for projects worldwide</span>
              </div>
            </div>

            <div className="social-icons">
              <a href="mailto:digitalsheakh@gmail.com" className="social-icon" title="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/digitalsheakh/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" title="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            
             
          </div>

          {/* Website Development Page */}
          <div id="websites" className={`page-content ${activePage === 'websites' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">Website Development</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description">
                Professional web development services for businesses of all sizes. From stunning landing pages to complex web applications, we build websites that convert visitors into customers.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot">•</span> Responsive design that works perfectly on all devices</li>
                <li><span className="feature-dot">•</span> Modern, fast-loading websites with cutting-edge technology</li>
                <li><span className="feature-dot">•</span> E-commerce solutions with secure payment integration</li>
                <li><span className="feature-dot">•</span> Custom CMS and content management systems</li>
                <li><span className="feature-dot">•</span> SEO-optimized structure for better search rankings</li>
                <li><span className="feature-dot">•</span> Ongoing maintenance and support</li>
              </ul>
              
              <p className="award-text">
                We use the latest technologies including React, Next.js, Node.js, and more to build scalable, high-performance websites.
              </p>
              
              <p className="projects-intro">Technologies we work with:</p>
              <ul className="projects-list">
                <li><span className="project-dot">○</span> <em>React & Next.js</em></li>
                <li><span className="project-dot">○</span> <em>WordPress & Custom CMS</em></li>
                <li><span className="project-dot">○</span> <em>Shopify & WooCommerce</em></li>
                <li><span className="project-dot">○</span> <em>Node.js & Python Backend</em></li>
              </ul>
              
              <p className="pricing">
                Prices start at just £29 per month, with nothing up front.
                <span className="pricing-highlight">Affordable monthly payments make professional websites accessible to all businesses.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('home')}>← Home</a>
              <a className="nav-arrow" onClick={() => showPage('app-development')}>App Development →</a>
            </div>
          </div>

          {/* App Development Page */}
          <div id="app-development" className={`page-content ${activePage === 'app-development' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">App Development</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description">
                Native and cross-platform mobile applications that deliver exceptional user experiences. We build iOS and Android apps that your customers will love.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot">•</span> iOS and Android native app development</li>
                <li><span className="feature-dot">•</span> Cross-platform apps with React Native & Flutter</li>
                <li><span className="feature-dot">•</span> Progressive Web Apps (PWA)</li>
                <li><span className="feature-dot">•</span> App Store optimization and deployment</li>
                <li><span className="feature-dot">•</span> Backend API development and integration</li>
                <li><span className="feature-dot">•</span> Push notifications and real-time features</li>
                <li><span className="feature-dot">•</span> App maintenance and updates</li>
              </ul>
              
              <p className="page-text">
                Our mobile development team has years of experience creating apps for startups and enterprises. We follow best practices to ensure your app is secure, scalable, and performs flawlessly.
              </p>
              
              <p className="pricing">
                Custom app development with flexible pricing.
                <span className="pricing-highlight">Get a personalized quote based on your app requirements and features.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('websites')}>← Website Development</a>
              <a className="nav-arrow" onClick={() => showPage('digital-marketing')}>Digital Marketing →</a>
            </div>
          </div>

          {/* Digital Marketing Page */}
          <div id="digital-marketing" className={`page-content ${activePage === 'digital-marketing' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">Digital Marketing</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description">
                Comprehensive digital marketing services to grow your online presence and drive real business results through paid advertising campaigns.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot">•</span> <strong>Google Ads</strong> - Search, Display, and Shopping campaigns</li>
                <li><span className="feature-dot">•</span> <strong>Meta Ads</strong> - Facebook and Instagram advertising</li>
                <li><span className="feature-dot">•</span> <strong>TikTok Ads</strong> - Reach younger audiences with viral content</li>
                <li><span className="feature-dot">•</span> <strong>TripAdvisor Marketing</strong> - Perfect for hospitality businesses</li>
                <li><span className="feature-dot">•</span> <strong>Email Marketing</strong> - Automated campaigns that convert</li>
                <li><span className="feature-dot">•</span> <strong>Social Media Management</strong> - Build your brand presence</li>
                <li><span className="feature-dot">•</span> <strong>Content Creation</strong> - Copywriting, blogs, and social media content</li>
                <li><span className="feature-dot">•</span> <strong>Video Production</strong> - Professional promotional videos</li>
                <li><span className="feature-dot">•</span> <strong>Graphic Design</strong> - Logos, banners, and brand materials</li>
              </ul>
              
              <p className="award-text">
                We are certified Google Partners and Meta Business Partners, ensuring you get expert campaign management and the best possible ROI.
              </p>
              
              <p className="page-text">
                Our data-driven approach means every marketing dollar is tracked and optimized for maximum return. We provide detailed monthly reports showing exactly how your campaigns are performing.
              </p>
              
              <p className="pricing">
                Starting from £299 per month.
                <span className="pricing-highlight">Nothing upfront - flexible monthly plans to suit your budget.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('app-development')}>← App Development</a>
              <a className="nav-arrow" onClick={() => showPage('seo')}>SEO →</a>
            </div>
          </div>

          {/* SEO Page */}
          <div id="seo" className={`page-content ${activePage === 'seo' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">SEO - Search Engine Optimization</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description">
                Professional SEO services to improve your search engine rankings and drive organic traffic to your website. Get found by customers who are actively searching for your services.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot">•</span> <strong>Keyword Research</strong> - Find the right keywords to target your audience</li>
                <li><span className="feature-dot">•</span> <strong>On-Page SEO</strong> - Optimize your website content and structure</li>
                <li><span className="feature-dot">•</span> <strong>Technical SEO</strong> - Improve site speed, mobile-friendliness, and crawlability</li>
                <li><span className="feature-dot">•</span> <strong>Content Strategy</strong> - Create SEO-optimized content that ranks</li>
                <li><span className="feature-dot">•</span> <strong>Link Building</strong> - Build high-quality backlinks to boost authority</li>
                <li><span className="feature-dot">•</span> <strong>Local SEO</strong> - Dominate local search results in your area</li>
                <li><span className="feature-dot">•</span> <strong>Analytics & Reporting</strong> - Track your rankings and traffic growth</li>
                <li><span className="feature-dot">•</span> <strong>Competitor Analysis</strong> - Stay ahead of your competition</li>
              </ul>
              
              <p className="award-text">
                Our SEO strategies deliver long-term, sustainable growth. We focus on white-hat techniques that comply with Google&apos;s guidelines.
              </p>
              
              <p className="page-text">
                SEO is a long-term investment that pays dividends. Unlike paid advertising, organic rankings continue to drive traffic without ongoing ad spend. We provide monthly reports showing your progress and ROI.
              </p>
              
              <p className="pricing">
                Starting from £100 per month.
                <span className="pricing-highlight">Nothing upfront - see results within 3-6 months.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('digital-marketing')}>← Digital Marketing</a>
              <a className="nav-arrow" onClick={() => showPage('our-products')}>Our Products →</a>
            </div>
          </div>

          {/* Our Products Page */}
          <div id="our-products" className={`page-content ${activePage === 'our-products' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">Our Products</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description">
                Innovative digital products designed to solve real business problems. We create software solutions that make your operations smoother and more efficient.
              </p>
              
              {/* Product 1: Table for Four */}
              <div className="section" style={{ marginBottom: '64px', paddingBottom: '32px', borderBottom: '1px solid #f0f0f0' }}>
                <h3 className="section-title" style={{ fontSize: '24px', color: '#2d667c', marginBottom: '16px' }}>
                  Table for Four
                  <span style={{ fontSize: '16px', fontWeight: '400', color: '#666', marginLeft: '12px' }}>- Restaurant Table Management</span>
                </h3>
                
                <p className="page-text">
                  Our flagship product designed specifically for restaurant owners. Manage your tables, reservations, and customer flow with ease through an intuitive digital platform.
                </p>
                
                <ul className="feature-list">
                  <li><span className="feature-dot">•</span> Real-time table management and floor plan visualization</li>
                  <li><span className="feature-dot">•</span> Online reservations integrated with your website</li>
                  <li><span className="feature-dot">•</span> Digital waitlist management for walk-ins</li>
                  <li><span className="feature-dot">•</span> Customer database with preferences and history</li>
                  <li><span className="feature-dot">•</span> Automated SMS notifications and reminders</li>
                  <li><span className="feature-dot">•</span> Analytics and reporting dashboard</li>
                  <li><span className="feature-dot">•</span> Mobile app for on-the-go management</li>
                </ul>
                
                <p className="pricing">
                  Just £10 per month for restaurant owners.
                  <span className="pricing-highlight">No setup fees, no hidden costs. Cancel anytime.</span>
                </p>
                
                <div className="cta-buttons">
                  <a href="https://www.tableforfour.co" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                    Visit Table for Four
                  </a>
                </div>
              </div>
              
              {/* Placeholder for Future Products */}
              <div className="section">
                <h3 className="section-title" style={{ fontSize: '20px', marginBottom: '16px' }}>More Products Coming Soon</h3>
                <p className="page-text">
                  We&apos;re constantly developing new digital products to help businesses thrive. Our team is working on innovative solutions across various industries.
                </p>
                <p className="page-text">
                  Have an idea for a product? <a href="mailto:digitalsheakh@gmail.com" className="footer-link">Get in touch</a> and let&apos;s discuss how we can build it together.
                </p>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('seo')}>← SEO</a>
              <a className="nav-arrow" onClick={() => showPage('contact')}>Contact →</a>
            </div>
          </div>

          {/* Contact Page */}
          <div id="contact" className={`page-content ${activePage === 'contact' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">Ok, let&apos;s talk!</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <p className="page-description" style={{ marginBottom: '32px' }}>
                Give us a few quick details, and we&apos;ll be in touch:
              </p>

              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Thank you! We&apos;ve received your message and will get back to you within 24 hours. Check your email for a confirmation.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Oops! Something went wrong. Please try again or email us directly at digitalsheakh@gmail.com
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Company name (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone number (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Which service(s) are you interested in?</label>
                  <div className="checkbox-group">
                    {['Websites', 'Google Ads', 'Search Engine Optimisation', 'Email Marketing', 'Something else'].map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span className="checkbox-custom"></span>
                        <span className="checkbox-text">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="contact-info-footer">
                <p className="page-text" style={{ textAlign: 'center', marginTop: '40px' }}>
                  Or email us directly at <a href="mailto:digitalsheakh@gmail.com" className="footer-link">digitalsheakh@gmail.com</a>
                </p>
              </div>
            </div>
            
            <div className="page-navigation">
              <a className="nav-arrow" onClick={() => showPage('our-products')}>← Our Products</a>
              <a className="nav-arrow" onClick={() => showPage('home')}>Home →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
