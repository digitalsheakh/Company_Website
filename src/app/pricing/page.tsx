'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';

const pricingPlans = [
  {
    id: 'basic-plan',
    name: 'Basic Plan',
    price: 299,
    period: 'month',
    description: 'Perfect for small businesses starting their digital journey',
    popular: false,
    features: {
      'Website Design & Development': [
        'Custom Website Design',
        'Up to 5 Pages',
        'Responsive Mobile Design',
        'Contact Form Integration',
        'Basic SEO Setup'
      ],
      'Domain & Hosting Management': [
        'Domain Registration Assistance',
        'Hosting Setup & Configuration',
        'SSL Certificate Installation',
        'Email Setup (up to 5 accounts)'
      ],
      'Maintenance & Support': [
        'Monthly Website Backups',
        'Security Updates',
        'Content Updates (2 per month)',
        'Live Support (Email)',
        'Monthly Performance Report'
      ]
    }
  },
  {
    id: 'ecommerce-plan',
    name: 'E-commerce Plan',
    price: 499,
    period: 'month',
    description: 'Complete online store solution with product management',
    popular: false,
    features: {
      'E-commerce Website': [
        'Custom Online Store Design',
        'Up to 10 Pages',
        'Product Catalog Setup',
        'Shopping Cart Integration',
        'Responsive Mobile Design'
      ],
      'Product Management': [
        'Product Photography (10 products/month)',
        'Product Listing & Descriptions',
        'Inventory Management System',
        'Payment Gateway Integration',
        'Order Management System'
      ],
      'Hosting & Maintenance': [
        'Domain & Hosting Setup',
        'SSL Certificate',
        'Weekly Backups',
        'Security Updates',
        'Email Support'
      ]
    }
  },
  {
    id: 'social-media-plan',
    name: 'Social Media Plan',
    price: 399,
    period: 'month',
    description: 'Professional social media management and content creation',
    popular: false,
    features: {
      'Content Creation': [
        '20 Custom Posts per Month',
        'Professional Graphics Design',
        'Copywriting & Captions',
        'Hashtag Research',
        'Content Calendar Planning'
      ],
      'Platform Management': [
        '4 Social Media Platforms',
        'Daily Posting Schedule',
        'Community Engagement',
        'Comment & Message Management',
        'Follower Growth Strategy'
      ],
      'Analytics & Reporting': [
        'Monthly Performance Report',
        'Audience Insights',
        'Engagement Analytics',
        'Growth Tracking',
        'Strategy Optimization'
      ]
    }
  },
  {
    id: 'pro-plan',
    name: 'Pro Plan',
    price: 799,
    period: 'month',
    description: 'Complete digital solution - Website + E-commerce + Social Media',
    popular: true,
    features: {
      'Everything in Basic Plan': [
        'All Basic Plan Features',
        'Up to 15 Pages',
        'Advanced SEO Optimization',
        'Blog Integration',
        'Analytics Dashboard'
      ],
      'E-commerce Features': [
        'Full Online Store',
        'Product Photography (15 products/month)',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Processing System'
      ],
      'Social Media Management': [
        'Content Creation (25 posts/month)',
        'Social Media Strategy',
        '5 Platform Management',
        'Community Engagement',
        'Monthly Analytics Report'
      ],
      'Premium Support': [
        'Priority Live Support (Phone & Email)',
        'Weekly Content Updates',
        'Daily Backups',
        'Dedicated Account Manager',
        'Monthly Strategy Call'
      ]
    }
  }
];

export default function PricingPage() {
  const handleCheckout = async (planId: string) => {
    // This will be connected to Stripe checkout
    console.log('Checkout:', planId);
    // TODO: Implement Stripe checkout
  };

  return (
    <>
      <Navigation />
      <main className="pricing-page">
        <div className="pricing-hero">
        <div className="container">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <h1>Simple, Transparent Pricing</h1>
          <p className="hero-subtitle">Choose the perfect plan for your business growth</p>
        </div>
      </div>

      <section className="pricing-content">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span className="currency">£</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>

                <div className="plan-features-wrapper">
                  {Object.entries(plan.features).map(([category, features]) => (
                    <div key={category} className="feature-category">
                      <h4 className="category-title">{category}</h4>
                      <ul className="plan-features">
                        {(features as string[]).map((feature, index) => (
                          <li key={index}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button 
                  className="plan-button"
                  onClick={() => handleCheckout(plan.id)}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Custom Solutions */}
          <div className="custom-solution">
            <h2>Need Something Custom?</h2>
            <p>We create tailored solutions for unique business needs. Let's discuss your project!</p>
            <Link href="mailto:digitalsheakh@gmail.com" className="contact-button">
              Contact Us for Custom Quote
            </Link>
          </div>
        </div>
      </section>

      <GetInTouch />
      </main>
    </>
  );
}
