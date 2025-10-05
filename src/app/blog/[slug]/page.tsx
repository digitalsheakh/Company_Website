import BlogPostClient from './BlogPostClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Post - Digital Sheakh',
  description: 'Read insights on website development, app development, digital marketing, and SEO from Digital Sheakh.',
  keywords: 'Digital Sheakh, blog, website development, app development, digital marketing, SEO',
  openGraph: {
    title: 'Digital Sheakh Blog',
    description: 'Insights on website development, app development, and digital marketing',
    type: 'article',
    siteName: 'Digital Sheakh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Sheakh Blog',
    description: 'Insights on website development, app development, and digital marketing',
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
