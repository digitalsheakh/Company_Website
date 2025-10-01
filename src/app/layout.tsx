import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheakh Digital - Transforming Ideas into Digital Success",
  description: "Professional IT solutions for modern businesses. We specialize in website development, mobile apps, digital marketing, and SEO. Affordable plans from £29/month. Let's bring your vision to life.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    "Sheakh Digital",
    "sheakh.digital",
    "Digital Sheakh",
    "website development",
    "web development services",
    "custom website design",
    "responsive web design",
    "e-commerce development",
    "app development",
    "mobile app development",
    "iOS app development",
    "Android app development",
    "React Native apps",
    "Flutter apps",
    "digital marketing",
    "digital marketing services",
    "Google Ads management",
    "Meta Ads",
    "Facebook advertising",
    "Instagram advertising",
    "TikTok Ads",
    "TripAdvisor marketing",
    "SEO services",
    "search engine optimization",
    "local SEO",
    "SEO agency",
    "email marketing",
    "content creation",
    "social media management",
    "graphic design services",
    "video production",
    "IT solutions",
    "web design agency",
    "digital agency",
    "Moulvibazar digital services",
    "Sylhet web development",
    "Bangladesh IT services",
  ].join(", "),
  authors: [{ name: "Sheakh Digital" }],
  creator: "Sheakh Digital",
  publisher: "Sheakh Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sheakh.digital",
    siteName: "Sheakh Digital",
    title: "Sheakh Digital - Transforming Ideas into Digital Success",
    description: "Professional IT solutions for modern businesses. Website development, mobile apps, digital marketing & SEO. Affordable plans from £29/month. Let's bring your vision to life.",
    images: [
      {
        url: "https://sheakh.digital/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sheakh Digital - Transforming Ideas into Digital Success",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheakh Digital - Transforming Ideas into Digital Success",
    description: "Professional IT solutions for modern businesses. Website development, mobile apps, digital marketing & SEO. Affordable plans from £29/month.",
    images: ["https://sheakh.digital/twitter-image.jpg"],
    creator: "@digitalsheakh",
  },
  alternates: {
    canonical: "https://sheakh.digital",
  },
  category: "Technology",
  classification: "Business Services",
  other: {
    "contact:email": "digitalsheakh@gmail.com",
    "contact:phone_number": "+880-123-456-7890",
    "contact:address": "Moulvibazar, Sylhet, Bangladesh",
    "business:contact_data:street_address": "Moulvibazar",
    "business:contact_data:locality": "Sylhet",
    "business:contact_data:region": "Sylhet",
    "business:contact_data:postal_code": "3200",
    "business:contact_data:country_name": "Bangladesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sheakh Digital",
    "alternateName": "Digital Sheakh",
    "url": "https://sheakh.digital",
    "logo": "https://sheakh.digital/logo.png",
    "description": "Professional IT solutions including website development, mobile app development, digital marketing, SEO, and content creation services.",
    "email": "digitalsheakh@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moulvibazar",
      "addressLocality": "Sylhet",
      "addressRegion": "Sylhet",
      "postalCode": "3200",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://www.instagram.com/digitalsheakh/",
      "https://www.facebook.com/digitalsheakh",
      "https://twitter.com/digitalsheakh"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "digitalsheakh@gmail.com",
      "contactType": "Customer Service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Bengali"]
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Website Development",
        "description": "Professional website development services starting at £29 per month",
        "price": "29",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "29",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": "Digital Marketing Services",
        "description": "Comprehensive digital marketing including Google Ads, Meta Ads, TikTok Ads",
        "price": "299",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "299",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": "SEO Services",
        "description": "Search engine optimization services to improve your rankings",
        "price": "100",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "100",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        }
      }
    ],
    "serviceType": [
      "Website Development",
      "Mobile App Development",
      "Digital Marketing",
      "SEO Services",
      "Email Marketing",
      "Content Creation",
      "Social Media Management",
      "Graphic Design",
      "Video Production"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
