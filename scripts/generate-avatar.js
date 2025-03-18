const { createCanvas } = require('canvas');
const fs = require('fs');

// Create a 32x32 canvas for the pixel art
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Colors - updated to match your appearance
const colors = {
  skin: '#3C2A1C',  // Darker skin tone
  hair: '#1A1A1A',  // Black hair
  necklace: '#FFFFF0',  // Shell white
  background: '#000033',  // Dark blue background (matching portfolio theme)
  smile: '#FFFFFF',  // White smile
  accent: '#ff00ff'  // Neon pink accent (matching portfolio theme)
};

// Clear canvas with background color
ctx.fillStyle = colors.background;
ctx.fillRect(0, 0, 32, 32);

// Draw face shape
ctx.fillStyle = colors.skin;
for(let y = 8; y < 24; y++) {
  for(let x = 8; x < 24; x++) {
    if((x-16)*(x-16) + (y-16)*(y-16) < 100) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// Draw hair - updated to match your hairstyle
ctx.fillStyle = colors.hair;
for(let y = 4; y < 15; y++) {
  for(let x = 6; x < 26; x++) {
    if(y < 12 || (x > 20 && y < 14)) {
      // Create a more textured look for the hair
      if(Math.random() > 0.1) { // Random gaps for texture
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Draw facial hair - fuller beard
ctx.fillStyle = colors.hair;
for(let y = 18; y < 23; y++) {
  for(let x = 9; x < 23; x++) {
    if(y > 19 || (x > 11 && x < 21)) {
      // Random gaps for texture
      if(Math.random() > 0.1) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

// Draw smile - warm and friendly
ctx.fillStyle = colors.smile;
for(let x = 12; x < 20; x++) {
  ctx.fillRect(x, 18, 1, 1);
}
ctx.fillRect(11, 17, 1, 1);
ctx.fillRect(20, 17, 1, 1);

// Draw eyes
ctx.fillStyle = colors.hair;
ctx.fillRect(12, 14, 2, 2);
ctx.fillRect(18, 14, 2, 2);

// Draw puka shell necklace
ctx.fillStyle = colors.necklace;
for(let x = 11; x < 21; x += 2) {
  ctx.fillRect(x, 22, 1, 1);
}

// Add some neon glow effect
ctx.fillStyle = colors.accent;
for(let x = 0; x < 32; x++) {
  ctx.fillRect(x, 0, 1, 1); // Top border
  ctx.fillRect(x, 31, 1, 1); // Bottom border
  ctx.fillRect(0, x, 1, 1); // Left border
  ctx.fillRect(31, x, 1, 1); // Right border
}

// Scale up the image 8x for better visibility
const finalCanvas = createCanvas(256, 256);
const finalCtx = finalCanvas.getContext('2d');
finalCtx.imageSmoothingEnabled = false;
finalCtx.drawImage(canvas, 0, 0, 256, 256);

// Save the image
const buffer = finalCanvas.toBuffer('image/png');
fs.writeFileSync('./portfolio/public/assets/pixel-avatar.png', buffer);

console.log('Pixel avatar generated successfully!'); 