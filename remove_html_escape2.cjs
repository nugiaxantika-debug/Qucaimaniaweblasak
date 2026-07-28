const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

code = code.split("atas = atas.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');").join("atas = atas.trim();");
code = code.split("bawah = bawah.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');").join("bawah = bawah.trim();");
code = code.split("ctx.strokeText(atas.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 10);").join("ctx.strokeText(atas, 256, 10);");
code = code.split("ctx.fillText(atas.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 10);").join("ctx.fillText(atas, 256, 10);");
code = code.split("ctx.strokeText(bawah.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 502);").join("ctx.strokeText(bawah, 256, 502);");
code = code.split("ctx.fillText(bawah.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 256, 502);").join("ctx.fillText(bawah, 256, 502);");
code = code.split("teks = teks.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');").join("");
code = code.split("const safeName = (msg.pushName || 'User').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');").join("const safeName = (msg.pushName || 'User');");
code = code.split("text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');").join("");

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Unescaped HTML entities for canvas");
