const fs = require('fs').promises;
const path = require('path');

const copyDir = async (src, dest) => {
  const lstat = await fs.lstat(src).catch(() => false);

  if (!lstat) { return; } else if (await lstat.isFile()) {
    await fs.copyFile(src, dest);
  } else if (await lstat.isDirectory()) {
    await fs.mkdir(dest).catch(() => { });

    for (const f of await fs.readdir(src)) {
      await copyDir(path.join(src, f), path.join(dest, f));
    }
  }
};

async function getComponentData(name) {
  var componentName = name.replace('{{', '').replace('}}', '');
  return await fs.readFile(__dirname + `/components/${componentName}.html`, 'utf-8');
}

async function replaceComponents(file) {
  var templateFile = await fs.readFile(file, 'utf8');
  // Читаем какие блоки будем заменять
  let templates = templateFile.match(/{{(\w+)}}/g);
  for (const template of templates) {
    var componentData = await getComponentData(template);
    templateFile = templateFile.replace(template, componentData);
  }

  return templateFile;
}

replaceComponents(__dirname + '/template.html').then(async result => {
  let dist = __dirname + '/project-dist';
  // создаем папку project-dist
  await fs.mkdir(dist).catch(() => { });
  // записываем данные в index.html
  await fs.writeFile(dist + '/index.html', result);
  // копируем assets
  const src = __dirname + '/assets';
  const dst = dist + '/assets';
  await fs.mkdir(dst).catch(() => { });
  for (const f of await fs.readdir(src)) {
    await copyDir(path.join(src, f), path.join(dst, f));
  }
  // собираем стили
  let style = '';
  let dir = await fs.readdir(__dirname + '/styles');
  for (const file of dir) {
    let fileData = await fs.readFile(__dirname + `/styles/${file}`, 'utf-8');
    style += fileData;
  }
  // записываем стили
  await fs.writeFile(dist + '/style.css', style);
});
