'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';

export default function NewBlogPost() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Digital Sheakh Team');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async (publishNow: boolean) => {
    if (!title || !content) {
      toast.error('Please fill in title and content', {
        style: { fontFamily: 'Poppins, sans-serif' },
      });
      return;
    }

    setSaving(true);
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const savePromise = addDoc(collection(db, 'blogs'), {
      title,
      excerpt,
      content,
      author,
      tags: tagsArray,
      image,
      published: publishNow,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    toast.promise(
      savePromise,
      {
        loading: publishNow ? 'Publishing...' : 'Saving draft...',
        success: publishNow ? 'Blog post published! 🎉' : 'Draft saved successfully!',
        error: 'Failed to save post',
      },
      {
        style: { fontFamily: 'Poppins, sans-serif' },
      }
    );

    try {
      await savePromise;
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setSaving(false);
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
              New Blog Post
            </h1>
          </div>
          <Link href="/admin/dashboard" style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            color: '#666'
          }}>
            ← Back
          </Link>
        </div>
      </header>

      {/* Editor */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {/* Title */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          {/* Excerpt */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Excerpt (Short Description)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your blog post (shows on blog list page)"
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Content */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Content * (Markdown supported)
            </label>
            <SimpleMDE
              value={content}
              onChange={setContent}
              options={{
                spellChecker: false,
                placeholder: 'Write your blog content here... (Markdown supported)',
                minHeight: '400px',
              }}
            />
          </div>

          {/* Author */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Website Development, SEO, Digital Marketing"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Featured Image */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#333' }}>
              Featured Image URL (optional)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              style={{
                padding: '14px 28px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              style={{
                padding: '14px 28px',
                backgroundColor: saving ? '#ccc' : '#2d667c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </div>
      </main>
      </div>
    </>  
  );
}
