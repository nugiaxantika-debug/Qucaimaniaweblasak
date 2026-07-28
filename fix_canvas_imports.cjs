const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// 1. Add top-level import
if (!code.includes("import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';")) {
    code = `import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';\n` + code;
}

// 2. Remove inline canvas requires
code = code.replace(/const \{ createCanvas, GlobalFonts \} = require\('@napi-rs\/canvas'\);/g, '');
code = code.replace(/const \{ createCanvas, GlobalFonts, loadImage \} = require\('@napi-rs\/canvas'\);/g, '');

// 3. Remove other inline requires
code = code.replace(/const path = require\('path'\);/g, '');
code = code.replace(/const fs = require\('fs'\);/g, '');
code = code.replace(/const \{ execSync \} = require\('child_process'\);/g, '');
code = code.replace(/const ffmpegPath = require\('ffmpeg-static'\);/g, '');

// 4. Fix font paths that used require('path') and require('fs')
code = code.replace(/GlobalFonts\.registerFromPath\(require\('fs'\)\.existsSync\(require\('path'\)\.join\(process\.cwd\(\), 'public\/fonts\/Roboto-Bold\.ttf'\)\) \? require\('path'\)\.join\(process\.cwd\(\), 'public\/fonts\/Roboto-Bold\.ttf'\) : require\('path'\)\.join\(__dirname, '\.\.\/public\/fonts\/Roboto-Bold\.ttf'\), 'Roboto Bold'\);/g,
    "GlobalFonts.registerFromPath(path.join(process.cwd(), 'public/fonts/Roboto-Bold.ttf'), 'Roboto Bold');");

// 5. Fix nulis path
code = code.replace(/const nulisDir = require\('path'\)\.dirname\(require\.resolve\('nulis-buku\/package\.json'\)\);/g,
    "const nulisDir = path.join(process.cwd(), 'node_modules', 'nulis-buku');");

// 6. Remove the createRequire we added earlier
code = code.replace(/import \{ createRequire \} from 'module';\nconst require = createRequire\(import\.meta\.url\);\n/g, "");

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Replaced requires with imports");
