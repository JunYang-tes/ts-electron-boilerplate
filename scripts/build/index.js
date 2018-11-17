const os = require('os')
const {resolve} = require('path')
const packager = require('electron-packager')
const package = require('../../package.json')
const devDependencies = Object.entries(package.devDependencies || {})
  .map(([d])=>`/node_modules/${d}`)
packager({
  dir: resolve(`${__dirname}/../../`),
  platform: os.platform(),
  out:"pkg",
  ignore(path) {
    return !(
      path === "/node_modules" ||
      path === "" ||
      path.startsWith('/dist') ||
      path === "/package.json"
    ) ||
    (devDependencies.some(d=>path.startsWith(d)))
  },
  overwrite: true
})
