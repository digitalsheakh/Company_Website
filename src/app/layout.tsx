import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Sheakh - IT solutions for Your Business",
  description: "Transform your business with professional website development, mobile app development, digital marketing, and SEO services. Affordable IT solutions tailored to help your business grow online.",
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
    "Digital Sheakh Website Development",
    "Digital Sheakh App Development",
    "Digital Marketing By Digital Sheakh",
    "SEO by Digital Sheakh",
    "Software Development with Digital Sheakh",
    "Sheakh Digital",
    "sheakh.digital",
    "website development by Digital Sheakh",
    "web development services Digital Sheakh",
    "custom website design Digital Sheakh",
    "responsive web design",
    "e-commerce development Digital Sheakh",
    "app development Digital Sheakh",
    "mobile app development Digital Sheakh",
    "iOS app development",
    "Android app development",
    "React Native apps Digital Sheakh",
    "Flutter apps",
    "digital marketing services Digital Sheakh",
    "Google Ads management Digital Sheakh",
    "Meta Ads by Digital Sheakh",
    "Facebook advertising Digital Sheakh",
    "Instagram advertising",
    "TikTok Ads Digital Sheakh",
    "TripAdvisor marketing",
    "SEO services Digital Sheakh",
    "search engine optimization Digital Sheakh",
    "local SEO Digital Sheakh",
    "SEO agency Digital Sheakh",
    "email marketing Digital Sheakh",
    "content creation Digital Sheakh",
    "social media management",
    "graphic design services",
    "video production",
    "IT solutions Digital Sheakh",
    "software development Digital Sheakh",
    "web design agency Digital Sheakh",
    "digital agency Digital Sheakh",
    "Moulvibazar digital services",
    "Bangladesh web development",
    "professional website development",
    "affordable app development",
    "best digital marketing agency",
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
    description: "Transform your business with professional website development, mobile app development, digital marketing, and SEO services. Affordable IT solutions tailored to help your business grow online.",
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
    description: "Transform your business with professional website development, mobile app development, digital marketing, and SEO services. Affordable IT solutions tailored to help your business grow online.",
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
    "name": "Digital Sheakh",
    "alternateName": ["Sheakh Digital", "Digital Sheakh Website Development", "Digital Sheakh App Development"],
    "url": "https://sheakh.digital",
    "logo": "https://sheakh.digital/logo.png",
    "description": "Digital Sheakh offers professional website development, app development, digital marketing by Digital Sheakh, SEO by Digital Sheakh, and software development with Digital Sheakh. Expert IT solutions for businesses worldwide.",
    "email": "digitalsheakh@gmail.com",
    "slogan": "IT solutions for Your Business",
    "foundingDate": "2020",
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
        "name": "Website Development by Digital Sheakh",
        "description": "Professional website development services by Digital Sheakh starting at £29 per month. Custom web design, responsive websites, e-commerce solutions.",
        "price": "29",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "29",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "App Development by Digital Sheakh",
        "description": "Mobile app development services by Digital Sheakh. iOS, Android, React Native, and Flutter app development with affordable monthly plans.",
        "price": "99",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "99",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Digital Marketing by Digital Sheakh",
        "description": "Comprehensive digital marketing by Digital Sheakh including Google Ads, Meta Ads, TikTok Ads, and social media management.",
        "price": "199",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "199",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "SEO by Digital Sheakh",
        "description": "Search engine optimization services by Digital Sheakh to improve your rankings. Local SEO, technical SEO, and content optimization.",
        "price": "99",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "99",
          "priceCurrency": "GBP",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Software Development with Digital Sheakh",
        "description": "Custom software development with Digital Sheakh. Enterprise solutions, web applications, and business automation software.",
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
      "Website Development",
      "Mobile App Development",
      "Digital Marketing",
      "SEO Services",
      "Software Development",
      "Email Marketing",
      "Content Creation",
      "Social Media Management",
      "Graphic Design",
      "Video Production",
      "Google Ads Management",
      "Meta Ads Management",
      "TikTok Advertising"
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
        
        {/* Geo Tags */}
        <meta name="geo.region" content="BD-G" />
        <meta name="geo.placename" content="Moulvibazar" />
        <meta name="geo.position" content="24.4833;91.7667" />
        <meta name="ICBM" content="24.4833, 91.7667" />
        
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
        
        {/* Additional Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Digital Sheakh",
            "image": "https://sheakh.digital/logo.png",
            "@id": "https://sheakh.digital",
            "url": "https://sheakh.digital",
            "telephone": "+880-123-456-7890",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Moulvibazar",
              "addressLocality": "Sylhet",
              "postalCode": "3200",
              "addressCountry": "BD"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 24.4833,
              "longitude": 91.7667
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          }) }}
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
                "name": "Website Development",
                "item": "https://sheakh.digital/#websites"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "App Development",
                "item": "https://sheakh.digital/#app-development"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Digital Marketing",
                "item": "https://sheakh.digital/#digital-marketing"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "SEO Services",
                "item": "https://sheakh.digital/#seo"
              }
            ]
          }) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
