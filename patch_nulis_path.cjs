const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

code = code.replace(/const nulisDir = path\.join\(process\.cwd\(\), 'node_modules', 'nulis-buku'\);/g, "const nulisDir = require('path').dirname(require.resolve('nulis-buku/package.json'));");

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Nulis path patched");
