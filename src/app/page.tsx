'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import Link from 'next/link';
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
    { text: "Hi! 👋 How can I help you today?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatStep, setChatStep] = useState(0);
  const [chatData, setChatData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS with error handling
  useEffect(() => {
    try {
      emailjs.init('_5VLmkhbpDyqVK5Qn');
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
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
      // Validate required fields first
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please provide a valid email address');
      }

      // EmailJS credentials
      const serviceId = 'service_w4y5j3f';
      const templateId = 'template_gujx0yj';
      const autoReplyTemplateId = 'template_gpqqy6n';

      console.log('Form submission attempt:', {
        serviceId,
        templateId,
        name: formData.name,
        email: formData.email,
        emailjsLoaded: typeof emailjs !== 'undefined'
      });

      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS is not loaded. Please refresh the page and try again.');
      }

      // Parameters matching your EmailJS template structure
      const teamParams = {
        from_name: formData.name,
        from_email: formData.email,
        email: 'digitalsheakh@gmail.com', // Your template uses {{email}} for destination
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        services: formData.services.join(', ') || 'Not specified',
        message: `New inquiry from ${formData.name} (${formData.email})\n\nCompany: ${formData.company || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nServices: ${formData.services.join(', ') || 'Not specified'}`
      };

      console.log('Sending team notification with params:', teamParams);
      
      // Send team notification with timeout
      const response1 = await Promise.race([
        emailjs.send(serviceId, templateId, teamParams),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email timeout - please try again')), 10000)
        )
      ]);
      
      console.log('Team notification sent successfully:', response1);

      // Try to send auto-reply (don't fail the whole process if this fails)
      try {
        const autoReplyParams = {
          to_name: formData.name,
          email: formData.email, // Your template uses {{email}} for destination
          from_name: 'Digital Sheakh'
        };
        
        console.log('Sending auto-reply with params:', autoReplyParams);
        const response2 = await emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams);
        console.log('Auto-reply sent successfully:', response2);
      } catch (autoReplyError) {
        console.warn('Auto-reply failed, but main email was sent:', autoReplyError);
      }

      setSubmitStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', services: [] });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error: unknown) {
      console.error('Form submission error:', error);
      
      const errorObj = error as { message?: string; text?: string; status?: number; name?: string };
      
      // Log detailed error information
      console.error('Detailed error info:', {
        message: errorObj?.message,
        text: errorObj?.text,
        status: errorObj?.status,
        name: errorObj?.name,
        type: typeof error,
        full: error
      });

      // Show user-friendly error message
      let userMessage = 'There was an error sending your message. ';
      
      if (errorObj?.message?.includes('timeout')) {
        userMessage += 'The request timed out. Please check your internet connection and try again.';
      } else if (errorObj?.message?.includes('EmailJS')) {
        userMessage += 'Email service is temporarily unavailable. Please try again in a few minutes.';
      } else if (errorObj?.status === 400) {
        userMessage += 'Please check your information and try again.';
      } else if (errorObj?.status === 401) {
        userMessage += 'Authentication error. Please contact support.';
      } else {
        userMessage += 'Please try again or contact us directly at digitalsheakh@gmail.com';
      }

      // Show fallback contact options
      const fallbackMessage = `${userMessage}\n\nAlternative ways to contact us:\n• Email: digitalsheakh@gmail.com\n• WhatsApp: Click the WhatsApp button in the chat\n• Try the live chat feature`;
      
      if (confirm(fallbackMessage + '\n\nWould you like to copy our email address to your clipboard?')) {
        navigator.clipboard.writeText('digitalsheakh@gmail.com').catch(() => {
          console.log('Could not copy to clipboard');
        });
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Concise chat responses for business development queries
  const getBotResponse = (userMessage: string, originalMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Business Development specific queries
    if (lowerMessage.includes('social media') || lowerMessage.includes('facebook') || lowerMessage.includes('instagram') || lowerMessage.includes('tiktok')) {
      return "📱 Social media management with daily posts, customer responses & engagement. Ready to get started?";
    }
    
    if (lowerMessage.includes('tripadvisor') || lowerMessage.includes('trip advisor')) {
      return "🏨 Complete TripAdvisor management - profile optimization, reviews & rankings. Interested?";
    }
    
    if (lowerMessage.includes('customer') && (lowerMessage.includes('support') || lowerMessage.includes('service') || lowerMessage.includes('queries') || lowerMessage.includes('inquiries'))) {
      return "💬 24/7 customer support & inquiry management. Want to learn more?";
    }
    
    if (lowerMessage.includes('website') || lowerMessage.includes('web development')) {
      return "🌐 Custom websites + ongoing maintenance. Ready to discuss your project?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "💰 Starting at £299/month, flexible plans. Want a personalized quote?";
    }
    
    if (lowerMessage.includes('seo') || lowerMessage.includes('search engine')) {
      return "🔍 SEO services to boost your rankings & visibility. Interested?";
    }
    
    if (lowerMessage.includes('review') || lowerMessage.includes('reputation')) {
      return "⭐ Review management across all platforms. Want to improve your reputation?";
    }
    
    if (lowerMessage.includes('business growth') || lowerMessage.includes('grow business') || lowerMessage.includes('business development')) {
      return "📈 Complete digital growth package. Ready to grow your business?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what do you do') || lowerMessage.includes('services')) {
      return "🚀 We offer: Social Media, Websites, SEO, Customer Support & more. What interests you?";
    }
    
    // Default responses for general queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 😊 We help businesses grow online. What can I help you with?";
    }
    
    return "Let me connect you with our team! What's your name?";
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
        // Enhanced query handling for step 0
        if (userMessage.includes('change') || userMessage.includes('different') || userMessage.includes('another')) {
          botResponse = `What can I help you with? 😊`;
        } else if (userMessage.includes('quote') || userMessage.includes('get started') || userMessage.includes('interested') || userMessage.includes('yes') || userMessage.includes('ready')) {
          botResponse = `Great! What's your name?`;
          setChatStep(1);
        } else if (userMessage.includes('social media') || userMessage.includes('tripadvisor') || userMessage.includes('customer support') || userMessage.includes('website') || userMessage.includes('pricing') || userMessage.includes('seo') || userMessage.includes('review')) {
          // If user mentions any service, start collecting their info
          setChatData(prev => ({ ...prev, service: originalMessage }));
          botResponse = `Great choice! 😊 What's your name?`;
          setChatStep(1);
        } else {
          // For general queries, provide brief info and ask for contact details
          botResponse = getBotResponse(userMessage, originalMessage);
          // Always advance to collecting info after any query
          setChatData(prev => ({ ...prev, service: originalMessage }));
          setTimeout(() => {
            setChatMessages(prev => [...prev, { text: "What's your name so I can help you better? 😊", sender: 'bot' }]);
            setChatStep(1);
          }, 1000);
        }
      } else if (chatStep === 1) {
        // Check if user wants to go back or change service
        if (userMessage.includes('back') || userMessage.includes('change service') || userMessage.includes('different service')) {
          botResponse = `What can I help you with? 😊`;
          setChatStep(0);
          setChatData(prev => ({ ...prev, service: '' }));
        } else {
          // Name
          setChatData(prev => ({ ...prev, name: originalMessage }));
          botResponse = `Hi ${originalMessage}! 📧 What's your email?`;
          setChatStep(2);
        }
      } else if (chatStep === 2) {
        // Check if user wants to go back
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `What's your name?`;
          setChatStep(1);
        } else {
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(originalMessage)) {
            botResponse = `Please enter a valid email address 📧`;
          } else {
            setChatData(prev => ({ ...prev, email: originalMessage }));
            botResponse = `📱 What's your phone number?`;
            setChatStep(3);
          }
        }
      } else if (chatStep === 3) {
        // Check if user wants to go back
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `What's your email? 📧`;
          setChatStep(2);
        } else {
          // Phone number
          setChatData(prev => ({ ...prev, phone: originalMessage }));
          botResponse = `💬 Tell us about your project needs:`;
          setChatStep(4);
        }
      } else if (chatStep === 4) {
        // Check if user wants to go back
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `Sure! What's your email?`;
          setChatStep(2);
        } else {
          // Message
          setChatData(prev => ({ ...prev, message: originalMessage }));
          botResponse = `✅ Thank you! We'll contact you soon.`;
          setChatStep(5);
          
          // Send email via EmailJS with robust error handling
          const chatFormData = {
            ...chatData,
            message: originalMessage
          };
          
          // Only send email if EmailJS is available
          if (typeof emailjs !== 'undefined') {
            try {
              // Send team notification matching your template structure
              const chatParams = {
                from_name: chatFormData.name,
                from_email: chatFormData.email,
                email: 'digitalsheakh@gmail.com', // Your template uses {{email}} for destination
                company: 'Chat Inquiry',
                phone: chatFormData.phone || 'Not provided',
                services: chatFormData.service,
                message: `Chat inquiry from ${chatFormData.name} (${chatFormData.email})\n\nPhone: ${chatFormData.phone}\nService Interest: ${chatFormData.service}\nMessage: ${chatFormData.message}`
              };

              console.log('Sending chat email with params:', chatParams);
              
              emailjs.send('service_w4y5j3f', 'template_gujx0yj', chatParams)
                .then((response) => {
                  console.log('Chat email sent successfully:', response);
                  // Try to send auto-reply (optional)
                  return emailjs.send('service_w4y5j3f', 'template_gpqqy6n', {
                    to_name: chatFormData.name,
                    email: chatFormData.email, // Your template uses {{email}} for destination
                    from_name: 'Digital Sheakh'
                  });
                })
                .then((response) => {
                  console.log('Chat auto-reply sent successfully:', response);
                })
                .catch((error) => {
                  console.error('Chat email error:', error);
                  // Don't show error to user since they already got confirmation
                });
            } catch (error) {
              console.error('Chat email setup error:', error);
            }
          } else {
            console.warn('EmailJS not available for chat email');
          }
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
                <a className="nav-link" onClick={() => showPage('business-development')}>Business Development</a>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('home')}>Home</a>
                <span className="nav-dot">•</span>
                <Link className="nav-link" href="/blog">Blog</Link>
                <span className="nav-dot">•</span>
                <a className="nav-link" onClick={() => showPage('contact')}>Contact Us</a>
              </nav>
            </div>

            <div className="section">
              <h3 className="section-title">Who are we?</h3>
              <p className="section-text">
                We are Digital Sheakh, your trusted partner for comprehensive business development. We create websites and apps, manage your digital presence, and help grow your business through strategic online marketing and customer engagement.
              </p>
            </div>

            <div className="section">
              <h3 className="section-title">Where are we?</h3>
              <p className="section-text">
                We provide worldwide service. We have a team of IT professionals and marketing experts located globally to help you with your business needs.
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
              <p className="section-text">Comprehensive digital solutions to accelerate your business growth:</p>

              <div className="service-grid">
                <button className="service-btn" onClick={() => showPage('business-development')}>
                  <span>Business Development</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </button>
              </div>
              
              <div style={{ 
                marginTop: '20px', 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                borderLeft: '4px solid #2d667c'
              }}>
                <p style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.6', 
                  color: '#555', 
                  margin: '0',
                  fontStyle: 'italic'
                }}>
                  From social media management and customer support to website development and TripAdvisor optimization - we handle your complete digital presence so you can focus on running your business.
                </p>
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

          {/* Business Development Page */}
          <div id="business-development" className={`page-content ${activePage === 'business-development' ? 'active' : ''}`}>
            <div className="page-header">
              <h1 className="page-title">Business Development</h1>
              <button className="close-btn" onClick={() => showPage('home')}>✕</button>
            </div>
            
            <div className="page-body">
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '10px', 
                marginBottom: '30px',
                borderLeft: '4px solid #2d667c'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  marginBottom: '15px', 
                  color: '#2d667c',
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '10px'
                }}>
                  Digital Sheakh Business Development
                </h2>
                <p style={{ 
                  fontSize: '17px', 
                  lineHeight: '1.7',
                  color: '#333',
                  fontWeight: '400'
                }}>
                  Top business growth services designed to help your business grow in the digital world. We handle everything from customer engagement and social media management to website development and online reputation management, so you can focus on what you do best.
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Photo & Video Editing</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Professional editing for your marketing materials to create engaging content for your audience.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Social Media Management</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Complete social media management including regular content updates, customer query responses, and engagement across Facebook, Instagram, TikTok, and other platforms to build strong customer relationships.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Website Development</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Custom websites that convert visitors to customers with modern design and functionality.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>SEO Services</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Improve your search rankings and visibility to attract more organic traffic to your business.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Google Business Profile</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Optimization and regular updates to improve local search visibility and customer engagement.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>TripAdvisor Management</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Complete TripAdvisor optimization including profile management, review responses, photo updates, and strategic improvements to boost your hospitality business rankings and attract more customers.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Review Management</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Monitor and respond to customer reviews to build trust and improve your online reputation.</p>
                </div>
                
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #eee'
                }}>
                  <h3 style={{ color: '#2d667c', marginBottom: '12px', fontSize: '18px' }}>Customer Support & Engagement</h3>
                  <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>Professional handling of customer inquiries, social media messages, and support requests to ensure excellent customer service and maintain strong business relationships.</p>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#edf7fd', 
                padding: '25px', 
                borderRadius: '10px', 
                marginBottom: '30px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #2d667c 25%, transparent 25%)',
                  opacity: 0.1
                }}></div>
                <h3 style={{ 
                  fontSize: '20px', 
                  marginBottom: '15px', 
                  color: '#2d667c',
                  fontWeight: '600'
                }}></h3>
                
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fffe', 
                padding: '25px', 
                borderRadius: '10px', 
                marginBottom: '30px',
                border: '1px solid #e8f5f3'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  marginBottom: '20px', 
                  color: '#2d667c',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>What You Get With Our Service</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>24/7 customer inquiry management</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>Professional social media presence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>TripAdvisor optimization & monitoring</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>Increased online visibility</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>Better customer relationships</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#2d667c', fontSize: '18px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#333' }}>Consistent business growth</span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '25px', 
                borderRadius: '10px', 
                marginBottom: '30px',
                textAlign: 'center',
                border: '1px solid #e0e0e0'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  marginBottom: '10px', 
                  color: '#2d667c',
                  fontWeight: '600'
                }}>Pricing</h3>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '700', 
                  color: '#333',
                  marginBottom: '10px'
                }}>
                  £299<span style={{ fontSize: '18px', fontWeight: '400' }}>/month</span>
                </div>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#555',
                  marginBottom: '5px'
                }}>
                  Price depends on business size
                </p>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#555',
                  fontWeight: '500'
                }}>
                  No upfront costs • Flexible monthly plans
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); showPage('contact'); }}
                  style={{
                    backgroundColor: '#2d667c',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px rgba(45, 102, 124, 0.2)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#235264'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2d667c'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                  </svg>
                  Get a Free Quote
                </a>
                <a 
                  href="mailto:digitalsheakh@gmail.com"
                  style={{
                    backgroundColor: 'white',
                    color: '#2d667c',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #2d667c',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f7fa';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '40px',
              borderTop: '1px solid #eee',
              paddingTop: '20px'
            }}>
              <a 
                onClick={() => showPage('home')} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#2d667c',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#235264'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2d667c'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Home
              </a>
              <a 
                onClick={() => showPage('contact')} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#2d667c',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#235264'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2d667c'}
              >
                Contact
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
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
                    {['Business Development', 'Social Media Management', 'Website Development', 'Photo & Video Editing', 'Something else'].map((service) => (
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
                    setChatMessages([{ text: "Hi! 👋 How can I help you today?", sender: 'bot' }]);
                    setChatData({ name: '', email: '', phone: '', service: '', message: '' });
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
                  {['Social Media Management', 'TripAdvisor Management', 'Customer Support', 'Website Development', 'Pricing Info', 'Get Started'].map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        setChatMessages(prev => [...prev, { text: service, sender: 'user' }]);
                        setIsTyping(true);
                        setChatData(prev => ({ ...prev, service }));
                        setTimeout(() => {
                          setIsTyping(false);
                          // Always start collecting customer info after service selection
                          setChatMessages(prev => [...prev, { text: "Great choice! 😊 What's your name?", sender: 'bot' }]);
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
            {chatStep < 5 && chatStep > 0 && (
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
            {chatStep === 5 && (
              <div style={{
                padding: '16px',
                borderTop: '1px solid #e0e0e0',
                backgroundColor: '#f0fdf4',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', color: '#15803d', marginBottom: '10px' }}>
                  ✅ Sent! We&apos;ll contact you soon.
                </div>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    setChatStep(0);
                    setChatMessages([{ text: "Hi! 👋 How can I help you today?", sender: 'bot' }]);
                    setChatData({ name: '', email: '', phone: '', service: '', message: '' });
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
