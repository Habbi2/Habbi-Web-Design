import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet';

/**
 * Head component for managing page-specific meta tags
 * 
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - Meta description for the page
 * @param {string} props.keywords - Keywords for the page (comma separated)
 * @param {string} props.ogImage - Open Graph image URL (relative to domain root)
 * @param {string} props.ogType - Open Graph content type (default: website)
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.author - Content author (optional)
 * @param {string} props.publishDate - Publication date in ISO format (optional)
 */
const Head = ({ 
  title,
  description,
  keywords,
  ogImage = "/images/og-image.jpg", // Updated default path to ensure correct image location
  ogType = "website",
  canonicalUrl,
  author = "Habbi Web Design Team",
  publishDate
}) => {
  
  const fullTitle = title ? `${title} | Habbi Web Design` : 'Habbi | High-End Web Design Studio';
  // Use the production URL
  const baseUrl = 'https://habbi-web-design.vercel.app';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const url = canonicalUrl || '/';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={fullUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="image" property="og:image" content={ogImageUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullUrl} />
        
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
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;