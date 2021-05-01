import React, { FC } from 'react'
import Layout from './Layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/dashboard">
            <div>Dashboard</div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
