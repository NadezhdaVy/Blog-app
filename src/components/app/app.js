import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentUserBytoken } from '../../redux/slices/authSlice'
import registerForm from '../registerForm'
import Navbar from '../navbar'
import ArticleDetails from '../articleDetails'
import ArticlesList from '../articlesList'
import loginForm from '../loginForm'
import UpdateProfileForm from '../updateProfileForm'
import ErrorIndicator from '../errorIndicator'
import PrivateRoute from '../privateRoute'
import NewArticle from '../newArticle'

import styles from './app.module.scss'

function App() {
  const dispath = useDispatch()
  const { userToken } = useSelector((state) => state.auth)
  const { error } = useSelector((state) => state.auth)
  useEffect(() => {
    if (userToken) {
      dispath(getCurrentUserBytoken())
    }
  }, [])
  const errorMessage = error ? <ErrorIndicator error={error} /> : null
  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        {errorMessage}
        <Switch>
          <Route exact path="/" render={() => <ArticlesList />} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route exact path="/sign-up" component={registerForm} />
          <Route exact path="/log-in" component={loginForm} />
          <PrivateRoute path="/profile">
            <UpdateProfileForm />
          </PrivateRoute>
          <PrivateRoute path="/new-article">
            <NewArticle />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
