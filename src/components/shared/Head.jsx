import React, { useEffect } from 'react';

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
 */
const Head = ({ 
  title,
  description,
  keywords,
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | Habbi Web Design` : 'Habbi | High-End Web Design Studio';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update OG tags
    const ogTags = {
      'og:title': title ? `${title} | Habbi Web Design` : 'Habbi | High-End Web Design Studio',
      'og:description': description,
      'og:image': `https://habbiwebdesign.com${ogImage}`,
      'og:type': ogType,
      'og:url': canonicalUrl || window.location.href,
      'twitter:title': title ? `${title} | Habbi Web Design` : 'Habbi | High-End Web Design Studio',
      'twitter:description': description,
      'twitter:image': `https://habbiwebdesign.com${ogImage}`,
    };
    
    // Update OG meta tags
    Object.keys(ogTags).forEach(key => {
      const metaTag = document.querySelector(`meta[property="${key}"]`);
      if (metaTag && ogTags[key]) {
        metaTag.setAttribute('content', ogTags[key]);
      }
    });
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonicalUrl) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }
    
    return () => {
      // Reset to default values on unmount
      document.title = 'Habbi | High-End Web Design Studio';
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  // This component doesn't render anything visible
  return null;
};

export default Head;