'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import GetInTouch from '@/components/GetInTouch';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'subscription'>('overview');

  // Mock data - will be replaced with real Stripe data
  const currentPlan = {
    name: 'Pro Plan',
    price: 599,
    status: 'active',
    nextBilling: '2026-06-11',
    features: ['Website Management', 'E-commerce', 'Social Media', 'Premium Support']
  };

  const billingHistory = [
    { id: 1, date: '2026-05-11', amount: 599, status: 'paid', invoice: '#INV-001' },
    { id: 2, date: '2026-04-11', amount: 599, status: 'paid', invoice: '#INV-002' },
    { id: 3, date: '2026-03-11', amount: 599, status: 'paid', invoice: '#INV-003' },
  ];

  return (
    <>
      <Navigation />
      <main className="dashboard-page">
        <div className="dashboard-hero">
        <div className="container">
          <Link href="/" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          
          <h1>Account Dashboard</h1>
          <p className="hero-subtitle">Manage your subscription and billing</p>
        </div>
      </div>

      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-layout">
            {/* Sidebar Navigation */}
            <aside className="dashboard-sidebar">
              <nav className="dashboard-nav">
                <button
                  className={`dashboard-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Overview
                </button>

                <button
                  className={`dashboard-nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscription')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Subscription
                </button>

                <Link href="/admin/emails" className="dashboard-nav-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email Management
                </Link>

                <button
                  className={`dashboard-nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('billing')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Billing History
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="dashboard-main">
              {activeTab === 'overview' && (
                <div className="dashboard-section">
                  <h2>Welcome Back!</h2>
                  <p className="section-description">Here's an overview of your account</p>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <h3>Current Plan</h3>
                        <p className="stat-value">{currentPlan.name}</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <h3>Status</h3>
                        <p className="stat-value status-active">Active</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div className="stat-content">
                        <h3>Next Billing</h3>
                        <p className="stat-value">{currentPlan.nextBilling}</p>
                      </div>
                    </div>
                  </div>

                  <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                      <Link href="/pricing" className="action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upgrade Plan
                      </Link>
                      <button className="action-btn action-btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Update Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'subscription' && (
                <div className="dashboard-section">
                  <h2>Subscription Details</h2>
                  <p className="section-description">Manage your current subscription</p>

                  <div className="subscription-card">
                    <div className="subscription-header">
                      <div>
                        <h3>{currentPlan.name}</h3>
                        <p className="subscription-price">£{currentPlan.price}/month</p>
                      </div>
                      <span className="status-badge status-active">Active</span>
                    </div>

                    <div className="subscription-details">
                      <div className="detail-row">
                        <span className="detail-label">Next billing date:</span>
                        <span className="detail-value">{currentPlan.nextBilling}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Amount:</span>
                        <span className="detail-value">£{currentPlan.price}</span>
                      </div>
                    </div>

                    <div className="subscription-features">
                      <h4>Included Features:</h4>
                      <ul>
                        {currentPlan.features.map((feature, index) => (
                          <li key={index}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="subscription-actions">
                      <Link href="/pricing" className="btn-primary">Change Plan</Link>
                      <button className="btn-danger">Cancel Subscription</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="dashboard-section">
                  <h2>Billing History</h2>
                  <p className="section-description">View and download your invoices</p>

                  <div className="billing-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Invoice</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingHistory.map((bill) => (
                          <tr key={bill.id}>
                            <td className="invoice-number">{bill.invoice}</td>
                            <td>{bill.date}</td>
                            <td className="amount">£{bill.amount}</td>
                            <td>
                              <span className="status-badge status-paid">{bill.status}</span>
                            </td>
                            <td>
                              <button className="btn-download">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
      </main>
    </>
  );
}
