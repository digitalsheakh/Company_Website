import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Digital Sheakh | Website Development, App Development & Digital Marketing',
  description: 'Read the latest articles from Digital Sheakh about website development, app development, digital marketing, SEO, and software development tips.',
  keywords: 'Digital Sheakh blog, website development blog, app development articles, digital marketing tips, SEO guides, Digital Sheakh insights',
  openGraph: {
    title: 'Digital Sheakh Blog - Website Development & Digital Marketing Insights',
    description: 'Expert insights on website development, app development, digital marketing, and SEO from Digital Sheakh.',
    type: 'website',
    siteName: 'Digital Sheakh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Sheakh Blog',
    description: 'Expert insights on website development, app development, and digital marketing.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
