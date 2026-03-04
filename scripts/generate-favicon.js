const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateFavicon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background navy
  ctx.fillStyle = '#0D1B3E';
  ctx.fillRect(0, 0, size, size);

  // Monogram "GS"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.45}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GS', size / 2, size / 2);

  // Cyan underline
  ctx.fillStyle = '#00C4D4';
  ctx.fillRect(size * 0.2, size * 0.72, size * 0.6, size * 0.05);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

const publicDir = path.join(__dirname, '..', 'public');

generateFavicon(16, path.join(publicDir, 'favicon-16.png'));
generateFavicon(32, path.join(publicDir, 'favicon-32.png'));
generateFavicon(192, path.join(publicDir, 'favicon-192.png'));
generateFavicon(512, path.join(publicDir, 'favicon-512.png'));

console.log('All favicons generated successfully!');
