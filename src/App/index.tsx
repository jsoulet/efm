import React, { FC } from 'react'
import Layout from './Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './Home'
import Chapter from './Chapter'
import Education from './Education'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApiProvider } from './hooks/apiContext'
import { AuthProvider } from './hooks/authContext'
import { NavigationProvider } from './hooks/navigationContext'
import Page from './Page'

const App: FC = () => {
  return (
    <ApiProvider>
      <NavigationProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/education/:educationId/chapter/:chapterId">
                  <Chapter />
                </Route>
                <Route path="/education/:educationId">
                  <Education />
                </Route>
                <Route path="/:slug">
                  <Page />
                </Route>
                <Route>
                  <div>Not found</div>
                </Route>
              </Switch>
            </Layout>
          </Router>
          <ReactQueryDevtools />
        </AuthProvider>
      </NavigationProvider>
    </ApiProvider>
  )
}

export default App
