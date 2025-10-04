import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Digital Sheakh | Website Development, App Development & Digital Marketing Tips',
  description: 'Read the latest articles from Digital Sheakh about website development, app development, digital marketing, SEO, and software development. Expert tips and insights for growing your business.',
  keywords: 'Digital Sheakh blog, website development tips, app development guide, digital marketing blog, SEO tips, software development articles',
};

// Temporary blog posts data (will be replaced with Sanity CMS)
const blogPosts = [
  {
    id: 1,
    title: 'Why Choose Digital Sheakh for Website Development in Bangladesh',
    slug: 'why-choose-digital-sheakh-website-development',
    excerpt: 'Discover why Digital Sheakh is the leading choice for professional website development in Bangladesh. Learn about our process, technology stack, and commitment to quality.',
    date: '2025-10-04',
    category: 'Website Development',
    author: 'Digital Sheakh Team',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Complete Guide to App Development with Digital Sheakh',
    slug: 'complete-guide-app-development-digital-sheakh',
    excerpt: 'Everything you need to know about mobile app development with Digital Sheakh. From iOS to Android, React Native to Flutter - we cover it all.',
    date: '2025-10-03',
    category: 'App Development',
    author: 'Digital Sheakh Team',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Digital Marketing by Digital Sheakh: Services and Strategies',
    slug: 'digital-marketing-services-strategies',
    excerpt: 'Learn about comprehensive digital marketing services by Digital Sheakh. Google Ads, Meta Ads, SEO, and more strategies to grow your business online.',
    date: '2025-10-02',
    category: 'Digital Marketing',
    author: 'Digital Sheakh Team',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'SEO by Digital Sheakh: How We Rank Your Business on Google',
    slug: 'seo-digital-sheakh-rank-business-google',
    excerpt: 'Discover the SEO strategies used by Digital Sheakh to rank businesses on Google\'s first page. Learn about our proven methods and success stories.',
    date: '2025-10-01',
    category: 'SEO',
    author: 'Digital Sheakh Team',
    readTime: '8 min read',
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#2d667c', 
        color: 'white', 
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '14px',
            marginBottom: '20px',
            display: 'inline-block'
          }}>
            ← Back to Home
          </Link>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Digital Sheakh Blog
          </h1>
          <p style={{ 
            fontSize: '20px', 
            opacity: 0.9,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Expert insights on website development, app development, digital marketing, and SEO
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '60px 20px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '40px'
        }}>
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Placeholder */}
              <div style={{
                backgroundColor: '#2d667c',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '48px'
              }}>
                📝
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    backgroundColor: '#e8f4f8',
                    color: '#2d667c',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {post.category}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666'
                  }}>
                    {post.readTime}
                  </span>
                </div>

                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#1a1a1a',
                  lineHeight: '1.3'
                }}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    style={{ 
                      color: 'inherit', 
                      textDecoration: 'none'
                    }}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <span style={{ 
                    fontSize: '13px', 
                    color: '#999'
                  }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      color: '#2d667c',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            fontSize: '24px', 
            marginBottom: '12px',
            color: '#1a1a1a'
          }}>
            More Articles Coming Soon!
          </h3>
          <p style={{ 
            fontSize: '16px', 
            color: '#666',
            marginBottom: '24px'
          }}>
            We're constantly publishing new content about web development, apps, marketing, and SEO.
          </p>
          <Link
            href="/#contact"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#2d667c',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Get in Touch
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
            <span style={{ fontWeight: '700' }}>Digital</span>
            <span style={{ fontWeight: '300' }}> Sheakh</span>
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '16px' }}>
            Website Development | App Development | Digital Marketing | SEO
          </p>
          <p style={{ fontSize: '14px', opacity: 0.5 }}>
            © 2025 Digital Sheakh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
