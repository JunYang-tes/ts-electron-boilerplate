const os = require('os')
const {resolve} = require('path')
const packager = require('electron-packager')
packager({
  dir: resolve(`${__dirname}/../../`),
  platform: os.platform(),
  ignore(path) {
    return !(
      path === "" ||
      path.startsWith('/dist') ||
      path === "/package.json"
    )
  },
  overwrite: true
})
