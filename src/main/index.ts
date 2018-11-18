import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'
function getDevPort() {
  return +(process.env.DEV_PORT || 9527)
}

app.on('ready', () => {
  const main = new BrowserWindow({
    height: 600,
    width: 800,
  })
  if (process.env.NODE_ENV === 'development') {
    main.loadURL(`http://localhost:${getDevPort()}`)
  } else {
    main.loadFile(resolve(__dirname, 'index.html'))
  }
  main.once('ready-to-show', () => {
    main.show()
  })
})
