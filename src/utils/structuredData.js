/**
 * Generates structured data for the Habbi Web Design website
 * Ensures consistent implementation of Schema.org data across all pages
 */

/**
 * Create professional service structured data for the company
 * @param {Object} options - Configuration options
 * @param {string} options.name - Business name, defaults to "Habbi Web Design"
 * @param {string} options.description - Business description
 * @param {string} options.publishDate - ISO date string for when content was published (YYYY-MM-DD)
 * @param {string} options.modifiedDate - ISO date string for when content was last modified (YYYY-MM-DD)
 * @param {string} options.imageUrl - URL to the main image, defaults to og-image
 * @returns {Object} - Structured data object
 */
export const createBusinessStructuredData = ({
  name = "Habbi Web Design",
  description = "Bold, minimal designs that demand attention. We craft exceptional digital experiences for brands that want to stand out.",
  publishDate = "2025-04-22",
  modifiedDate,
  imageUrl = "/images/og-image.jpg"
}) => {
  const baseUrl = 'https://habbi-web-design.vercel.app';
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": name,
    "description": description,
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.jpg`,
    "image": fullImageUrl,
    "telephone": "+54-11-3059-9215",
    "email": "habbiwebdesign@gmail.com",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Virrey del pino 1502",
      "addressLocality": "Ciudad Autónoma de Buenos Aires",
      "addressRegion": "CP",
      "postalCode": "1426",
      "addressCountry": "ARG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.052235",
      "longitude": "-118.243683"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design & Development",
            "description": "Custom websites that blend stunning aesthetics with seamless functionality to create memorable online experiences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Identity & Design",
            "description": "Strategic brand development that communicates your unique value proposition and resonates with your target audience."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "description": "User-centered design approach that focuses on creating intuitive, accessible, and engaging digital experiences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Solutions",
            "description": "End-to-end e-commerce development that combines seamless shopping experiences with robust backend systems."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "Strategic digital marketing solutions that increase brand visibility, drive traffic, and convert leads into customers."
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/habbiwebdesign",
      "https://www.linkedin.com/company/habbiwebdesign",
      "https://www.behance.net/habbiwebdesign"
    ],
    "datePublished": publishDate,
    ...(modifiedDate && { "dateModified": modifiedDate })
  };
};

/**
 * Create article structured data for blog content
 * @param {Object} options - Configuration options
 * @param {string} options.headline - Article headline/title
 * @param {string} options.description - Article description
 * @param {string} options.publishDate - ISO date string for when article was published (YYYY-MM-DD)
 * @param {string} options.modifiedDate - ISO date string for when article was last modified
 * @param {string} options.authorName - Name of the author, defaults to "Javier Albertoni"
 * @param {string} options.imageUrl - URL to the main image
 * @returns {Object} - Structured data object
 */
export const createArticleStructuredData = ({
  headline,
  description,
  publishDate = "2025-04-22",
  modifiedDate,
  authorName = "Javier Albertoni",
  imageUrl
}) => {
  const baseUrl = 'https://habbi-web-design.vercel.app';
  const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl || '/images/og-image.jpg'}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Habbi Web Design",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.jpg`
      }
    },
    "datePublished": publishDate,
    ...(modifiedDate && { "dateModified": modifiedDate })
  };
};

/**
 * Create WebPage structured data
 * @param {Object} options - Configuration options
 * @param {string} options.name - Page name/title
 * @param {string} options.description - Page description
 * @param {string} options.publishDate - ISO date string for when page was published (YYYY-MM-DD)
 * @param {string} options.modifiedDate - ISO date string for when page was last modified
 * @param {string} options.url - Page URL, defaults to homepage
 * @returns {Object} - Structured data object
 */
export const createWebPageStructuredData = ({
  name,
  description,
  publishDate = "2025-04-22",
  modifiedDate,
  url = "/"
}) => {
  const baseUrl = 'https://habbi-web-design.vercel.app';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": fullUrl,
    "datePublished": publishDate,
    ...(modifiedDate && { "dateModified": modifiedDate })
  };
};