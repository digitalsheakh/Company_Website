'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';


export default function TaxiPage() {
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
          
          <h1>Taxi Company Website Development</h1>
          <p className="hero-subtitle">Advanced Digital Solutions for Modern Taxi and Transportation Services</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/taxi.png" 
                  alt="Taxi Company Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Taxi Company Needs a Professional Website</h2>
              <p>Compete with ride-sharing giants and grow your taxi business with a modern website that offers real-time booking, GPS tracking, and seamless payment processing. We specialize in creating advanced taxi service websites that streamline operations and enhance customer experience.</p>

              <h2>Our Taxi Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Real-Time Booking System</h3>
                  <p>Advanced booking platform allowing customers to book rides instantly with real-time driver availability and estimated arrival times.</p>
                </div>

                <div className="feature-item">
                  <h3>GPS Tracking & Navigation</h3>
                  <p>Live GPS tracking for customers to monitor their ride in real-time and for drivers to navigate efficiently to pickup and drop-off locations.</p>
                </div>

                <div className="feature-item">
                  <h3>Automated Fare Calculator</h3>
                  <p>Smart fare calculation based on distance, time, traffic conditions, and surge pricing with transparent cost estimates before booking.</p>
                </div>

                <div className="feature-item">
                  <h3>Driver Management Portal</h3>
                  <p>Comprehensive driver dashboard for managing bookings, tracking earnings, updating availability, and communicating with dispatch.</p>
                </div>

                <div className="feature-item">
                  <h3>Fleet Management</h3>
                  <p>Monitor and manage your entire fleet with real-time vehicle tracking, maintenance scheduling, and performance analytics.</p>
                </div>

                <div className="feature-item">
                  <h3>Multiple Payment Options</h3>
                  <p>Integrated payment processing supporting credit cards, digital wallets, cash, and corporate accounts for flexible payment options.</p>
                </div>

                <div className="feature-item">
                  <h3>Ride History & Receipts</h3>
                  <p>Customer portal with complete ride history, digital receipts, and expense tracking for personal and business use.</p>
                </div>

                <div className="feature-item">
                  <h3>Corporate Accounts</h3>
                  <p>Dedicated corporate booking system with centralized billing, employee management, and detailed reporting.</p>
                </div>

                <div className="feature-item">
                  <h3>Rating & Review System</h3>
                  <p>Two-way rating system for drivers and passengers to maintain service quality and build trust.</p>
                </div>
              </div>

              <h2>Advanced Features for Modern Taxi Services</h2>
              <p>Our taxi websites include cutting-edge features to help you compete in the digital transportation market:</p>
              <ul>
                <li>Automated dispatch system for efficient ride allocation</li>
                <li>Multi-language support for diverse customer base</li>
                <li>SMS and push notifications for ride updates</li>
                <li>Promo codes and loyalty programs</li>
                <li>Airport and special location presets</li>
                <li>Scheduled rides and recurring bookings</li>
                <li>Driver background check integration</li>
                <li>Emergency assistance features</li>
              </ul>

              <h2>SEO Optimized for Local Search</h2>
              <p>We build taxi websites with local SEO optimization to help customers find your services:</p>
              <ul>
                <li>Local SEO for taxi service searches</li>
                <li>Google My Business integration</li>
                <li>Service area optimization</li>
                <li>Mobile-first design for on-the-go bookings</li>
                <li>Fast loading speeds</li>
                <li>Schema markup for transportation services</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are specialists in transportation and taxi website development with extensive experience creating powerful booking platforms. Our team understands the unique challenges of the taxi industry and builds solutions that improve efficiency, reduce costs, and enhance customer satisfaction.</p>

              <div className="cta-section">
                <h3>Ready to Transform Your Taxi Business?</h3>
                <p>Let's create a powerful website that modernizes your operations and helps you compete in the digital age.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Real-Time Booking</li>
                  <li>GPS Tracking</li>
                  <li>Fare Calculator</li>
                  <li>Driver Portal</li>
                  <li>Fleet Management</li>
                  <li>Payment Integration</li>
                  <li>Ride History</li>
                  <li>Corporate Accounts</li>
                  <li>Rating System</li>
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
                <p>Contact us today for a free consultation and quote for your taxi website.</p>
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
