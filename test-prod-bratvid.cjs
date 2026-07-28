const ffmpegPath = require('ffmpeg-static');
console.log("FFMPEG PATH:", ffmpegPath);
const fs = require('fs');
console.log("EXISTS:", fs.existsSync(ffmpegPath));
