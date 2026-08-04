import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replaceRules = [
  // Major containers: rounded-2xl to rounded-[24px] or 32px
  { match: /rounded-2xl shadow-sm border border-slate-100 p-4/g, replace: 'rounded-[24px] shadow-sm border border-slate-100/60 p-6' },
  { match: /rounded-2xl shadow-sm border border-slate-100/g, replace: 'rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60' },
  { match: /rounded-2xl/g, replace: 'rounded-[20px]' },
  { match: /rounded-xl/g, replace: 'rounded-2xl' },
  { match: /p-4/g, replace: 'p-5' },
  { match: /p-6/g, replace: 'p-8' },
  
  // Headers (backdrop blur)
  { match: /bg-white px-8/g, replace: 'bg-white/90 backdrop-blur-xl px-10' },
  { match: /bg-white px-6/g, replace: 'bg-white/90 backdrop-blur-xl px-8' },

  // Micro-interactions on buttons and clickable items
  { match: /cursor-pointer/g, replace: 'cursor-pointer transition-all duration-300 hover:bg-slate-50' },
  { match: /hover:bg-blue-700/g, replace: 'hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300' },
  { match: /hover:bg-slate-100\/50/g, replace: 'hover:bg-slate-100/80 transition-colors duration-200' },
  
  // Specific StatCard improvements (assuming standard classes were used)
  { match: /text-slate-400 font-bold/g, replace: 'text-slate-500 font-semibold uppercase tracking-wider text-[11px]' },
  { match: /text-slate-500 font-bold/g, replace: 'text-slate-500 font-semibold uppercase tracking-wider text-[11px]' },
];

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('LoginScreen.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    replaceRules.forEach(rule => {
      newContent = newContent.replace(rule.match, rule.replace);
    });
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Optimized: ' + filePath);
    }
  }
});
