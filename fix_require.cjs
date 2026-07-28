const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

if (!code.includes("createRequire")) {
    code = `import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\n` + code;
    fs.writeFileSync('src/services/whatsapp.ts', code);
    console.log("createRequire added");
} else {
    console.log("createRequire already exists");
}
