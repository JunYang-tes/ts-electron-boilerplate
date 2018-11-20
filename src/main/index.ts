import { app, BrowserWindow } from 'electron'
import onReady from './bootstrap/app-ready'

app.on('ready', () => {
  const main = new BrowserWindow({
    height: 600,
    width: 800,
  })
  for (const f of onReady.prod) {
      f(main)
  }

  if (process.env.NODE_ENV !== 'production') {
    for (const f of onReady.dev) {
      f(main)
    }
  }
  main.once('ready-to-show', () => {
    main.show()
  })
})
app.on('window-all-closed', () => app.quit())
