const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const regex = /\} else if \(body\.startsWith\("\.bratvid "\)[\s\S]*?(?=\} else if \(body\.startsWith\("\.brat "\))/g;
const replacement = `} else if (body.startsWith(".bratvid ") || body === ".bratvid" || body.startsWith("bratvid ") || body === "bratvid") {
       let text = messageContent.replace(/^\\.?bratvid\\s*/i, "").trim() || "Brat";
       try {
           await this.sock.sendMessage(jid, { text: "⏳ *Sedang membuat brat video... (Mungkin butuh waktu beberapa detik)*" }, { quoted: msg });
           
           const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
           const path = require('path');
           const fs = require('fs');
           const { execSync } = require('child_process');
           const ffmpegPath = require('ffmpeg-static');
           
           GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');
           
           const words = text.split(' ');
           const framesDir = path.join(process.cwd(), 'frames_' + Date.now());
           if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);
           
           const canvas = createCanvas(512, 512);
           const ctx = canvas.getContext('2d');
           
           for (let i = 0; i < words.length; i++) {
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, 512, 512);
              ctx.fillStyle = 'black';
              ctx.font = '60px "Roboto Bold"';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              const currentWords = words.slice(0, i + 1);
              let lines = [];
              let currentLine = '';
              for (let word of currentWords) {
                  if ((currentLine + word).length > 15 && currentLine.length > 0) {
                      lines.push(currentLine);
                      currentLine = word + ' ';
                  } else {
                      currentLine += word + ' ';
                  }
              }
              if (currentLine) lines.push(currentLine);
              
              const startY = 50 - ((lines.length - 1) * 6);
              for (let j = 0; j < lines.length; j++) {
                  ctx.fillText(lines[j], 256, (startY * 5.12) + (j * 60) + 30);
              }
              
              fs.writeFileSync(path.join(framesDir, \`frame_\${i.toString().padStart(3, '0')}.png\`), canvas.toBuffer('image/png'));
           }
           
           const outputPath = path.join(framesDir, 'output.webp');
           
           for (let k = 0; k < 5; k++) {
               fs.copyFileSync(
                   path.join(framesDir, \`frame_\${(words.length - 1).toString().padStart(3, '0')}.png\`),
                   path.join(framesDir, \`frame_\${(words.length + k).toString().padStart(3, '0')}.png\`)
               );
           }
           
           execSync(\`"\${ffmpegPath}" -framerate 4 -i "\${framesDir}/frame_%03d.png" -c:v libwebp -lossless 0 -q:v 80 -loop 0 -preset default -an -vsync 0 "\${outputPath}"\`);
           
           const videoBuffer = fs.readFileSync(outputPath);
           await this.sock.sendMessage(jid, { sticker: videoBuffer }, { quoted: msg });
           
           fs.rmSync(framesDir, { recursive: true, force: true });
       } catch (e) {
           console.error("Bratvid error:", e);
           await this.sock.sendMessage(jid, { text: \`❌ Gagal membuat brat video.\` }, { quoted: msg });
       }
    `;

code = code.replace(regex, replacement);
fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Bratvid patched");
