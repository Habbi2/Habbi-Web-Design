// Dark mode theme with vibrant accent colors
export const theme = {
  colors: {
    // Main colors
    background: '#0A0A0A',
    backgroundAlt: '#111111',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    
    // Vibrant accent colors
    primary: '#00E5FF',     // Bright cyan
    secondary: '#FF3D00',   // Vibrant orange
    tertiary: '#9C27B0',    // Rich purple
    accent1: '#FFD600',     // Bright yellow
    accent2: '#00E676',     // Bright green
    
    // Gradient combinations
    gradient1: 'linear-gradient(135deg, #00E5FF 0%, #9C27B0 100%)',
    gradient2: 'linear-gradient(135deg, #FF3D00 0%, #FFD600 100%)',
  },
  
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif",
    accent: "'Space Grotesk', sans-serif",
  },
  
  sizes: {
    maxWidth: '1400px',
    headerHeight: '80px',
  },
  
  transitions: {
    default: '0.3s ease',
    slow: '0.6s ease-in-out',
    fast: '0.2s ease',
  },
  
  shadows: {
    small: '0 2px 10px rgba(0, 229, 255, 0.15)',
    medium: '0 5px 25px rgba(0, 229, 255, 0.2)',
    large: '0 10px 50px rgba(0, 229, 255, 0.3)',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
};

// For reference, we'll need to add these Google Fonts in our index.html:
// - Montserrat (for bold headings)
// - Inter (for clean body text)
// - Space Grotesk (for accent/special elements)