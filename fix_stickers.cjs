const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// 1. Fix Brat
code = code.replace(
  /const svg = `<svg width="512" height="512"[\s\S]*?const stickerBuffer = await sharp\(Buffer\.from\(svg\)\)\.webp\(\{ quality: 80 \}\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
           GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
           const canvas = createCanvas(512, 512);
           const ctx = canvas.getContext('2d');
           ctx.fillStyle = 'white';
           ctx.fillRect(0, 0, 512, 512);
           ctx.fillStyle = 'black';
           ctx.font = '60px "Roboto Bold"';
           ctx.textAlign = 'center';
           ctx.textBaseline = 'middle';
           
           for (let i = 0; i < lines.length; i++) {
               ctx.fillText(lines[i], 256, (startY * 5.12) + (i * 60) + 30);
           }
           
           const stickerBuffer = await sharp(canvas.toBuffer('image/png')).webp({ quality: 80 }).toBuffer();`
);

// 2. Fix Smeme
code = code.replace(
  /const svgMeme = `<svg width="512" height="512"[\s\S]*?const stickerBuffer = await sharp\(bgBuffer\)[\s\S]*?\.webp\(\{ quality: 80 \}\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
             GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
             const canvas = createCanvas(512, 512);
             const ctx = canvas.getContext('2d');
             
             const bgImage = await loadImage(bgBuffer);
             ctx.drawImage(bgImage, 0, 0, 512, 512);
             
             ctx.font = '60px "Roboto Bold"';
             ctx.textAlign = 'center';
             ctx.fillStyle = 'white';
             ctx.lineWidth = 4;
             ctx.strokeStyle = 'black';
             
             // Atas
             ctx.textBaseline = 'top';
             ctx.strokeText(atas.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 10);
             ctx.fillText(atas.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 10);
             
             // Bawah
             ctx.textBaseline = 'bottom';
             ctx.strokeText(bawah.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 502);
             ctx.fillText(bawah.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 502);
             
             const stickerBuffer = await sharp(canvas.toBuffer('image/png')).webp({ quality: 80 }).toBuffer();`
);

// 3. Fix Bratgambar
code = code.replace(
  /const svgText = `<svg width="512" height="512"[\s\S]*?const stickerBuffer = await sharp\(baseImageBuffer\)[\s\S]*?\.webp\(\{ quality: 80 \}\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
               GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
               const canvas = createCanvas(512, 512);
               const ctx = canvas.getContext('2d');
               
               const bgImage = await loadImage(baseImageBuffer);
               ctx.drawImage(bgImage, 0, 0, 512, 512);
               
               // semi-transparent overlay just like original logic? Actually original had no overlay?
               // Let's just draw text over it
               ctx.fillStyle = 'black';
               ctx.font = '60px "Roboto Bold"';
               ctx.textAlign = 'center';
               ctx.textBaseline = 'middle';
               
               for (let i = 0; i < lines.length; i++) {
                   ctx.fillText(lines[i], 256, (startY * 5.12) + (i * 60) + 30);
               }
               
               const stickerBuffer = await sharp(canvas.toBuffer('image/png')).webp({ quality: 80 }).toBuffer();`
);

// 4. Fix Logo
code = code.replace(
  /const svgLogo = `<svg width="800" height="800"[\s\S]*?const stickerBuffer = await sharp\(Buffer\.from\(svgLogo\)\)[\s\S]*?\.webp\(\{ quality: 80 \}\)\.toBuffer\(\);/g,
  `const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
             GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
             const canvas = createCanvas(800, 800);
             const ctx = canvas.getContext('2d');
             
             const gradient = ctx.createLinearGradient(0, 0, 800, 800);
             gradient.addColorStop(0, '#111');
             gradient.addColorStop(1, '#333');
             ctx.fillStyle = gradient;
             ctx.fillRect(0, 0, 800, 800);
             
             ctx.font = 'bold 80px "Roboto Bold"';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillStyle = '#ffaa00';
             
             // shadow effect
             ctx.shadowColor = '#ff5500';
             ctx.shadowBlur = 20;
             ctx.shadowOffsetX = 5;
             ctx.shadowOffsetY = 5;
             
             for (let i = 0; i < lines.length; i++) {
                 ctx.fillText(lines[i], 400, (startY * 8) + (i * 90) + 40);
             }
             
             const stickerBuffer = await sharp(canvas.toBuffer('image/png')).webp({ quality: 80 }).toBuffer();`
);

// 5. Fix ATTP
code = code.replace(
  /const svgATTP = `<svg width="512" height="512"[\s\S]*?const stickerBuffer = await sharp\(Buffer\.from\(svgATTP\)\)[\s\S]*?\.webp\(\{ quality: 80 \}\)\.toBuffer\(\);/g,
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
             
             // Stroke effect
             ctx.lineWidth = 12;
             ctx.strokeStyle = 'white';
             ctx.lineJoin = 'round';
             
             for (let i = 0; i < lines.length; i++) {
                 let y = (startY * 5.12) + (i * 80) + 35;
                 ctx.strokeText(lines[i], 256, y);
                 ctx.fillText(lines[i], 256, y);
             }
             
             const stickerBuffer = await sharp(canvas.toBuffer('image/png')).webp({ quality: 80 }).toBuffer();`
);

// 6. Fix Bratvid
// Just replace the disabled message with a real generation. We can use ryzen's brat api or just generate a basic one
const bratvidDisabled = `} else if (body.startsWith(".bratvid ") || body === ".bratvid" || body.startsWith("bratvid ") || body === "bratvid") {
       await this.sock.sendMessage(jid, { text: \`Fitur bratvid sementara dinonaktifkan.\` }, { quoted: msg });`;

const bratvidEnabled = `} else if (body.startsWith(".bratvid ") || body === ".bratvid" || body.startsWith("bratvid ") || body === "bratvid") {
       let text = messageContent.replace(/^\\.?bratvid\\s*/i, "").trim() || "Brat";
       try {
           await this.sock.sendMessage(jid, { text: "⏳ *Sedang membuat brat video... (Mungkin butuh waktu beberapa detik)*" }, { quoted: msg });
           // We can use api.ryzen for bratvid since local generation with ffmpeg is very heavy
           const axios = require('axios');
           const res = await axios.get(\`https://api.ryzendesu.vip/api/sticker/brat-video?text=\${encodeURIComponent(text)}\`, { responseType: 'arraybuffer' });
           if (res.data) {
               await this.sock.sendMessage(jid, { sticker: res.data }, { quoted: msg });
           } else {
               throw new Error("No data");
           }
       } catch (e) {
           console.error("Bratvid error:", e);
           await this.sock.sendMessage(jid, { text: \`❌ Gagal membuat brat video. Pastikan teks tidak terlalu panjang dan API tersedia.\` }, { quoted: msg });
       }`;

code = code.replace(bratvidDisabled, bratvidEnabled);

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Stickers patched");
