const fs = require('fs');

const filePath = 'src/components/pages/Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace {language === 'en' ? 'Eng' : 'Mal'} with Eng
content = content.replace(/\{language === 'en' \? '([^']+)' : '[^']+'\}/g, "$1");

// Replace (language === 'en' ? 'Eng' : 'Mal') with 'Eng'
content = content.replace(/\(language === 'en' \? '([^']+)' : '[^']+'\)/g, "'$1'");

// Replace language === 'en' ? 'Eng' : 'Mal' with 'Eng'
content = content.replace(/language === 'en' \? '([^']+)' : '[^']+'/g, "'$1'");

fs.writeFileSync(filePath, content, 'utf-8');
