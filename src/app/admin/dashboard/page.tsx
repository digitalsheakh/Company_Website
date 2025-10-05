'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        loadPosts();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const loadPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const postsData: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully', {
        style: { fontFamily: 'Poppins, sans-serif' },
      });
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out', {
        style: { fontFamily: 'Poppins, sans-serif' },
      });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const deletePromise = deleteDoc(doc(db, 'blogs', id));
      
      toast.promise(
        deletePromise,
        {
          loading: 'Deleting post...',
          success: 'Post deleted successfully!',
          error: 'Failed to delete post',
        },
        {
          style: { fontFamily: 'Poppins, sans-serif' },
        }
      );
      
      try {
        await deletePromise;
        loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a' }}>
              <span style={{ color: '#1a1a1a' }}>Sheakh</span>
              <span style={{ color: '#2d667c' }}>.Digital</span>
              <span style={{ fontSize: '16px', fontWeight: '400', color: '#666', marginLeft: '12px' }}>Admin</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Welcome, {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#666'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d667c', marginBottom: '8px' }}>
              {posts.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Posts</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d667c', marginBottom: '8px' }}>
              {posts.filter(p => p.published).length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Published</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#2d667c', marginBottom: '8px' }}>
              {posts.filter(p => !p.published).length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Drafts</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginBottom: '30px' }}>
          <Link href="/admin/dashboard/new" style={{
            display: 'inline-block',
            padding: '14px 28px',
            backgroundColor: '#2d667c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            + New Blog Post
          </Link>
        </div>

        {/* Blog Posts List */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>Blog Posts</h2>
          </div>

          {posts.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
              <p style={{ fontSize: '16px', marginBottom: '20px' }}>No blog posts yet</p>
              <Link href="/admin/dashboard/new" style={{
                color: '#2d667c',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Create your first post →
              </Link>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id} style={{
                  padding: '20px',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
                        {post.title}
                      </h3>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: post.published ? '#d4edda' : '#fff3cd',
                        color: post.published ? '#155724' : '#856404',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(post.date).toLocaleDateString()} • {post.author}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginLeft: '20px' }}>
                    <Link href={`/admin/dashboard/edit/${post.id}`} style={{
                      padding: '8px 16px',
                      backgroundColor: '#f0f0f0',
                      color: '#333',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#fee',
                        color: '#c33',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      </div>
    </>
  );
}
