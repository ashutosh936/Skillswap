const fs = require('fs');
const path = require('path');

const targetPaths = [
  's:/Projects/Career Platform/backend',
  's:/Projects/Career Platform/frontend/src',
  's:/Projects/Career Platform/frontend/index.html',
  's:/Projects/Career Platform/README.md'
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/SkillSwap/g, 'PeerLoom')
    .replace(/skillswap/g, 'peerloom')
    .replace(/Skillswap/g, 'Peerloom')
    .replace(/SKILLSWAP/g, 'PEERLOOM');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    replaceInFile(dir);
    return;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      replaceInFile(fullPath);
    }
  }
}

targetPaths.forEach(walkDir);
console.log('Renaming complete.');
