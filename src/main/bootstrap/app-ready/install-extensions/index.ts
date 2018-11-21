import {BrowserWindow} from 'electron'
import {exists} from 'fs'
import {homedir, platform} from 'os'
import {promisify} from 'util'
import {log} from 'utils'
import enabled from './enabled'
const isExists = promisify(exists)

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
      if (await isExists(`${path}/${id}`)) {
        return `${path}/${id}`
      }
    }
  }
  return null
}

export default async () => {
  for (const ex of enabled) {
    try {
      const path = await getPath(ex.id)
      if (path) {
        BrowserWindow.addDevToolsExtension(
          path,
        )
      } else {
        log(`Extension not found: ${ex.name} \n`)
      }
    } catch (e) {
      log('Failed to load extension:', e)
    }
  }
}
