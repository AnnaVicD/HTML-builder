const fs = require('fs').promises;
const path = require('path');

const copyDir = async (src, dest) => {
  const lstat = await fs.lstat(src).catch(() => false);

  if (!lstat) { return; } else if (await lstat.isFile()) {
    await fs.copyFile(src, dest);
  } else if (await lstat.isDirectory()) {
    await fs.mkdir(dest).catch(() => {});

    for (const f of await fs.readdir(src)) {
      await copyDir(path.join(src, f), path.join(dest, f));
    }
  }
};


(async () => {
  const src = __dirname + '/files';
  const dst =  __dirname + '/files-copy';
  await fs.mkdir(dst).catch(() => { });

  for (const f of await fs.readdir(src)) {
    await copyDir(path.join(src, f), path.join(dst, f));
  }
})();
