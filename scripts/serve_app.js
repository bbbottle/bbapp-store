const { createServer } = require('vite');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

// args checker
const appName = process.argv[2];
if (!appName) {
  throw new Error('app name missing!');
}

const appPath = path.resolve('apps', appName);

if (!fs.existsSync(appPath)) {
  throw new Error('invalid app path');
}

// file server
(async () => {
  const server = await createServer({
    configFile: false,
    root: appPath,
    server: {
      port: 1337
    }
  })
  await server.listen()
})()

// file watcher
shell.cd(appPath);
shell.exec('yarn dev', { async: true })
