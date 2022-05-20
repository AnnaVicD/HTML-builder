const fs = require('fs');
const path = require('path');
  

fs.readdir(__dirname+'/secret-folder', (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.stat(__dirname+'/secret-folder/'+file, (e, s) => {
        if (s.isFile()) {
          console.log(path.parse(file).name + ' - ' + path.extname(file).substring(1) + ' - ' + (s.size/1024) + 'kb');
        }
      });
    });
  }
});