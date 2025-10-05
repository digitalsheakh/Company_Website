'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ReactMarkdown from 'react-markdown';
import LiveChat from '@/components/LiveChat';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    const loadPost = async () => {
      try {
        if (!db) {
          console.error('Firebase not initialized');
          setLoading(false);
          return;
        }
        
        const docRef = doc(db, 'blogs', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as BlogPost;
          setPost(postData);
          
          // Update meta tags dynamically
          document.title = `${postData.title} - Digital Sheakh Blog`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', postData.excerpt);
          }
        }

        // Load latest posts
        const q = query(
          collection(db, 'blogs'), 
          where('published', '==', true),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const postsData: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== slug) { // Exclude current post
            postsData.push({ id: doc.id, ...doc.data() } as BlogPost);
          }
        });
        postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLatestPosts(postsData.slice(0, 1));
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

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

  if (!post) {
    return (
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-content"></div>
        </div>
        <div className="main-content">
          <div className="content-wrapper">
            <div className="section" style={{ textAlign: 'center', paddingTop: '100px' }}>
              <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Post Not Found</h1>
              <p className="section-text" style={{ marginBottom: '30px' }}>
                The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <div className="cta-buttons">
                <Link href="/blog" className="btn btn-primary">
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
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

          {/* Article */}
          <article className="section">
            {/* Meta Info */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#2d667c', fontWeight: '600', marginBottom: '8px' }}>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                By {post.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="page-title" style={{ fontSize: '42px', marginBottom: '20px', lineHeight: '1.2' }}>
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="page-description" style={{ 
                fontSize: '20px',
                fontStyle: 'italic',
                marginBottom: '30px',
                paddingLeft: '20px',
                borderLeft: '4px solid #2d667c'
              }}>
                {post.excerpt}
              </p>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px', 
                marginBottom: '40px',
                paddingBottom: '30px',
                borderBottom: '2px solid #f0f0f0'
              }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '8px 16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '20px',
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '500',
                    border: '1px solid #e9ecef'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="page-body blog-content" style={{ fontSize: '18px', lineHeight: '1.8' }}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Social Sharing */}
            <div style={{
              marginTop: '50px',
              paddingTop: '30px',
              borderTop: '2px solid #f0f0f0'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
                Share this article
              </h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1877f2',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1da1f2',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0077b5',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentUrl);
                    alert('Link copied to clipboard!');
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>

            {/* Latest Articles */}
            {latestPosts.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <h3 className="section-title">Latest Articles</h3>
                <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
                  {latestPosts.map((latestPost) => (
                    <Link
                      key={latestPost.id}
                      href={`/blog/${latestPost.id}`}
                      style={{
                        display: 'flex',
                        gap: '20px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.2s ease',
                        border: '1px solid #e9ecef'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {latestPost.image && (
                        <div style={{
                          width: '120px',
                          height: '80px',
                          borderRadius: '8px',
                          backgroundImage: `url(${latestPost.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          flexShrink: 0
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: '#2d667c', fontWeight: '600', marginBottom: '6px' }}>
                          {new Date(latestPost.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                          {latestPost.title}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                          {latestPost.excerpt.substring(0, 100)}...
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{
              marginTop: '50px',
              padding: '40px',
              backgroundColor: '#2d667c',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: '700' }}>
                Let&apos;s Grow Your Business Together
              </h3>
              <p style={{ fontSize: '17px', marginBottom: '25px', opacity: 0.95 }}>
                Digital Sheakh offers professional website development, app development, digital marketing, and SEO services to help your business succeed online.
              </p>
              <Link href="/#contact" className="btn" style={{
                backgroundColor: 'white',
                color: '#2d667c',
                padding: '16px 32px',
                fontSize: '17px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Get Started Today
              </Link>
            </div>
          </article>

          {/* Navigation */}
          <div className="page-navigation">
            <Link href="/blog" className="nav-arrow">
              ← Back to Blog
            </Link>
            <Link href="/" className="nav-arrow">
              Home →
            </Link>
          </div>

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

      <style jsx global>{`
        .blog-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 40px 0 20px;
          color: #333;
        }
        .blog-content h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 35px 0 18px;
          color: #333;
        }
        .blog-content h3 {
          font-size: 22px;
          font-weight: 600;
          margin: 30px 0 15px;
          color: #333;
        }
        .blog-content p {
          margin: 20px 0;
          line-height: 1.8;
          color: #4a5568;
        }
        .blog-content ul, .blog-content ol {
          margin: 20px 0;
          padding-left: 30px;
        }
        .blog-content li {
          margin: 12px 0;
          line-height: 1.8;
          color: #4a5568;
        }
        .blog-content a {
          color: #2d667c;
          text-decoration: underline;
          font-weight: 500;
        }
        .blog-content a:hover {
          color: #1e4a5f;
        }
        .blog-content strong {
          font-weight: 600;
          color: #333;
        }
        .blog-content code {
          background-color: #f8f9fa;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          color: #e83e8c;
          border: 1px solid #e9ecef;
        }
        .blog-content pre {
          background-color: #1a1a1a;
          color: #fff;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 25px 0;
        }
        .blog-content pre code {
          background: none;
          border: none;
          color: #fff;
          padding: 0;
        }
        .blog-content blockquote {
          border-left: 4px solid #2d667c;
          padding-left: 20px;
          margin: 25px 0;
          font-style: italic;
          color: #666;
          background: #f8f9fa;
          padding: 20px 20px 20px 24px;
          border-radius: 0 8px 8px 0;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 30px 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Live Chat */}
      <LiveChat />
    </div>
  );
}
