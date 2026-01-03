import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Digital Sheakh - Digital Solution For Business Owners",
  description: "Professional digital marketing, social media management, content creation, website development, and app development services.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
    "description": "Digital Sheakh offers professional digital marketing, social media management, content creation, design and creative work, website development, and iOS app development. Expert digital solutions for business owners worldwide.",
    "email": "digitalsheakh@gmail.com",
    "slogan": "Digital Solution For Business Owners",
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
        "name": "Digital Services by Digital Sheakh",
        "description": "Professional digital marketing, social media management, content creation, design, website development, and iOS app development services.",
        "availability": "https://schema.org/InStock"
      }
    ],
    "serviceType": [
      "Digital Marketing",
      "Social Media Management",
      "Content Creation",
      "Design and Creative Work",
      "Website Development",
      "iOS App Development"
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
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
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
                "name": "Services",
                "item": "https://sheakh.digital/#services"
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
