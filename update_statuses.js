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
  { match: /'In Progress'/g, replace: "'Progress'" },
  { match: /"In Progress"/g, replace: '"Progress"' },
  { match: /'Completed'/g, replace: "'Cmpltd'" },
  { match: /"Completed"/g, replace: '"Cmpltd"' },
  { match: /'Draft'/g, replace: "'Drfts'" },
  { match: /"Draft"/g, replace: '"Drfts"' },
  { match: /'Trash'/g, replace: "'Trshs'" },
  { match: /"Trash"/g, replace: '"Trshs"' },
  
  // also handle the JSX text nodes directly just in case (e.g. >In Progress<)
  { match: />In Progress</g, replace: ">Progress<" },
  { match: />Completed</g, replace: ">Cmpltd<" },
  { match: />Draft</g, replace: ">Drfts<" },
  { match: />Trash</g, replace: ">Trshs<" }
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
      console.log('Updated statuses in: ' + filePath);
    }
  }
});
