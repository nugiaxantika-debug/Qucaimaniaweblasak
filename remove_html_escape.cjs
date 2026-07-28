const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// In smeme
code = code.replace(/atas = atas\.trim\(\)\.replace\(\/&\/g, '&amp;'\)\.replace\(\/</g, '&lt;'\)\.replace\(\/>\/g, '&gt;'\);/g, "atas = atas.trim();");
code = code.replace(/bawah = bawah\.trim\(\)\.replace\(\/&\/g, '&amp;'\)\.replace\(\/</g, '&lt;'\)\.replace\(\/>\/g, '&gt;'\);/g, "bawah = bawah.trim();");
code = code.replace(/ctx\.strokeText\(atas\.replace\(\/&amp;\/g, '&'\)\.replace\(\/&lt;\/g, '<'\)\.replace\(\/&gt;\/g, '>'\), 256, 10\);/g, "ctx.strokeText(atas, 256, 10);");
code = code.replace(/ctx\.fillText\(atas\.replace\(\/&amp;\/g, '&'\)\.replace\(\/&lt;\/g, '<'\)\.replace\(\/&gt;\/g, '>'\), 256, 10\);/g, "ctx.fillText(atas, 256, 10);");
code = code.replace(/ctx\.strokeText\(bawah\.replace\(\/&amp;\/g, '&'\)\.replace\(\/&lt;\/g, '<'\)\.replace\(\/&gt;\/g, '>'\), 256, 502\);/g, "ctx.strokeText(bawah, 256, 502);");
code = code.replace(/ctx\.fillText\(bawah\.replace\(\/&amp;\/g, '&'\)\.replace\(\/&lt;\/g, '<'\)\.replace\(\/&gt;\/g, '>'\), 256, 502\);/g, "ctx.fillText(bawah, 256, 502);");

// In nulis
code = code.replace(/teks = teks\.replace\(\/&\/g, '&amp;'\)\.replace\(\/</g, '&lt;'\)\.replace\(\/>\/g, '&gt;'\);/g, "");
code = code.replace(/const safeName = \(msg\.pushName \|\| 'User'\)\.replace\(\/&\/g, '&amp;'\)\.replace\(\/</g, '&lt;'\)\.replace\(\/>\/g, '&gt;'\);/g, "const safeName = (msg.pushName || 'User');");

// In brat
code = code.replace(/text = text\.replace\(\/&\/g, '&amp;'\)\.replace\(\/</g, '&lt;'\)\.replace\(\/>\/g, '&gt;'\);/g, "");

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Unescaped HTML entities for canvas");
