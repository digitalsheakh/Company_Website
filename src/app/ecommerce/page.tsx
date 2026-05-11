'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';

export default function EcommercePage() {
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
          
          <h1>E-commerce Website Development</h1>
          <p className="hero-subtitle">Build a Powerful Online Store That Drives Sales and Growth</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/ecommerce.png" 
                  alt="E-commerce Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Choose Our E-commerce Solutions?</h2>
              <p>Launch your online business with a fully-featured e-commerce website designed to maximize sales and provide an exceptional shopping experience. We specialize in creating custom online stores that are secure, scalable, and optimized for conversions.</p>

              <h2>Our E-commerce Website Features</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Secure Payment Integration</h3>
                  <p>Accept payments safely with integrated payment gateways including credit cards, PayPal, Stripe, and more. PCI-compliant and fully secure.</p>
                </div>

                <div className="feature-item">
                  <h3>Inventory Management</h3>
                  <p>Manage your products, stock levels, and variants with an intuitive dashboard. Automatic low-stock alerts and easy product updates.</p>
                </div>

                <div className="feature-item">
                  <h3>Shopping Cart & Checkout</h3>
                  <p>Streamlined shopping cart and checkout process designed to reduce cart abandonment and increase conversions.</p>
                </div>

                <div className="feature-item">
                  <h3>Product Management</h3>
                  <p>Easily add, edit, and organize products with multiple images, descriptions, pricing, and category management.</p>
                </div>

                <div className="feature-item">
                  <h3>Order Management</h3>
                  <p>Track orders, manage fulfillment, and communicate with customers through an integrated order management system.</p>
                </div>

                <div className="feature-item">
                  <h3>Customer Accounts</h3>
                  <p>Let customers create accounts to track orders, save favorites, and speed up future purchases.</p>
                </div>

                <div className="feature-item">
                  <h3>Mobile Commerce</h3>
                  <p>Fully responsive design optimized for mobile shopping, ensuring customers can buy from any device.</p>
                </div>

                <div className="feature-item">
                  <h3>Marketing Tools</h3>
                  <p>Built-in SEO, email marketing integration, discount codes, and promotional tools to drive sales.</p>
                </div>
              </div>

              <h2>SEO Optimized for Maximum Visibility</h2>
              <p>We build e-commerce websites with comprehensive SEO optimization to help you rank higher in search results and attract more customers:</p>
              <ul>
                <li>Product page SEO optimization</li>
                <li>Fast loading speeds for better rankings</li>
                <li>Mobile-first indexing ready</li>
                <li>Rich snippets and schema markup</li>
                <li>SEO-friendly URLs and metadata</li>
                <li>Image optimization for faster loading</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are e-commerce specialists with extensive experience building successful online stores across various industries. Our team combines technical expertise with marketing knowledge to create stores that not only look great but also drive sales and revenue.</p>

              <div className="cta-section">
                <h3>Ready to Launch Your Online Store?</h3>
                <p>Let's build a powerful e-commerce website that turns visitors into customers and grows your business.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Payment Gateway Integration</li>
                  <li>Shopping Cart System</li>
                  <li>Product Catalog</li>
                  <li>Inventory Management</li>
                  <li>Order Tracking</li>
                  <li>Customer Accounts</li>
                  <li>Discount & Coupon System</li>
                  <li>Email Marketing</li>
                  <li>Analytics & Reporting</li>
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
                <p>Contact us today for a free consultation and quote for your e-commerce website.</p>
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
