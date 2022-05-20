const fs = require('fs');
const path = require('path');

var result = '';

let dir = fs.readdirSync(__dirname + '/styles');
dir.forEach(file => {
  let st = fs.statSync(__dirname+'/styles/'+file);
  if (st.isFile() && path.extname(file) === '.css') {
    let fileData = fs.readFileSync(__dirname + '/styles/' + file, 'utf8');
    result += `\n${fileData}`;
  }
});

fs.writeFileSync(__dirname + '/project-dist/bundle.css', result);
