// OG Image Generator for Habbi Web Design
// Usage: Run this script with Node.js to generate OG images for social sharing

const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_DIR = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Colors from theme
const colors = {
  background: '#0A0A0A',
  primary: '#00E5FF',
  secondary: '#9C27B0',
  accent1: '#FF3D00',
  accent2: '#00E676',
  text: '#FFFFFF'
};

// Page definitions
const pages = [
  {
    name: 'og-image',
    title: 'HIGH-END WEB DESIGN',
    subtitle: 'Bold, minimal designs that demand attention'
  },
  {
    name: 'services-og-image',
    title: 'OUR SERVICES',
    subtitle: 'Comprehensive digital solutions tailored to your needs'
  },
  {
    name: 'about-og-image',
    title: 'ABOUT HABBI',
    subtitle: 'A collective of digital craftspeople creating memorable online experiences'
  },
  {
    name: 'contact-og-image',
    title: 'GET IN TOUCH',
    subtitle: 'Let\'s create exceptional digital experiences together'
  },
  {
    name: 'work-og-image',
    title: 'OUR WORK',
    subtitle: 'Showcasing our exceptional design portfolio'
  }
];

// Create a gradient
function createGradient(ctx, x0, y0, x1, y1, colorStops) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  colorStops.forEach(stop => {
    gradient.addColorStop(stop.offset, stop.color);
  });
  return gradient;
}

async function generateOGImage(page) {
  console.log(`Generating ${page.name}.jpg...`);
  
  // Create canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
  // Add gradient overlay
  const gradient = createGradient(ctx, 0, 0, WIDTH, HEIGHT, [
    { offset: 0, color: 'rgba(0, 229, 255, 0.1)' },
    { offset: 1, color: 'rgba(156, 39, 176, 0.1)' }
  ]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
  try {
    // Load logo
    const logo = await loadImage(path.join(OUTPUT_DIR, 'logo.jpg'));
    
    // Draw logo
    const logoSize = 100;
    ctx.drawImage(logo, 80, 80, logoSize, logoSize);
    
    // Draw brand name
    ctx.font = 'bold 36px "Inter"';
    ctx.fillStyle = colors.text;
    ctx.fillText('HABBI WEB DESIGN', 80, 230);
    
    // Draw page title with gradient
    const titleGradient = createGradient(ctx, 0, 280, WIDTH, 280, [
      { offset: 0, color: colors.primary },
      { offset: 1, color: colors.secondary }
    ]);
    ctx.fillStyle = titleGradient;
    ctx.font = 'bold 72px "Inter"';
    ctx.fillText(page.title, 80, 320);
    
    // Draw subtitle
    ctx.font = '36px "Inter"';
    ctx.fillStyle = colors.text;
    ctx.fillText(page.subtitle, 80, 380);
    
    // Draw decorative elements
    ctx.beginPath();
    ctx.arc(WIDTH - 200, HEIGHT - 200, 80, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${hexToRgb(colors.primary)}, 0.2)`;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(WIDTH - 300, 150, 50, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${hexToRgb(colors.secondary)}, 0.2)`;
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, WIDTH - 40, HEIGHT - 40);
    
    // Save the image
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${page.name}.jpg`), buffer);
    console.log(`Created ${page.name}.jpg`);
  } catch (error) {
    console.error(`Error generating ${page.name}.jpg:`, error);
  }
}

// Helper to convert hex color to rgb
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Generate all OG images
async function generateAllImages() {
  console.log('Generating OG images for social media sharing...');
  
  // Make sure we have a placeholder logo if real one doesn't exist
  const logoPath = path.join(OUTPUT_DIR, 'logo.jpg');
  if (!fs.existsSync(logoPath)) {
    console.log('Logo not found, creating placeholder...');
    const logoCanvas = createCanvas(500, 500);
    const ctx = logoCanvas.getContext('2d');
    
    // Draw a simple H logo
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, 500, 500);
    
    const gradient = createGradient(ctx, 0, 0, 500, 500, [
      { offset: 0, color: colors.primary },
      { offset: 1, color: colors.secondary }
    ]);
    
    ctx.font = 'bold 300px "Inter"';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('H', 250, 250);
    
    const buffer = logoCanvas.toBuffer('image/jpeg');
    fs.writeFileSync(logoPath, buffer);
  }
  
  // Generate each page's OG image
  for (const page of pages) {
    await generateOGImage(page);
  }
  
  console.log('All OG images generated successfully!');
}

// Run the generator
generateAllImages().catch(console.error);