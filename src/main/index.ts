import {resolve} from 'path'
import { app, session, BrowserWindow } from 'electron'

console.log('Hello,electron...')
app.on('ready',()=>{
  const main = new BrowserWindow({
    width: 800,
    height: 600
  })

  main.loadFile(resolve(__dirname,'index.html'))
  main.once('ready-to-show', () => {
    main.show()
  })
})