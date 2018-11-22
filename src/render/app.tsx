import * as React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
const App = () => <Router>
  <>
  <div>Hello,Electron!!</div>
  <nav>
    <Link to="/a">A</Link>
    <Link to="/b">B</Link>
  </nav>
  <Route
    path="/a"
    component={() => <div>A</div>}
  />
  <Route
    path="/b"
    component={() => <div>B</div>}
  />
  </>
</Router>

export default App
