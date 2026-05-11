import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hotel & Hospitality Website Development | Digital Sheakh',
  description: 'Professional hotel website development services. Custom websites for hotels and hospitality businesses with booking engines, room management, and reservation systems. Elevate your hotel online presence.',
  keywords: 'hotel website, hospitality website, hotel booking system, resort website, hotel web design, accommodation website, hotel reservation system',
  openGraph: {
    title: 'Professional Hotel & Hospitality Website Development',
    description: 'Transform your hotel business with an elegant website featuring integrated booking engines, room management, and guest services.',
    type: 'website',
  },
};

export default function HotelsPage() {
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
          
          <h1>Hotel & Hospitality Website Development</h1>
          <p className="hero-subtitle">Create an Elegant Online Presence for Your Hotel or Resort</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/hotels.png" 
                  alt="Hotel & Hospitality Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Hotel Needs a Professional Website</h2>
              <p>In the competitive hospitality industry, a stunning website is essential for attracting guests and maximizing direct bookings. We specialize in creating elegant hotel websites that showcase your property, streamline reservations, and enhance the guest experience from first click to checkout.</p>

              <h2>Our Hotel Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Integrated Booking Engine</h3>
                  <p>Powerful booking system allowing guests to check availability, compare room types, and make reservations directly on your website.</p>
                </div>

                <div className="feature-item">
                  <h3>Room Management System</h3>
                  <p>Manage room inventory, pricing, availability, and special offers with an intuitive dashboard that updates in real-time.</p>
                </div>

                <div className="feature-item">
                  <h3>Virtual Tours & Galleries</h3>
                  <p>Showcase your property with stunning photo galleries, virtual tours, and 360-degree views that inspire bookings.</p>
                </div>

                <div className="feature-item">
                  <h3>Multi-Language Support</h3>
                  <p>Reach international guests with multi-language support and currency conversion for global accessibility.</p>
                </div>

                <div className="feature-item">
                  <h3>Guest Portal</h3>
                  <p>Personalized guest accounts for managing reservations, special requests, and loyalty program benefits.</p>
                </div>

                <div className="feature-item">
                  <h3>Payment Processing</h3>
                  <p>Secure payment integration supporting multiple payment methods and currencies for seamless transactions.</p>
                </div>

                <div className="feature-item">
                  <h3>Review Management</h3>
                  <p>Display guest reviews and ratings from TripAdvisor, Google, and Booking.com to build trust and credibility.</p>
                </div>

                <div className="feature-item">
                  <h3>Event & Conference Booking</h3>
                  <p>Dedicated sections for event spaces, conference facilities, and group booking capabilities.</p>
                </div>
              </div>

              <h2>SEO Optimized for Maximum Bookings</h2>
              <p>We build hotel websites with comprehensive SEO optimization to help you rank higher in search results and attract more direct bookings:</p>
              <ul>
                <li>Local SEO for destination-based searches</li>
                <li>Hotel schema markup for rich snippets</li>
                <li>Fast loading speeds for better rankings</li>
                <li>Mobile-first design for travelers</li>
                <li>Content optimization for travel keywords</li>
                <li>Integration with Google Hotel Ads</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are hospitality website specialists with extensive experience creating beautiful, high-converting hotel websites. Our team understands the unique needs of the hotel industry and combines stunning design with powerful booking technology to maximize your direct reservations and revenue.</p>

              <div className="cta-section">
                <h3>Ready to Elevate Your Hotel's Online Presence?</h3>
                <p>Let's create a stunning website that showcases your property and drives more direct bookings.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Booking Engine Integration</li>
                  <li>Room Management</li>
                  <li>Photo Galleries</li>
                  <li>Virtual Tours</li>
                  <li>Multi-Language Support</li>
                  <li>Payment Processing</li>
                  <li>Guest Reviews</li>
                  <li>Event Booking</li>
                  <li>Channel Manager Integration</li>
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
                <p>Contact us today for a free consultation and quote for your hotel website.</p>
                <a href="mailto:digitalsheakh@gmail.com" className="sidebar-cta-btn">Contact Us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
