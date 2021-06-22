const path = require('path');
const fs = require('fs');
const tsConfig = require(`./${process.env.TS_CONFIG}`);
const packageJson = require('./package.json');
const typingsPath = path.resolve(__dirname, tsConfig.compilerOptions.outDir, `crypto-pro.d.ts`);
const typings = fs.readFileSync(typingsPath, 'utf8');

let header = [
  `// Type definitions for ${packageJson.name} ${packageJson.version}`,
  `// Project: ${packageJson.name}`,
  `// Definitions by: ${packageJson.author.name} ${packageJson.author.url}`
].join('\n');

if (tsConfig.compilerOptions.target === 'es5') {
  header += '\n\nexport as namespace cryptoPro;';
}

fs.writeFileSync(typingsPath, `${header}\n\n${typings}`);
