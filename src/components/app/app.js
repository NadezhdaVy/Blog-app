import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from '../navbar'
import PostsDetails from '../postsDetails'
import PostsList from '../postsList'

import styles from './app.module.scss'

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Route exact path="/articles/:articleId" component={PostsDetails} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
