import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import registerForm from '../registerForm'
import Navbar from '../navbar'
import ArticleDetails from '../articleDetails'
import ArticlesList from '../articlesList'
import loginForm from '../loginForm'

import styles from './app.module.scss'

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" render={() => <ArticlesList />} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route exact path="/sign-up" component={registerForm} />
          <Route exact path="/log-in" component={loginForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
