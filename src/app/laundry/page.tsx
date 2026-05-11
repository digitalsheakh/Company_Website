'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';


export default function LaundryPage() {
  return (
    <>
      <Navigation />
      <main className="service-page">
      <div className="service-hero">
        <div className="container">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <h1>Laundry Company Website Development</h1>
          <p className="hero-subtitle">Modernize Your Laundry Business with a Professional Online Platform</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/laundry.png" 
                  alt="Laundry Company Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Laundry Business Needs a Website</h2>
              <p>Stand out in the competitive laundry industry with a modern website that makes it easy for customers to schedule pickups, view pricing, and manage their orders online. We specialize in creating custom laundry service websites that streamline operations and increase customer satisfaction.</p>

              <h2>Our Laundry Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Online Booking System</h3>
                  <p>Let customers schedule pickup and delivery times 24/7 with an integrated booking system that syncs with your operations.</p>
                </div>

                <div className="feature-item">
                  <h3>Pricing Calculator</h3>
                  <p>Interactive pricing calculator allowing customers to estimate costs based on service type, weight, and special treatments.</p>
                </div>

                <div className="feature-item">
                  <h3>Service Tracking</h3>
                  <p>Enable customers to track their laundry orders in real-time from pickup to delivery with automated status updates.</p>
                </div>

                <div className="feature-item">
                  <h3>Payment Integration</h3>
                  <p>Secure online payment processing for convenient cashless transactions and recurring subscription services.</p>
                </div>

                <div className="feature-item">
                  <h3>Customer Portal</h3>
                  <p>Personalized customer accounts to manage orders, view history, save preferences, and schedule recurring services.</p>
                </div>

                <div className="feature-item">
                  <h3>SMS & Email Notifications</h3>
                  <p>Automated notifications for order confirmations, pickup reminders, and delivery updates to keep customers informed.</p>
                </div>

                <div className="feature-item">
                  <h3>Service Area Management</h3>
                  <p>Define and display your service areas with integrated maps and automatic address validation.</p>
                </div>

                <div className="feature-item">
                  <h3>Mobile-Responsive Design</h3>
                  <p>Fully optimized for mobile devices, making it easy for customers to book services on the go.</p>
                </div>
              </div>

              <h2>SEO Optimized for Local Search</h2>
              <p>We build laundry websites with local SEO optimization to help you rank higher in Google searches for laundry services in your area:</p>
              <ul>
                <li>Local keyword targeting and optimization</li>
                <li>Google My Business integration</li>
                <li>Service area SEO optimization</li>
                <li>Fast loading speeds for better rankings</li>
                <li>Mobile-first design approach</li>
                <li>Schema markup for local businesses</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are specialists in laundry service website development with proven experience helping laundry businesses modernize their operations and grow their customer base. Our team understands the unique challenges of the laundry industry and creates solutions that work.</p>

              <div className="cta-section">
                <h3>Ready to Modernize Your Laundry Business?</h3>
                <p>Let's create a powerful website that streamlines your operations and attracts more customers.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Online Booking System</li>
                  <li>Pickup Scheduling</li>
                  <li>Pricing Calculator</li>
                  <li>Order Tracking</li>
                  <li>Payment Integration</li>
                  <li>Customer Portal</li>
                  <li>SMS Notifications</li>
                  <li>Service Area Maps</li>
                  <li>Subscription Management</li>
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
                <p>Contact us today for a free consultation and quote for your laundry website.</p>
                <a href="mailto:digitalsheakh@gmail.com" className="sidebar-cta-btn">Contact Us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <GetInTouch />
      </main>
    </>
  );
}
