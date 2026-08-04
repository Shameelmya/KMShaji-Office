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
  { match: /bg-blue-600/g, replace: 'bg-purple-600' },
  { match: /text-blue-600/g, replace: 'text-purple-600' },
  { match: /border-blue-600/g, replace: 'border-purple-600' },
  { match: /bg-blue-500/g, replace: 'bg-purple-500' },
  { match: /text-blue-500/g, replace: 'text-purple-500' },
  { match: /border-blue-500/g, replace: 'border-purple-500' },
  { match: /bg-blue-700/g, replace: 'bg-purple-700' },
  { match: /hover:bg-blue-700/g, replace: 'hover:bg-purple-700' },
  { match: /bg-indigo-600/g, replace: 'bg-purple-600' },
  { match: /bg-indigo-700/g, replace: 'bg-purple-700' },
  { match: /hover:bg-indigo-700/g, replace: 'hover:bg-purple-700' }
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
      console.log('Updated colors in: ' + filePath);
    }
  }
});
