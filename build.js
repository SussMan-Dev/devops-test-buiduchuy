const fs = require("fs");

fs.mkdirSync("dist", { recursive: true });

fs.copyFileSync("index.html", "dist/index.html");
fs.copyFileSync("style.css", "dist/style.css");
fs.copyFileSync("script.js", "dist/script.js");

console.log("Build completed successfully!");
