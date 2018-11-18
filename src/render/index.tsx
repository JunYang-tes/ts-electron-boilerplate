import * as React from "react"
import * as ReactDOM from "react-dom"
import {hot} from 'react-hot-loader'
import App from './app'

const ReloadableApp = hot(module)(App)
ReactDOM.render(
  <ReloadableApp />,
  document.getElementById('root'),
)
