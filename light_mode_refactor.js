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
  // Top nav / headers
  { match: /className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white"/g, replace: 'className="bg-white px-8 py-4 flex justify-between items-center text-slate-800 border-b border-slate-200 shadow-sm"' },
  { match: /className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white"/g, replace: 'className="bg-white px-6 py-4 flex justify-between items-center text-slate-800 border-b border-slate-200 shadow-sm"' },
  
  // Dashboard wrappers (min-h-screen bg-slate-50 or bg-gray-50 etc) -> we want #F4F7FB
  { match: /bg-slate-50\b/g, replace: 'bg-[#F4F7FB]' },
  
  // Tab container backgrounds
  { match: /bg-white rounded-3xl shadow-xl border border-slate-200/g, replace: 'bg-white rounded-[32px] shadow-sm border border-slate-100' },
  { match: /bg-white rounded-3xl shadow-xl p-6/g, replace: 'bg-white rounded-[32px] shadow-sm border border-slate-100 p-6' },
  { match: /bg-white rounded-2xl shadow p-6/g, replace: 'bg-white rounded-[24px] shadow-sm border border-slate-100 p-6' },
  { match: /bg-white rounded-xl shadow p-4/g, replace: 'bg-white rounded-2xl shadow-sm border border-slate-100 p-4' },
  
  // Active/Inactive tabs
  { match: /'bg-slate-800 text-white shadow'/g, replace: "'bg-blue-600 text-white shadow-md'" },
  { match: /text-slate-600 hover:bg-slate-50/g, replace: "text-slate-500 hover:bg-slate-100/50 hover:text-slate-700" },
  
  // Buttons
  { match: /bg-slate-800 text-white hover:bg-black/g, replace: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" },
  { match: /bg-slate-800 hover:bg-slate-700 text-white/g, replace: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" },
  { match: /bg-slate-800 hover:bg-slate-700/g, replace: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" },
  { match: /bg-slate-900 hover:bg-black text-white/g, replace: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" },
  { match: /bg-slate-900 text-white/g, replace: "bg-slate-800 text-white" },

  // Inner card backgrounds like dark widgets
  { match: /bg-slate-800 p-4 rounded-xl text-white/g, replace: "bg-white border border-slate-200 shadow-sm p-4 rounded-2xl text-slate-800" },
  
  // Drop shadows
  { match: /shadow-xl/g, replace: "shadow-sm" },
  { match: /shadow-lg/g, replace: "shadow-sm" },
  { match: /shadow-2xl/g, replace: "shadow-md" },
];

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('LoginScreen.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    replaceRules.forEach(rule => {
      newContent = newContent.replace(rule.match, rule.replace);
    });
    
    // Some general font tweaks
    newContent = newContent.replace(/font-black/g, 'font-bold');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
