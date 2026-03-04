// Simple favicon generator without canvas dependency
// Generates SVG-based favicons that can be converted to PNG

const fs = require('fs');
const path = require('path');

// Generate SVG favicon for each size
function generateSVGFavicon(size, outputPath) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0D1B3E"/>
  <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="middle" font-family="serif" font-weight="bold" font-size="${size * 0.45}" fill="#FFFFFF">GS</text>
  <rect x="${size * 0.2}" y="${size * 0.72}" width="${size * 0.6}" height="${size * 0.05}" fill="#00C4D4"/>
</svg>`;

  // Save as SVG (browsers can use SVG favicon directly)
  const svgPath = outputPath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svg);
  console.log(`Generated: ${svgPath}`);

  // For .ico, we'll create a basic version or use online converter
  return svgPath;
}

const publicDir = path.join(__dirname, '..', 'public');

// Generate SVG favicons (browsers support these natively)
generateSVGFavicon(192, path.join(publicDir, 'favicon-192.png'));
generateSVGFavicon(512, path.join(publicDir, 'favicon-512.png'));

console.log('\nNote: SVG favicons generated. For best browser compatibility,');
console.log('you may want to convert these to PNG/ICO using an online tool like:');
console.log('https://realfavicongenerator.net/ or https://favicon.io/');
