const fs = require('fs');

const content = fs.readFileSync('src/app/page.js', 'utf8');
const urls = content.match(/https:\/\/images.unsplash.com[^\s"']+/g) || [];

urls.forEach(url => {
  fetch(url).then(res => {
    if (!res.ok) console.log('BROKEN:', url, res.status);
    else console.log('OK:', url);
  }).catch(e => console.log('ERROR:', url));
});
