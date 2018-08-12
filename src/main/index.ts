import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

app.on('ready', () => {
  const main = new BrowserWindow({
    height: 600,
    width: 800,
  })

  main.loadFile(resolve(__dirname, 'index.html'))
  main.once('ready-to-show', () => {
    main.show()
  })
})
