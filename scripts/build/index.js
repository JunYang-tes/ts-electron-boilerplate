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
    if((devDependencies.some(d=>path.startsWith(d)))){
      return true
    }
    return !(
      path.startsWith("/node_modules") ||
      path === "" ||
      path.startsWith('/dist') ||
      path === "/package.json"
    ) 
  },
  overwrite: true
})
