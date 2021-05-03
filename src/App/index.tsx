import React, { FC } from 'react'
import Layout from './Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApiProvider } from './hooks/apiContext'

const App: FC = () => {
  return (
    <ApiProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
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
      <ReactQueryDevtools />
    </ApiProvider>
  )
}

export default App
