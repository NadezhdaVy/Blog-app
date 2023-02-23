import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from '../navbar'
import PostsList from '../postsList'

import styles from './app.module.scss'

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
