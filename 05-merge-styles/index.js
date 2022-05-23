const fs = require('fs').promises;
const path = require('path');

var result = '';

async function buildBundle() {
  let dir = await fs.readdir(__dirname + '/styles');
  for(const file of dir) {
    let st = await fs.stat(__dirname+'/styles/'+file);
    if (st.isFile() && path.extname(file) === '.css') {
      let fileData = await fs.readFile(__dirname + '/styles/' + file, 'utf8');
      result += `\n${fileData}`;
    }
  }
  return result;
}

buildBundle().then(result => {
  fs.writeFile(__dirname + '/project-dist/bundle.css', result);
});