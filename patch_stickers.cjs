const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// I will just use sed or string replace to patch them all.
// But first, let's look at `.brat`
