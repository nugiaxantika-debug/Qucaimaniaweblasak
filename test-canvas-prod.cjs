const fs = require('fs');
const path = require('path');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');

const fontPath = require('fs').existsSync(require('path').join(process.cwd(), 'public/fonts/Roboto-Bold.ttf')) ? require('path').join(process.cwd(), 'public/fonts/Roboto-Bold.ttf') : require('path').join(__dirname, '../public/fonts/Roboto-Bold.ttf');
console.log("Font path:", fontPath, fs.existsSync(fontPath));
GlobalFonts.registerFromPath(fontPath, 'Roboto Bold');

const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');
ctx.fillText("Test", 100, 100);
console.log("Canvas works");

const nulisDir = require('path').dirname(require.resolve('nulis-buku/package.json'));
const fontNulis = path.join(nulisDir, 'font', 'Indie-Flower.ttf');
console.log("Nulis font path:", fontNulis, fs.existsSync(fontNulis));
GlobalFonts.registerFromPath(fontNulis, 'Indie Flower');

