import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Catering Business Website Development | Digital Sheakh',
  description: 'Expert catering website development services. Custom websites for catering businesses with online ordering, menu management, event booking, and payment integration. Boost your catering business online.',
  keywords: 'catering website, catering business website, online food ordering, menu management, event catering website, catering web design, restaurant website',
  openGraph: {
    title: 'Professional Catering Website Development Services',
    description: 'Transform your catering business with a custom website featuring online ordering, menu management, and event booking systems.',
    type: 'website',
  },
};

export default function CateringPage() {
  return (
    <main className="service-page">
      <div className="service-hero">
        <div className="container">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <h1>Catering Business Website Development</h1>
          <p className="hero-subtitle">Elevate Your Catering Business with a Professional Online Presence</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/catering.png" 
                  alt="Catering Business Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Catering Business Needs a Professional Website</h2>
              <p>In today's digital age, a professional website is essential for catering businesses to attract clients, showcase menus, and streamline bookings. We specialize in creating custom catering websites that help you grow your business and reach more customers.</p>

              <h2>Our Catering Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Online Menu Management</h3>
                  <p>Easily update and display your catering menus with beautiful galleries, pricing, and dietary information. Let clients browse your offerings 24/7.</p>
                </div>

                <div className="feature-item">
                  <h3>Event Booking System</h3>
                  <p>Integrated booking system allowing clients to request quotes, check availability, and book your catering services directly from your website.</p>
                </div>

                <div className="feature-item">
                  <h3>Online Ordering</h3>
                  <p>Enable customers to place orders online with customizable options, special requests, and secure payment processing.</p>
                </div>

                <div className="feature-item">
                  <h3>Photo Galleries</h3>
                  <p>Showcase your culinary creations with stunning photo galleries that highlight your best dishes and past events.</p>
                </div>

                <div className="feature-item">
                  <h3>Customer Reviews</h3>
                  <p>Build trust with potential clients by displaying testimonials and reviews from satisfied customers.</p>
                </div>

                <div className="feature-item">
                  <h3>Mobile Responsive Design</h3>
                  <p>Your website will look perfect on all devices - desktop, tablet, and mobile - ensuring customers can browse and book from anywhere.</p>
                </div>
              </div>

              <h2>SEO Optimized for Maximum Visibility</h2>
              <p>We build catering websites with search engine optimization in mind, helping you rank higher in Google searches for catering services in your area. Our SEO strategies include:</p>
              <ul>
                <li>Local SEO optimization for your service area</li>
                <li>Keyword-rich content targeting catering searches</li>
                <li>Fast loading speeds for better rankings</li>
                <li>Mobile-first design approach</li>
                <li>Schema markup for enhanced search results</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are specialists in catering website development with years of experience helping catering businesses succeed online. Our team understands the unique needs of the catering industry and creates websites that convert visitors into customers.</p>

              <div className="cta-section">
                <h3>Ready to Grow Your Catering Business?</h3>
                <p>Let's create a stunning website that showcases your culinary expertise and attracts more clients.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Custom Menu Design</li>
                  <li>Online Booking System</li>
                  <li>Payment Integration</li>
                  <li>Photo Galleries</li>
                  <li>Contact Forms</li>
                  <li>Social Media Integration</li>
                  <li>Google Maps Integration</li>
                  <li>Email Marketing Setup</li>
                  <li>Analytics Dashboard</li>
                  <li>SEO Optimization</li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Industries We Serve</h3>
                <ul>
                  <li><Link href="/catering">Catering Business</Link></li>
                  <li><Link href="/garage">Garage & Auto Repair</Link></li>
                  <li><Link href="/ecommerce">E-commerce</Link></li>
                  <li><Link href="/laundry">Laundry Company</Link></li>
                  <li><Link href="/hotels">Hotels & Hospitality</Link></li>
                  <li><Link href="/pharmacy">Pharmacy</Link></li>
                  <li><Link href="/taxi">Taxi Company</Link></li>
                </ul>
              </div>

              <div className="sidebar-card cta-card">
                <h3>Get a Free Quote</h3>
                <p>Contact us today for a free consultation and quote for your catering website.</p>
                <a href="mailto:digitalsheakh@gmail.com" className="sidebar-cta-btn">Contact Us</a>
              </div>
            </aside>
          </div>

          {/* Contact Buttons */}
          <div className="service-contact-buttons">
            <h3>Get In Touch</h3>
            <div className="contact-buttons-grid">
              <a 
                href="https://wa.me/" 
                className="contact-btn whatsapp"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>

              <a 
                href="https://www.instagram.com/sheakh.digital/" 
                className="contact-btn instagram"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
                Instagram
              </a>

              <a 
                href="mailto:digitalsheakh@gmail.com" 
                className="contact-btn email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
