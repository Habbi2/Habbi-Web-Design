import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Enhanced Head component for managing page-specific meta tags
 * With improved compatibility for React 19 and Vercel deployment
 */
const Head = ({ 
  title,
  description,
  keywords,
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  author = "Habbi Web Design Team",
  publishDate,
  robots = "index, follow",
  lang = "en",
  themeColor = "#ffffff",
  structuredData
}) => {
  
  const fullTitle = title ? `${title} | Habbi Web Design` : 'Habbi | High-End Web Design Studio';
  // Use your actual production domain here
  const baseUrl = 'https://habbi-web-design.vercel.app';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const url = canonicalUrl || '/';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  // Force update meta tags when component mounts
  useEffect(() => {
    // This helps ensure meta tags are properly updated in React 19
    document.title = fullTitle;
    
    // Force meta description update
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);
    
    // Update essential OpenGraph tags explicitly
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImageUrl);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:url', fullUrl);
    
    // Update Twitter card tags explicitly
    updateMetaTag('twitter:title', fullTitle, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImageUrl, 'name');
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullUrl);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = fullUrl;
      document.head.appendChild(link);
    }
    
    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }
  }, [fullTitle, description, ogImageUrl, ogType, fullUrl, structuredData]);
  
  // Helper function to update or create meta tags
  const updateMetaTag = (property, content, attributeType = 'property') => {
    let meta = document.querySelector(`meta[${attributeType}="${property}"]`);
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute(attributeType, property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };
  
  // Helper function to add structured data
  const addStructuredData = (data) => {
    // Remove any existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  };
  
  return (
    <Helmet defer={false} prioritizeSeoTags>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Responsive design viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Language */}
      <html lang={lang} />
      
      {/* Robots */}
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon links */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content={themeColor} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="image" property="og:image" content={ogImageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Habbi Web Design" />
      <meta property="og:locale" content="en_US" />
      
      {/* Add dimensions for better rendering */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Author information */}
      {author && <meta name="author" content={author} />}
      
      {/* Publication date */}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default Head;