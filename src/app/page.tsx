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
  
  // Live Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'bot' | 'user'}>>([
    { text: "Hi! What service are you interested in?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatStep, setChatStep] = useState(0);
  const [chatData, setChatData] = useState({ name: '', email: '', service: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('_5VLmkhbpDyqVK5Qn');
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
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
    } catch (error: unknown) {
      console.error('Error sending email:', error);
      const errorObj = error as { message?: string; text?: string; status?: number };
      console.error('Error details:', {
        message: errorObj?.message,
        text: errorObj?.text,
        status: errorObj?.status,
        full: JSON.stringify(error)
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Chat Messages
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim().toLowerCase();
    const originalMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { text: originalMessage, sender: 'user' }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResponse = '';
      
      if (chatStep === 0) {
        // Check if user wants to change service or asking questions
        if (userMessage.includes('change') || userMessage.includes('different') || userMessage.includes('another')) {
          botResponse = `No problem! Which service would you like to know about?`;
        } else {
          // Service selection
          setChatData(prev => ({ ...prev, service: originalMessage }));
          botResponse = `Great choice! What's your name?`;
          setChatStep(1);
        }
      } else if (chatStep === 1) {
        // Check if user wants to go back or change service
        if (userMessage.includes('back') || userMessage.includes('change service') || userMessage.includes('different service')) {
          botResponse = `Sure! What service are you interested in?`;
          setChatStep(0);
          setChatData(prev => ({ ...prev, service: '' }));
        } else {
          // Name
          setChatData(prev => ({ ...prev, name: originalMessage }));
          botResponse = `Nice to meet you, ${originalMessage}! What's your email?`;
          setChatStep(2);
        }
      } else if (chatStep === 2) {
        // Check if user wants to go back
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `No problem! What's your name?`;
          setChatStep(1);
        } else {
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(originalMessage)) {
            botResponse = `Please provide a valid email address.`;
          } else {
            setChatData(prev => ({ ...prev, email: originalMessage }));
            botResponse = `Perfect! Tell us about your project requirements.`;
            setChatStep(3);
          }
        }
      } else if (chatStep === 3) {
        // Check if user wants to go back
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `Sure! What's your email?`;
          setChatStep(2);
        } else {
          // Message
          setChatData(prev => ({ ...prev, message: originalMessage }));
          botResponse = `Thank you! We'll get back to you within 24 hours. Check your email for confirmation.`;
          setChatStep(4);
          
          // Send email via EmailJS
          const chatFormData = {
            ...chatData,
            message: originalMessage
          };
          
          emailjs.send('service_w4y5j3f', 'template_gujx0yj', {
            from_name: chatFormData.name,
            from_email: chatFormData.email,
            email: 'digitalsheakh@gmail.com',
            company: 'Chat Inquiry',
            phone: 'N/A',
            services: `${chatFormData.service} - ${chatFormData.message}`,
          }).then(() => {
            emailjs.send('service_w4y5j3f', 'template_gpqqy6n', {
              to_name: chatFormData.name,
              email: chatFormData.email,
            });
          });
        }
      }

      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 600);
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
                We are Digital Sheakh. We make websites and apps also help you market them, through search engine optimisation, Google Ads, Meta Ads, and email campaigns.
              </p>
            </div>

            <div className="section">
              <h3 className="section-title">Where are we?</h3>
              <p className="section-text">
                Our office is in Moulvibazar, Bangladesh. Ideally placed to support businesses worldwide. We have a team of IT professionals and marketing experts located globally to help you with your business needs.
              </p>
            </div>

            <div className="section">
              <h3 className="section-title">Already know what you want?</h3>
              <p className="section-text">Need to get moving quickly? That&apos;s fine by us, go for it:</p>
              
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

            <div className="section">
              <h3 className="section-title">Our Products</h3>
              <p className="section-text">
                Check out <a href="https://www.tableforfour.co" target="_blank" rel="noopener noreferrer" style={{ color: '#2d667c', textDecoration: 'none', fontWeight: '600', borderBottom: '1px solid #2d667c' }}>Table for Four</a> - our restaurant management system designed for restaurant owners.
              </p>
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
                <span>Moulvibazar, Bangladesh, 3200</span>
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
              <a href="https://www.youtube.com/@digitalsheakh" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
                Modern web development services for businesses of all sizes. Perfect landing pages to complex web applications, we build websites that convert visitors into customers.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot"></span> Responsive design that works perfectly on all devices</li>
                <li><span className="feature-dot"></span> Modern, fast-loading websites with cutting-edge technology</li>
                <li><span className="feature-dot"></span> Custom CMS and content management systems</li>
                <li><span className="feature-dot"></span> SEO optimized structure for better search rankings</li>
                <li><span className="feature-dot"></span> Ongoing maintenance and support</li>
                <li><span className="feature-dot"></span> Shop, restaurant, and service websites</li>
              </ul>
              
              <p className="award-text">
                We use the latest technologies to build high-performance websites.
              </p>
              
              <p className="projects-intro">Technologies we work with:</p>
              <ul className="projects-list">
                <li><span className="project-dot">○</span> <em>React & Next.js</em></li>
                <li><span className="project-dot">○</span> <em>WordPress & Webflow & wix & framer </em></li>
                <li><span className="project-dot">○</span> <em>Shopify</em></li>
                <li><span className="project-dot">○</span> <em>Node.js & Python Backend</em></li>
              </ul>
              
              <p className="pricing">
                Prices start at just $29 per month, with nothing up front.
                <span className="pricing-highlight">If you have your concept ready we will design, develop and deploy it for you!!</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  
                  
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  
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
                We develop Native and cross-platform mobile applications that solve problems and help you grow.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot"></span> iOS and Android native app development</li>
                <li><span className="feature-dot"></span> Cross-platform apps with React Native</li>
                <li><span className="feature-dot"></span> Progressive Web Apps</li>
                <li><span className="feature-dot"></span> App Store optimization and deployment</li>
                <li><span className="feature-dot"></span> Backend API development and integration and admin panel</li>
                
                <li><span className="feature-dot"></span> App maintenance and updates</li>
              </ul>
              
              <p className="page-text">
                Our mobile development team has years of experience creating apps for our clients. We follow best practices to ensure your app is ready to scale and innovative.
              </p>
              
              <p className="pricing">
                Perfect app development with flexible pricing.
                <span className="pricing-highlight">We develop and maintain apps with affordable montly price with nothing upfront. So do not worry about maintenance and updates.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  
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
                Smart digital marketing services to grow your business and get real customers through advertising campaigns and social media marketing.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot"></span> <strong>Google Ads</strong> - Search, Display, and Shopping campaigns</li>
                <li><span className="feature-dot"></span> <strong>Meta Ads</strong> - Facebook and Instagram advertising</li>
                <li><span className="feature-dot">•</span> <strong>TikTok Ads</strong> - Reach younger audiences with viral content</li>
                <li><span className="feature-dot">•</span> <strong>TripAdvisor Marketing</strong> - Perfect for hospitality businesses</li>
                <li><span className="feature-dot">•</span> <strong>Email Marketing</strong> - Automated campaigns that convert</li>
                <li><span className="feature-dot">•</span> <strong>Social Media Management</strong> - Build your brand online</li>
                <li><span className="feature-dot">•</span> <strong>Content Creation</strong> - Blogs writing</li>
                <li><span className="feature-dot">•</span> <strong>Video Production</strong> - Professional promotional videos</li>
                <li><span className="feature-dot">•</span> <strong>Graphic Design</strong> - Logos, banners, and posters</li>
              </ul>
              
              <p className="award-text">
                We are professionals with years of experience in digital marketing and we are here to help you grow your business.
              </p>
              
              <p className="page-text">
                Our data driven strategy means every marketing spend is tracked and optimized for maximum return. We provide detailed monthly reports showing exactly how your campaigns are performing.
              </p>
              
              <p className="pricing">
                Starting from $199 per month.
                <span className="pricing-highlight">Nothing upfront and flexible monthly plans to suit your budget.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  
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
                Professional SEO services to take your business on the top of search the search results. Get found by customers who are actively searching for your services.
              </p>
              
              <ul className="feature-list">
                <li><span className="feature-dot"></span> <strong>Keyword Research</strong> - Find the right keywords to target your audience</li>
                <li><span className="feature-dot"></span> <strong>On Page SEO</strong> - Optimize your website content and structure</li>
                <li><span className="feature-dot"></span> <strong>Technical SEO</strong> - Improve site speed, mobile-friendliness, and crawlability</li>
                <li><span className="feature-dot"></span> <strong>Content Strategy</strong> - Create SEO-optimized content that ranks</li>
                <li><span className="feature-dot"></span> <strong>Link Building</strong> - Build high quality backlinks to boost authority</li>
                <li><span className="feature-dot"></span> <strong>Local SEO</strong> - Dominate local search results in your area</li>
                <li><span className="feature-dot"></span> <strong>Analytics & Reporting</strong> - Track your rankings and traffic growth</li>
                <li><span className="feature-dot"></span> <strong>Competitor Analysis</strong> - Stay ahead of every competitor</li>
              </ul>
              
              <p className="award-text">
                Our SEO strategies deliver long term, sustainable growth.
              </p>
              
              <p className="page-text">
                SEO is a long term investment that pays dividends. Unlike paid advertising, organic rankings continue to drive traffic without ongoing ad spend. We provide monthly reports showing your progress and ROI.
              </p>
              
              <p className="pricing">
                Starting from $99 per month.
                <span className="pricing-highlight">Nothing upfront - see results within 3-6 months.</span>
              </p>
              
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); showPage('contact'); }}>
                  
                  Get a Free Quote
                </a>
                <a href="mailto:digitalsheakh@gmail.com" className="btn btn-primary">
                  
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
                  Just $13 per month for restaurant owners.
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

      {/* Live Chat Widget */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        {!isChatOpen ? (
          <button
            onClick={() => {
              setIsChatOpen(true);
              setIsChatMinimized(false);
            }}
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              backgroundColor: '#2d667c',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            💬
          </button>
        ) : isChatMinimized ? (
          <div
            onClick={() => setIsChatMinimized(false)}
            style={{
              backgroundColor: '#2d667c',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            <span>💬</span>
            <span>Digital Sheakh</span>
          </div>
        ) : (
          <div style={{
            width: '320px',
            height: '450px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Chat Header */}
            <div style={{
              backgroundColor: '#2d667c',
              color: 'white',
              padding: '14px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>Digital Sheakh</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsChatMinimized(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                  title="Minimize"
                >
                  −
                </button>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    setChatStep(0);
                    setChatMessages([{ text: "Hi! What service are you interested in?", sender: 'bot' }]);
                    setChatData({ name: '', email: '', service: '', message: '' });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#f8f9fa',
            }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '75%',
                    padding: '10px 12px',
                    borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    backgroundColor: msg.sender === 'user' ? '#2d667c' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: '12px 12px 12px 2px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    display: 'flex',
                    gap: '4px',
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2d667c', animation: 'bounce 1.4s infinite' }}></span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2d667c', animation: 'bounce 1.4s infinite 0.2s' }}></span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2d667c', animation: 'bounce 1.4s infinite 0.4s' }}></span>
                  </div>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={chatMessagesEndRef} />
              
              {/* Quick Reply Buttons */}
              {chatStep === 0 && !isTyping && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {['Website Development', 'App Development', 'Digital Marketing', 'SEO', 'Other'].map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        setChatMessages(prev => [...prev, { text: service, sender: 'user' }]);
                        setIsTyping(true);
                        setChatData(prev => ({ ...prev, service }));
                        setTimeout(() => {
                          setIsTyping(false);
                          setChatMessages(prev => [...prev, { text: `Great choice! What's your name?`, sender: 'bot' }]);
                          setChatStep(1);
                        }, 600);
                      }}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                        e.currentTarget.style.borderColor = '#2d667c';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            {chatStep < 4 && chatStep > 0 && (
              <div style={{
                padding: '12px 12px 12px 12px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: 'white',
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Type here..."
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      outline: 'none',
                      minWidth: 0,
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#2d667c'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={!chatInput.trim()}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: chatInput.trim() ? '#2d667c' : '#d0d0d0',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                      fontSize: '13px',
                      fontWeight: '600',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
            
            {/* WhatsApp Option */}
            {chatStep === 0 && !isTyping && (
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: 'white',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Or chat with us on</div>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            )}
            
            {/* Completion Message */}
            {chatStep === 4 && (
              <div style={{
                padding: '16px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#f0fdf4',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', color: '#15803d', marginBottom: '10px' }}>
                  ✅ Sent! We'll contact you soon.
                </div>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    setChatStep(0);
                    setChatMessages([{ text: "Hi! What service are you interested in?", sender: 'bot' }]);
                    setChatData({ name: '', email: '', service: '', message: '' });
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2d667c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  New Chat
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
