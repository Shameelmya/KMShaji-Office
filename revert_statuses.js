import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist' && f !== '.git') {
        walk(dirPath, callback);
      }
    } else {
      callback(path.join(dir, f));
    }
  });
}

const replaceRules = [
  { match: /'Progress'/g, replace: "'In Progress'" },
  { match: /"Progress"/g, replace: '"In Progress"' },
  { match: /'Cmpltd'/g, replace: "'Completed'" },
  { match: /"Cmpltd"/g, replace: '"Completed"' },
  { match: /'Drfts'/g, replace: "'Draft'" },
  { match: /"Drfts"/g, replace: '"Draft"' },
  { match: /'Trshs'/g, replace: "'Trash'" },
  { match: /"Trshs"/g, replace: '"Trash"' },
  
  // JSX text nodes
  { match: />Progress</g, replace: ">In Progress<" },
  { match: />Cmpltd</g, replace: ">Completed<" },
  { match: />Drfts</g, replace: ">Draft<" },
  { match: />Trshs</g, replace: ">Trash<" }
];

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    replaceRules.forEach(rule => {
      newContent = newContent.replace(rule.match, rule.replace);
    });
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Reverted statuses in: ' + filePath);
    }
  }
});
