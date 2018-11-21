import {BrowserWindow} from 'electron'
import * as fs from 'fs'
import {homedir, platform} from 'os'
import {maxBy, prop, reduce} from 'ramda'
import {promisify} from 'util'
import {log} from 'utils'
import enabled from './enabled'
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const dirs: {
  [name: string]: string[],
} = {
  darwin: [
    `${homedir()}/Library/Application Support/Google/Chrome/Default/Extensions`,
  ],
  linux: [
    `${homedir()}/.config/google-chrome/Default/Extensions/`,
    `${homedir()}/.config/google-chrome-beta/Default/Extensions/`,
    `${homedir()}/.config/google-chrome-canary/Default/Extensions/`,
    `${homedir()}/.config/chromium/Default/Extensions/`,
  ],
}

async function getPath(id: string) {
  const p = platform()
  if (p in dirs) {
    for (const path of dirs[p]) {
      if ((await stat(`${path}/${id}`)).isDirectory) {
        const versions = (await readdir(`${path}/${id}`))
        .map((v) => [v, v
          .replace('_', '.')
          .split('.')
          .reduce((acc, next) => (acc * 10 + (+next || 0)) , 0)] as [string, number])
        if (versions.length) {
          const newest = reduce(
            maxBy<[string, number]>(prop('1')),
            versions[0],
            versions)
          return `${path}/${id}/${newest[0]}`
        }
        return null
      }
    }
  }
  return null
}

export default async () => {
  for (const ex of enabled) {
      const path = await getPath(ex.id)
      if (path) {
        log(`Install from ${path}`,
          BrowserWindow.addDevToolsExtension(
            path,
          ),
        )
      } else {
        log(`Extension not found: ${ex.name} \n`)
      }
  }
}
