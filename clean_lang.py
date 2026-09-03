import re

file_path = 'src/components/pages/Dashboard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace {language === 'en' ? 'Eng' : 'Mal'} with Eng
content = re.sub(r"\{language === 'en' \? '([^']+)' : '[^']+'\}", r"\1", content)

# Replace (language === 'en' ? 'Eng' : 'Mal') with 'Eng'
content = re.sub(r"\(language === 'en' \? '([^']+)' : '[^']+'\)", r"'\1'", content)

# Replace any other raw ones: language === 'en' ? 'Eng' : 'Mal'
content = re.sub(r"language === 'en' \? '([^']+)' : '[^']+'", r"'\1'", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
