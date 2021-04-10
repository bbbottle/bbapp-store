const fs = require('fs');
const path = require('path');
const semverInc = require('semver/functions/inc')
const glob = require("glob");
const shell = require('shelljs');

const calcNextPatchVersion = () => {
  const currentVer = require(path.resolve('package.json')).version;
  return semverInc(currentVer, 'patch');
};

const appPath2cdnPath = (filePath, ver) => {
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/bbbottle/bbapp-store';
  const VER = `@${ver}`;
  const DIST = 'dist/index.js';

  return `${CDN_BASE}${VER}/${filePath}/${DIST}`;
}

const writeMetaInfo = (metaInfo, filePath= path.resolve('apps_meta.json')) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(metaInfo, null, 2))
  } catch (err) {
    console.error(err)
  }
};

const commitMetaChanges = () => {
  const msg = 'chore: update apps meta info';
  const gitCmd = `git commit -am "${msg}"`;
  if (shell.exec(gitCmd).code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  }
};

glob("apps/*/app.json", function (er, files) {
  if (er) {
    throw new Error("Can't not find any app description files: app.json")
  }

  const targetVer = calcNextPatchVersion();
  const metaInfo = files.map((filePath) => {
    const appInfo = require(path.resolve(filePath));
    const appPath = filePath.replace('/app.json', '');

    return {
      ...appInfo,
      url: appPath2cdnPath(appPath, targetVer),
    }
  })

  //todo: Determine if git working directory is clean before writing meta info.
  writeMetaInfo(metaInfo);
  commitMetaChanges();
})

