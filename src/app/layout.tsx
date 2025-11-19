import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Digital Sheakh - IT solutions for Your Business",
  description: "We offer comprehensive business development services including social media management, website development, and digital marketing.",
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
    "Digital Sheakh",
    "Digital Sheakh Business Development",
    "Business Development Services",
    "Social Media Management",
    "Website Development",
    "Photo Editing Services",
    "Video Editing Services",
    "Digital Marketing",
    "Sheakh Digital",
    "sheakh.digital",
    "TripAdvisor Management",
    "Google Business Profile Management",
    "Facebook Management",
    "Instagram Management",
    "TikTok Management",
    "Review Management",
    "Business Growth Services",
    "Digital Presence Management",
    "Online Reputation Management",
    "Social Media Marketing",
    "Content Creation",
    "Digital Branding",
    "Business Promotion",
    "Online Marketing",
    "Digital Business Solutions",
    "Professional Social Media",
    "Business Social Media",
    "Digital Growth Strategy",
    "Online Business Development",
    "Digital Business Management",
  ].join(", "),
  authors: [{ name: "Digital Sheakh" }],
  creator: "Digital Sheakh",
  publisher: "Digital Sheakh",
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
    siteName: "Digital Sheakh",
    title: "Digital Sheakh - IT solutions for Your Business",
    description: "We offer comprehensive business development services including social media management, website development, and digital marketing.",
    images: [
      {
        url: "https://sheakh.digital/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Sheakh - Website Development, App Development & Digital Marketing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Sheakh - IT solutions for Your Business",
    description: "We offer comprehensive business development services including social media management, website development, and digital marketing.",
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
    "name": "Digital Sheakh",
    "alternateName": ["Sheakh Digital", "Digital Sheakh Website Development", "Digital Sheakh App Development"],
    "url": "https://sheakh.digital",
    "logo": "https://sheakh.digital/logo.png",
    "description": "Digital Sheakh offers professional website development, app development, digital marketing by Digital Sheakh, SEO by Digital Sheakh, and software development with Digital Sheakh. Expert IT solutions for businesses worldwide.",
    "email": "digitalsheakh@gmail.com",
    "slogan": "IT solutions for Your Business",
    "foundingDate": "2020",
    "sameAs": [
      "https://www.instagram.com/digitalsheakh/",
      "https://www.facebook.com/digitalsheakh",
      "https://twitter.com/digitalsheakh",
      "https://www.youtube.com/@digitalsheakh"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "digitalsheakh@gmail.com",
      "contactType": "Customer Service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Bengali"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Business Development by Digital Sheakh",
        "description": "Comprehensive business development services including social media management, website development, and digital marketing.",
        "price": "299",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "299",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      }
    ],
    "serviceType": [
      "Business Development",
      "Social Media Management",
      "Website Development",
      "Photo Editing",
      "Video Editing",
      "TripAdvisor Management",
      "Google Business Profile Management",
      "Review Management",
      "Content Creation"
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "24.4833",
        "longitude": "91.7667"
      },
      "geoRadius": "20000000"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#2d667c" />
        <meta name="format-detection" content="telephone=no" />
        
        
        {/* Additional SEO Tags */}
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        
        {/* BreadcrumbList Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sheakh.digital"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Business Development",
                "item": "https://sheakh.digital/#business-development"
              }
            ]
          }) }}
        />
      </head>
      <body>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        {children}
      </body>
    </html>
  );
}
