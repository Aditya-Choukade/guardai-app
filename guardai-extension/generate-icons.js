// generate-icons.js — run with: node generate-icons.js
const { createCanvas } = require('canvas');
const fs = require('fs');

[16, 48, 128].forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#7F77DD');
  grad.addColorStop(1, '#534AB7');
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, size, size, size * 0.2);
  ctx.fill();

  // Shield shape
  ctx.fillStyle = 'white';
  ctx.globalAlpha = 0.95;
  const s = size * 0.55;
  const ox = (size - s) / 2;
  const oy = size * 0.18;
  ctx.beginPath();
  ctx.moveTo(ox + s / 2, oy);
  ctx.lineTo(ox + s, oy + s * 0.3);
  ctx.lineTo(ox + s, oy + s * 0.6);
  ctx.quadraticCurveTo(ox + s, oy + s, ox + s / 2, oy + s * 1.1);
  ctx.quadraticCurveTo(ox, oy + s, ox, oy + s * 0.6);
  ctx.lineTo(ox, oy + s * 0.3);
  ctx.closePath();
  ctx.fill();

  // G letter
  ctx.fillStyle = '#534AB7';
  ctx.globalAlpha = 1;
  ctx.font = `bold ${size * 0.32}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', size / 2, size * 0.55);

  fs.mkdirSync('icons', { recursive: true });
  fs.writeFileSync(`icons/icon${size}.png`, canvas.toBuffer('image/png'));
  console.log(`icons/icon${size}.png written`);
});

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
