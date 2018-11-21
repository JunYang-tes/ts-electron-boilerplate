import * as React from "react"
import * as ReactDOM from "react-dom"
import App from './app'

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line
  const {hot} = require('react-hot-loader')
  const ReloadableApp = hot(module)(App)
  ReactDOM.render(
    <ReloadableApp />,
    document.getElementById('root'),
  )
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
}
