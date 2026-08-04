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
  { match: /Vengara Connect/g, replace: 'MLA Squad' }
];

walk('.', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.html') || filePath.endsWith('.md')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    replaceRules.forEach(rule => {
      newContent = newContent.replace(rule.match, rule.replace);
    });
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Renamed to MLA Squad in: ' + filePath);
    }
  }
});
