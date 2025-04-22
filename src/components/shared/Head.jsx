import React, { useEffect } from 'react';

/**
 * Custom Head component for managing page-specific meta tags
 * Compatible with React 19 and Vercel deployment
 * No dependencies on react-helmet or react-helmet-async
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
    updateMetaTag('description', description, 'name');
    
    // Set viewport
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0', 'name');
    
    // Set language
    document.documentElement.lang = lang;
    
    // Set robots
    updateMetaTag('robots', robots, 'name');
    
    // Update essential OpenGraph tags explicitly
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImageUrl);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:site_name', 'Habbi Web Design');
    updateMetaTag('og:locale', 'en_US');
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    
    // Keywords
    if (keywords) {
      updateMetaTag('keywords', keywords, 'name');
    }
    
    // Update Twitter card tags explicitly
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', fullTitle, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImageUrl, 'name');
    
    // Set author
    if (author) {
      updateMetaTag('author', author, 'name');
    }
    
    // Set publish date
    if (publishDate) {
      updateMetaTag('article:published_time', publishDate);
    }
    
    // Update canonical URL
    updateCanonicalLink(fullUrl);
    
    // Update favicon links
    updateFaviconLinks();
    
    // Set theme color
    updateMetaTag('theme-color', themeColor, 'name');
    
    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }
    
    // Cleanup function to handle component unmounting
    return () => {
      // Optional: You could remove tags here if needed
      // But typically we don't need to as they'll be replaced by next page
    };
  }, [fullTitle, description, ogImageUrl, ogType, fullUrl, structuredData, keywords, author, publishDate, robots, lang, themeColor]);
  
  return null; // No need to render anything as we're manipulating the document head directly
};

// Helper function to update or create meta tags
const updateMetaTag = (property, content, attributeType = 'property') => {
  if (!content) return; // Skip if content is empty
  
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

// Helper function to update canonical link
const updateCanonicalLink = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (link) {
    link.setAttribute('href', url);
  } else {
    link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
  }
};

// Helper function to update favicon links
const updateFaviconLinks = () => {
  // Helper function to create or update link tags
  const updateLinkTag = (rel, href, type = null, sizes = null) => {
    let link = document.querySelector(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`);
    if (link) {
      link.href = href;
    } else {
      link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
    }
  };

  updateLinkTag('icon', '/vite.svg', 'image/svg+xml');
  updateLinkTag('apple-touch-icon', '/apple-touch-icon.png', null, '180x180');
  updateLinkTag('icon', '/favicon-32x32.png', 'image/png', '32x32');
  updateLinkTag('icon', '/favicon-16x16.png', 'image/png', '16x16');
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

export default Head;