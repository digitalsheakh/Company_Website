'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import LiveChat from '@/components/LiveChat';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image?: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const q = query(collection(db, 'blogs'), where('published', '==', true));
        const querySnapshot = await getDocs(q);
        const postsData: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-content"></div>
        </div>
        <div className="main-content">
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '3px', 
            background: '#f0f0f0',
            zIndex: 9999
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #2d667c, #4a8fa8, #7bb3d3)',
              animation: 'progress 1.5s ease-in-out infinite',
              transformOrigin: 'left'
            }}></div>
          </div>
          <div className="content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                margin: '0 auto 16px',
                opacity: 0.3
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2d667c" strokeWidth="2">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes progress {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(0.5); }
            100% { transform: scaleX(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-content"></div>
        </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Header */}
          <div className="header">
            <h1 className="logo">
              <span className="logo-dark">Sheakh</span>
              <span className="logo-light">.Digital</span>
            </h1>
            <h2 className="tagline">IT solutions for Your Business</h2>
            
            <nav className="nav">
              <Link className="nav-link" href="/#websites">Websites</Link>
              <span className="nav-dot">•</span>
              <Link className="nav-link" href="/#app-development">Apps</Link>
              <span className="nav-dot">•</span>
              <Link className="nav-link" href="/#digital-marketing">Digital Marketing</Link>
              <span className="nav-dot">•</span>
              <Link className="nav-link" href="/#seo">SEO</Link>
              <span className="nav-dot">•</span>
              <Link className="nav-link" href="/blog">Blog</Link>
              <span className="nav-dot">•</span>
              <Link className="nav-link" href="/#contact">Contact Us</Link>
            </nav>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="section">
              <h3 className="section-title">No blog posts yet</h3>
              <p className="section-text">
                Check back soon for articles about website development, app development, digital marketing, and SEO by Digital Sheakh!
              </p>
              <div className="cta-buttons">
                <Link href="/" className="btn btn-primary">
                  ← Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {posts.map((post, index) => (
                <div key={post.id} className="section" style={{ 
                  animation: `fadeInUp 0.5s ease-out ${0.1 * index}s both`,
                  borderBottom: index < posts.length - 1 ? '1px solid #f0f0f0' : 'none',
                  paddingBottom: '48px',
                  marginBottom: '48px'
                }}>
                  <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    {/* Featured Image */}
                    {post.image && (
                      <div style={{
                        width: '100%',
                        height: '280px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '24px',
                        position: 'relative',
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      }}
                      >
                        <div style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${post.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    )}

                    {/* Date and Author */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      <div style={{ 
                        color: '#2d667c', 
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <span style={{ color: '#ddd' }}>•</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        {post.author}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{ 
                      fontSize: '32px', 
                      fontWeight: '700',
                      marginBottom: '16px',
                      color: '#333',
                      lineHeight: '1.2',
                      transition: 'color 0.2s ease',
                      letterSpacing: '-0.5px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#2d667c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="section-text" style={{ 
                      marginBottom: '20px',
                      fontSize: '17px',
                      lineHeight: '1.7',
                      color: '#4a5568'
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                        {post.tags.map((tag) => (
                          <span key={tag} style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            color: '#666',
                            fontWeight: '600',
                            border: '1px solid #e0e0e0',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2d667c';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = '#2d667c';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                            e.currentTarget.style.color = '#666';
                            e.currentTarget.style.borderColor = '#e0e0e0';
                          }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Button */}
                    <div style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#2d667c',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(45, 102, 124, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e4a5f';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(45, 102, 124, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2d667c';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 102, 124, 0.2)';
                    }}
                    >
                      Read Full Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}

          {/* Footer */}
          <div className="footer">
            <h2 className="footer-logo">
              <span className="logo-dark">Sheakh</span>
              <span className="logo-light">.Digital</span>
            </h2>
            <div className="contact-info" style={{ marginTop: '24px' }}>
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
                <span>Moulvibazar, Bangladesh</span>
              </div>
            </div>

            <div className="social-icons" style={{ marginTop: '30px' }}>
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
              <a href="https://www.facebook.com/digitalsheakh" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat */}
      <LiveChat />
    </div>
  );
}
