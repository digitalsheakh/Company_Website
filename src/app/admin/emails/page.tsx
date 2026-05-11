'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface EmailData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  timestamp: any;
}

export default function AdminEmailsPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const q = query(collection(db, 'contact_submissions'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const emailsData: EmailData[] = [];
      
      querySnapshot.forEach((doc) => {
        emailsData.push({
          id: doc.id,
          ...doc.data()
        } as EmailData);
      });
      
      setEmails(emailsData);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this email?')) {
      try {
        await deleteDoc(doc(db, 'contact_submissions', id));
        setEmails(emails.filter(email => email.id !== id));
      } catch (error) {
        console.error('Error deleting email:', error);
      }
    }
  };

  const filteredEmails = emails.filter(email => {
    const matchesFilter = filter === 'all' || email.source === filter;
    const matchesSearch = 
      email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Navigation />
      <main className="admin-emails-page">
        <div className="admin-container">
          <div className="admin-header">
            <h1>Email Management</h1>
            <Link href="/dashboard" className="back-link">← Back to Dashboard</Link>
          </div>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Emails</h3>
              <p className="stat-number">{emails.length}</p>
            </div>
            <div className="stat-card">
              <h3>Contact Forms</h3>
              <p className="stat-number">{emails.filter(e => e.source === 'Get In Touch Form').length}</p>
            </div>
            <div className="stat-card">
              <h3>Live Chat</h3>
              <p className="stat-number">{emails.filter(e => e.source === 'Live Chat').length}</p>
            </div>
          </div>

          <div className="admin-filters">
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Sources</option>
              <option value="Get In Touch Form">Contact Forms</option>
              <option value="Live Chat">Live Chat</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading emails...</div>
          ) : (
            <div className="emails-table-container">
              <table className="emails-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-data">No emails found</td>
                    </tr>
                  ) : (
                    filteredEmails.map((email) => (
                      <tr key={email.id}>
                        <td>{formatDate(email.timestamp)}</td>
                        <td>{email.name}</td>
                        <td>
                          <a href={`mailto:${email.email}`}>{email.email}</a>
                        </td>
                        <td>{email.phone || 'N/A'}</td>
                        <td className="message-cell">
                          <div className="message-preview">{email.message}</div>
                        </td>
                        <td>
                          <span className={`source-badge ${email.source === 'Live Chat' ? 'chat' : 'form'}`}>
                            {email.source}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDelete(email.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
