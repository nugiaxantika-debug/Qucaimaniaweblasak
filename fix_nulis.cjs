const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const regex = /const svgText = `<svg width="1024" height="784"[\s\S]*?const finalBuffer = await sharp\(baseImageBuffer\)[\s\S]*?\.jpeg\(\)\.toBuffer\(\);/g;
const replacement = `const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
           GlobalFonts.registerFromPath(path.join(nulisDir, 'font', 'Indie-Flower.ttf'), 'Indie Flower');
           const canvas = createCanvas(1024, 784);
           const ctx = canvas.getContext('2d');
           
           const bgImg = await loadImage(baseImageBuffer);
           ctx.drawImage(bgImg, 0, 0, 1024, 784);
           
           ctx.fillStyle = '#1b1b1b';
           ctx.textBaseline = 'alphabetic';
           
           ctx.font = '20px "Indie Flower"';
           ctx.fillText(hari, 806, 78);
           
           ctx.font = '18px "Indie Flower"';
           ctx.fillText(tanggal, 806, 102);
           
           ctx.fillText(safeName, 360, 100);
           ctx.fillText('-', 360, 120);
           
           ctx.font = '20px "Indie Flower"';
           for (let i = 0; i < lines.length; i++) {
               ctx.fillText(lines[i], 344, 142 + (i * 19));
           }
           
           const finalBuffer = await sharp(canvas.toBuffer('image/png')).jpeg().toBuffer();`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Nulis patched");
