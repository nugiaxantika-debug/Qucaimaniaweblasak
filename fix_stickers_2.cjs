const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// ATTP fix
code = code.replace(
  /const svgATTP = `<svg width="512" height="512"[\s\S]*?const pngBuffer = await sharp\(Buffer\.from\(svgATTP\)\)\.png\(\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
             GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
             const canvas = createCanvas(512, 512);
             const ctx = canvas.getContext('2d');
             
             ctx.fillStyle = 'transparent';
             ctx.fillRect(0, 0, 512, 512);
             
             ctx.fillStyle = randomColor;
             ctx.font = 'bold 70px "Roboto Bold"';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             
             ctx.lineWidth = 12;
             ctx.strokeStyle = 'white';
             ctx.lineJoin = 'round';
             
             for (let i = 0; i < lines.length; i++) {
                 let y = (startY * 5.12) + (i * 80) + 35;
                 ctx.strokeText(lines[i], 256, y);
                 ctx.fillText(lines[i], 256, y);
             }
             
             const pngBuffer = canvas.toBuffer('image/png');`
);

// Logo fix
code = code.replace(
  /const svgLogo = `<svg width="800" height="800"[\s\S]*?const finalBuffer = await sharp\(Buffer\.from\(svgLogo\)\)\.jpeg\(\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
             GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
             const canvas = createCanvas(800, 800);
             const ctx = canvas.getContext('2d');
             
             const gradient = ctx.createLinearGradient(0, 0, 800, 800);
             gradient.addColorStop(0, '#833ab4');
             gradient.addColorStop(0.5, '#fd1d1d');
             gradient.addColorStop(1, '#fcb045');
             ctx.fillStyle = gradient;
             ctx.fillRect(0, 0, 800, 800);
             
             ctx.font = 'bold 100px "Roboto Bold"';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillStyle = 'white';
             
             ctx.lineWidth = 8;
             ctx.strokeStyle = 'black';
             
             for (let i = 0; i < lines.length; i++) {
                 let y = (startY * 8) + (i * 120) + 50;
                 ctx.strokeText(lines[i], 400, y);
                 ctx.fillText(lines[i], 400, y);
             }
             
             const finalBuffer = await sharp(canvas.toBuffer('image/png')).jpeg().toBuffer();`
);

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("ATTP and Logo patched");
