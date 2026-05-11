import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pharmacy Website Development | Digital Sheakh',
  description: 'Professional pharmacy website development services. Custom websites for pharmacies with prescription management, online ordering, delivery tracking, and secure patient portals. Modernize your pharmacy business.',
  keywords: 'pharmacy website, drugstore website, pharmacy web design, online pharmacy, prescription management, pharmacy booking system, medical website',
  openGraph: {
    title: 'Professional Pharmacy Website Development Services',
    description: 'Transform your pharmacy with a secure website featuring prescription management, online ordering, and delivery services.',
    type: 'website',
  },
};

export default function PharmacyPage() {
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
          
          <h1>Pharmacy Website Development</h1>
          <p className="hero-subtitle">Secure, Compliant Websites for Modern Pharmacies</p>
        </div>
      </div>

      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <div className="service-image-wrapper">
                <Image 
                  src="/images/pharmacy.png" 
                  alt="Pharmacy Website Development" 
                  width={800} 
                  height={500}
                  className="service-image"
                  priority
                />
              </div>

              <h2>Why Your Pharmacy Needs a Professional Website</h2>
              <p>Stay competitive in the evolving healthcare landscape with a modern pharmacy website that offers online prescription management, medication ordering, and delivery services. We specialize in creating secure, HIPAA-compliant pharmacy websites that enhance patient care and streamline operations.</p>

              <h2>Our Pharmacy Website Solutions</h2>
              <div className="features-list">
                <div className="feature-item">
                  <h3>Prescription Management</h3>
                  <p>Secure online prescription refill system allowing patients to request refills, upload new prescriptions, and track their medications.</p>
                </div>

                <div className="feature-item">
                  <h3>Online Ordering System</h3>
                  <p>Enable patients to order over-the-counter medications, health products, and medical supplies for pickup or delivery.</p>
                </div>

                <div className="feature-item">
                  <h3>Patient Portal</h3>
                  <p>HIPAA-compliant patient portal for managing prescriptions, viewing medication history, and accessing health information securely.</p>
                </div>

                <div className="feature-item">
                  <h3>Delivery Tracking</h3>
                  <p>Real-time delivery tracking system keeping patients informed about their medication delivery status.</p>
                </div>

                <div className="feature-item">
                  <h3>Medication Information</h3>
                  <p>Comprehensive drug information database with dosage instructions, side effects, and interaction warnings.</p>
                </div>

                <div className="feature-item">
                  <h3>Appointment Booking</h3>
                  <p>Schedule consultations, vaccinations, and health screenings with integrated appointment booking.</p>
                </div>

                <div className="feature-item">
                  <h3>Insurance Integration</h3>
                  <p>Insurance verification and claims processing to streamline patient transactions and reduce wait times.</p>
                </div>

                <div className="feature-item">
                  <h3>Secure Payment Processing</h3>
                  <p>PCI-compliant payment system supporting multiple payment methods for safe and convenient transactions.</p>
                </div>
              </div>

              <h2>HIPAA Compliant & Secure</h2>
              <p>We build pharmacy websites with the highest security standards to protect patient information and ensure regulatory compliance:</p>
              <ul>
                <li>HIPAA-compliant data handling and storage</li>
                <li>SSL encryption for all data transmission</li>
                <li>Secure patient authentication</li>
                <li>Regular security audits and updates</li>
                <li>GDPR compliance for data privacy</li>
                <li>Secure backup and disaster recovery</li>
              </ul>

              <h2>SEO Optimized for Local Search</h2>
              <p>Our pharmacy websites are optimized for local search to help patients find your services:</p>
              <ul>
                <li>Local SEO for pharmacy searches</li>
                <li>Google My Business integration</li>
                <li>Healthcare schema markup</li>
                <li>Mobile-first design approach</li>
                <li>Fast loading speeds</li>
                <li>Service area optimization</li>
              </ul>

              <h2>Why Choose Digital Sheakh?</h2>
              <p>We are specialists in healthcare and pharmacy website development with deep understanding of regulatory requirements and patient needs. Our team creates secure, user-friendly pharmacy websites that improve patient care while streamlining your pharmacy operations.</p>

              <div className="cta-section">
                <h3>Ready to Modernize Your Pharmacy?</h3>
                <p>Let's create a secure, compliant website that enhances patient care and grows your pharmacy business.</p>
                <Link href="/" className="cta-button">Get Started Today</Link>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Key Features</h3>
                <ul>
                  <li>Prescription Refill System</li>
                  <li>Online Ordering</li>
                  <li>Patient Portal</li>
                  <li>Delivery Tracking</li>
                  <li>Medication Database</li>
                  <li>Appointment Booking</li>
                  <li>Insurance Integration</li>
                  <li>HIPAA Compliance</li>
                  <li>Secure Payments</li>
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
                <p>Contact us today for a free consultation and quote for your pharmacy website.</p>
                <a href="mailto:digitalsheakh@gmail.com" className="sidebar-cta-btn">Contact Us</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
