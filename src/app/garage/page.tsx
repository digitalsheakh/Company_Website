'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';

export default function GaragePage() {
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
          
          <h1>Garage & Auto Repair Website Development</h1>
          <p className="hero-subtitle">Drive More Customers to Your Auto Repair Shop with a Professional Website</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/garage.png" 
                  alt="Garage & Auto Repair Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Garage Needs a Professional Website</h2>
              <p>Stand out from the competition with a modern, professional website that makes it easy for customers to find you, book services, and trust your expertise. We specialize in creating custom garage and auto repair websites that drive more business.</p>

              <h2>Our Garage Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Online Appointment Booking</h3>
                  <p>Let customers book service appointments 24/7 with an integrated scheduling system that syncs with your calendar.</p>
                </div>

                <div className="feature-item">
                  <h3>Service Catalog</h3>
                  <p>Display all your services with detailed descriptions, pricing, and estimated completion times to help customers make informed decisions.</p>
                </div>

                <div className="feature-item">
                  <h3>Customer Portal</h3>
                  <p>Provide customers with access to their service history, upcoming appointments, and maintenance reminders.</p>
                </div>

                <div className="feature-item">
                  <h3>Quote Request System</h3>
                  <p>Enable customers to request quotes online by describing their vehicle issues or required services.</p>
                </div>

                <div className="feature-item">
                  <h3>Review Management</h3>
                  <p>Showcase positive customer reviews and testimonials to build trust and credibility with potential clients.</p>
                </div>

                <div className="feature-item">
                  <h3>Mobile-First Design</h3>
                  <p>Your website will work flawlessly on all devices, making it easy for customers to book services on the go.</p>
                </div>
              </div>

              <h2>SEO Optimized for Local Search</h2>
              <p>We build garage websites with local SEO optimization to help you rank higher in Google searches for auto repair services in your area. Our SEO strategies include:</p>
              <ul>
                <li>Google My Business integration</li>
                <li>Local keyword optimization</li>
                <li>Service area targeting</li>
                <li>Fast loading speeds</li>
                <li>Mobile optimization</li>
                <li>Schema markup for automotive services</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are specialists in automotive website development with extensive experience helping garages and auto repair shops grow their online presence. Our team understands the unique needs of the automotive industry and creates websites that convert visitors into loyal customers.</p>

              <div className="cta-section">
                <h3>Ready to Accelerate Your Garage Business?</h3>
                <p>Let's create a powerful website that drives more customers to your auto repair shop.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Online Booking System</li>
                  <li>Service Catalog</li>
                  <li>Quote Request Forms</li>
                  <li>Customer Portal</li>
                  <li>Payment Integration</li>
                  <li>SMS Notifications</li>
                  <li>Review Management</li>
                  <li>Google Maps Integration</li>
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
                <p>Contact us today for a free consultation and quote for your garage website.</p>
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
