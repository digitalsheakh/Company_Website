import BlogPostClient from './BlogPostClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post - Digital Sheakh',
  description: 'Read insights on business development, social media management, and digital marketing from Digital Sheakh.',
  keywords: 'Digital Sheakh, blog, business development, social media management, digital marketing, website development',
  openGraph: {
    title: 'Digital Sheakh Blog',
    description: 'Insights on business development, social media management, and digital marketing',
    type: 'article',
    siteName: 'Digital Sheakh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Sheakh Blog',
    description: 'Insights on business development, social media management, and digital marketing',
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
