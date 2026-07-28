const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// The best way to find public in a bundled server is to check if we are in dist/
code = code.replace(/path\.join\(process\.cwd\(\), 'public\/fonts\/Roboto-Bold\.ttf'\)/g, "require('fs').existsSync(require('path').join(process.cwd(), 'public/fonts/Roboto-Bold.ttf')) ? require('path').join(process.cwd(), 'public/fonts/Roboto-Bold.ttf') : require('path').join(__dirname, '../public/fonts/Roboto-Bold.ttf')");

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Font path patched");
