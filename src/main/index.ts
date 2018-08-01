console.log('Hello,electron...')
import {resolve} from 'path'
import { app, session, BrowserWindow } from 'electron'
import setup from './dev'
setup()
app.on('ready',()=>{
  const main = new BrowserWindow({
    width: 800,
    height: 600
  })
  // main.loadURL(`file://${__dirname}/index.html`)
  console.log(
    `dirname ${__dirname}`,
    `try to load ${resolve(__dirname,'index.html')}`
  )
  main.loadFile(resolve(__dirname,'index.html'))
  main.once('ready-to-show', () => {
    main.show()
  })
})