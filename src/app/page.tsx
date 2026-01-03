'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(true);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Sheakh. What's your name?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInterest, setUserInterest] = useState('');
  const [conversationStep, setConversationStep] = useState('name');

  useEffect(() => {
    emailjs.init('_5VLmkhbpDyqVK5Qn');
    
    // Show chat prompt after 3 seconds
    const timer = setTimeout(() => {
      setShowChatPrompt(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isChatOpen) {
      setShowChatPrompt(false);
    }
  }, [isChatOpen]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pricing = {
    website_premium: { price: '750', period: 'per year', description: 'Website development including hosting and maintenance throughout the year' },
    website_simple: { price: '110', period: 'per month', description: 'Regular simple website including hosting and all', original: '150' },
    social_media: { price: '350', period: 'per month', description: 'Social media management', original: '450' },
    content_social: { price: '550', period: 'per month', description: 'Content creation and social media management together', original: '700' },
    app_dev: { price: '990', period: 'per month', description: 'App development', original: '1200' },
    google_business: { price: '29', period: 'per month', description: 'Google Business Profile and TripAdvisor profile setup and management', original: '45' },
    digital_pack: { price: '650', period: 'per month', description: 'Complete digital marketing pack (social media, content, website and business profiles management)', original: '1000', discount: '350' }
  };

  const sendEmail = async (userData: { name: string; email: string; phone: string; interest: string }) => {
    try {
      const now = new Date();
      const timeString = now.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      await emailjs.send(
        'service_rt76vlk',
        'template_xkh8zhg',
        {
          name: userData.name,
          time: timeString,
          email: userData.email,
          phone: userData.phone,
          interest: userData.interest
        }
      );
    } catch (error) {
      console.error('Email send failed:', error);
    }
  };

  const getBotResponse = (userMessage: string, step: string) => {
    const message = userMessage.trim();
    const lowerMessage = message.toLowerCase();
    
    if (step === 'name') {
      setUserName(message);
      setConversationStep('interest');
      return `Nice to meet you, ${message}. What can I help you with today? Are you looking for website development, social media management, content creation, app development, or something else?`;
    }
    
    if (step === 'interest') {
      setUserInterest(message);
      
      let priceInfo = '';
      if (lowerMessage.includes('website') && (lowerMessage.includes('premium') || lowerMessage.includes('full') || lowerMessage.includes('complete'))) {
        priceInfo = `\n\nOur premium website development starts from £${pricing.website_premium.price} ${pricing.website_premium.period}, which includes hosting and maintenance throughout the year. For an accurate quote tailored to your needs, we'll need to discuss your specific requirements.`;
      } else if (lowerMessage.includes('website') || lowerMessage.includes('site')) {
        priceInfo = `\n\nOur regular website packages start from £${pricing.website_simple.price} ${pricing.website_simple.period} (discounted from £${pricing.website_simple.original}), including hosting and everything you need. For more complex websites, we have premium packages starting from £${pricing.website_premium.price} per year.`;
      } else if (lowerMessage.includes('social') && lowerMessage.includes('content')) {
        priceInfo = `\n\nOur combined content creation and social media management package is £${pricing.content_social.price} ${pricing.content_social.period} (discounted from £${pricing.content_social.original}). This gives you comprehensive coverage for your social presence.`;
      } else if (lowerMessage.includes('social')) {
        priceInfo = `\n\nSocial media management starts from £${pricing.social_media.price} ${pricing.social_media.period} (discounted from £${pricing.social_media.original}). If you want content creation included, we have a package for £${pricing.content_social.price} per month.`;
      } else if (lowerMessage.includes('content')) {
        priceInfo = `\n\nContent creation with social media management is £${pricing.content_social.price} ${pricing.content_social.period} (discounted from £${pricing.content_social.original}).`;
      } else if (lowerMessage.includes('app')) {
        priceInfo = `\n\nApp development starts from £${pricing.app_dev.price} ${pricing.app_dev.period} (discounted from £${pricing.app_dev.original}). The exact price depends on your app's features and complexity.`;
      } else if (lowerMessage.includes('google') || lowerMessage.includes('business profile') || lowerMessage.includes('tripadvisor')) {
        priceInfo = `\n\nGoogle Business Profile and TripAdvisor setup and management is just £${pricing.google_business.price} ${pricing.google_business.period} (discounted from £${pricing.google_business.original}).`;
      } else if (lowerMessage.includes('everything') || lowerMessage.includes('complete') || lowerMessage.includes('full package') || lowerMessage.includes('digital marketing')) {
        priceInfo = `\n\nOur complete digital marketing package includes social media, content creation, website, and business profile management for £${pricing.digital_pack.price} ${pricing.digital_pack.period}. That's a £${pricing.digital_pack.discount} discount from the regular £${pricing.digital_pack.original} price.`;
      }
      
      setConversationStep('email');
      return `That sounds great.${priceInfo}\n\nCould I get your email address so we can send you more detailed information?`;
    }
    
    if (step === 'email') {
      setUserEmail(message);
      setConversationStep('phone');
      return `Perfect. And what's the best phone number to reach you?`;
    }
    
    if (step === 'phone') {
      setConversationStep('complete');
      
      sendEmail({
        name: userName,
        email: userEmail,
        phone: message,
        interest: userInterest
      });
      
      return `Thank you, ${userName}. I've got all your details. Someone from our team will reach out to you shortly at ${userEmail} or ${message} to discuss your ${userInterest} needs in detail.\n\nIn the meantime, feel free to check out our Instagram or send us a direct message there if you have any questions.`;
    }
    
    if (step === 'complete') {
      return `Is there anything else I can help you with? Otherwise, our team will be in touch with you soon.`;
    }
    
    return "I'm here to help. What would you like to know about our services?";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = { text: getBotResponse(inputValue, conversationStep), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="video-container">
      {/* Video Background - User will add their video */}
      <video 
        className="background-video"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/video/background.mov" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content">
        <div className="logo-container">
          <Image 
            src="/sheakhlogo.png" 
            alt="Digital Sheakh" 
            width={180} 
            height={60}
            priority
            className="logo"
          />
        </div>

        <h1 className="main-title">Digital Solution For Business Owners</h1>

        {/* Services Marquee */}
        <div className="services-marquee">
          <div className="marquee-content">
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
              </svg>
              <span>Website Development</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
              <span>Social Media Management</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
              <span>Social Content</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
              <span>App Development</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
              </svg>
              <span>Booking Management</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>TripAdvisor</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
              <span>Hosting and Management</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
              </svg>
              <span>Website Development</span>
            </div>
            <div className="service-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
              <span>Social Media Management</span>
            </div>
          </div>
        </div>

        <div className="social-links">
          <a 
            href="https://wa.me/" 
            className="social-btn whatsapp-btn"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          <a 
            href="https://www.instagram.com/sheakh.digital/" 
            className="social-btn instagram-btn"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
            </svg>
            Instagram
          </a>
        </div>

        <p className="tagline">digitalsheakh@gmail.com</p>
      </div>

      {/* Chat Prompt */}
      {showChatPrompt && !isChatOpen && (
        <div className="chat-prompt">
          <div className="chat-prompt-content">
            <p>Hi! Need help with your digital needs?</p>
            <button onClick={() => setIsChatOpen(true)}>Chat with Sheakh</button>
          </div>
          <button className="close-prompt" onClick={() => setShowChatPrompt(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
      
      {/* Chat Button */}
      <button 
        className="chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Open chat"
      >
        {isChatOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className={`chat-window ${isChatMinimized ? 'minimized' : ''}`}>
          <div className="chat-header">
            <h3>Digital Assistant</h3>
            <div className="chat-controls">
              <button onClick={() => setIsChatMinimized(!isChatMinimized)} className="minimize-chat">
                {isChatMinimized ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                )}
              </button>
              <button onClick={() => setIsChatOpen(false)} className="close-chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              </button>
            </div>
          </div>
          
          {!isChatMinimized && (
          <>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <input 
              ref={chatInputRef}
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="off"
            />
            <button className="send-button" onClick={handleSendMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          
          <div className="chat-footer">
            <a href="https://www.instagram.com/sheakh.digital/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
              Instagram
            </a>
            <a href="mailto:digitalsheakh@gmail.com" className="footer-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email
            </a>
          </div>
          </>
          )}
        </div>
      )}
    </div>
  );
}
