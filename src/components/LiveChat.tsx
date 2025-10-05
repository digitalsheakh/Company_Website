'use client';

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function LiveChat() {
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

  useEffect(() => {
    emailjs.init('_5VLmkhbpDyqVK5Qn');
  }, []);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

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
        if (userMessage.includes('change') || userMessage.includes('different') || userMessage.includes('another')) {
          botResponse = `No problem! Which service would you like to know about?`;
        } else {
          setChatData(prev => ({ ...prev, service: originalMessage }));
          botResponse = `Great choice! What's your name?`;
          setChatStep(1);
        }
      } else if (chatStep === 1) {
        if (userMessage.includes('back') || userMessage.includes('change service') || userMessage.includes('different service')) {
          botResponse = `Sure! What service are you interested in?`;
          setChatStep(0);
          setChatData(prev => ({ ...prev, service: '' }));
        } else {
          setChatData(prev => ({ ...prev, name: originalMessage }));
          botResponse = `Nice to meet you, ${originalMessage}! What's your email?`;
          setChatStep(2);
        }
      } else if (chatStep === 2) {
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `No problem! What's your name?`;
          setChatStep(1);
        } else {
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
        if (userMessage.includes('back') || userMessage.includes('change')) {
          botResponse = `Sure! What's your email?`;
          setChatStep(2);
        } else {
          setChatData(prev => ({ ...prev, message: originalMessage }));
          botResponse = `Thank you! We'll get back to you within 24 hours. Check your email for confirmation.`;
          setChatStep(4);
          
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
              to_email: chatFormData.email,
              service: chatFormData.service,
            });
          }).catch((error) => {
            console.error('Error:', error);
          });
        }
      }
      
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  return (
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
                        setChatMessages(prev => [...prev, { text: `Great choice! What&apos;s your name?`, sender: 'bot' }]);
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
                ✅ Sent! We&apos;ll contact you soon.
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
  );
}
