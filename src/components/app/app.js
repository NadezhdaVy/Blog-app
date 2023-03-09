import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearState, getCurrentUserBytoken } from '../../redux/slices/authSlice'
import registerForm from '../registerForm'
import Navbar from '../navbar'
import ArticleDetails from '../articleDetails'
import ArticlesList from '../articlesList'
import LoginForm from '../loginForm'
import UpdateProfileForm from '../updateProfileForm'
import PrivateRoute from '../privateRoute'
import NewArticle from '../newArticle'

import styles from './app.module.scss'

function App() {
  const dispatch = useDispatch()
  const { userToken, userInfo, status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userToken && !userInfo.user) {
      dispatch(getCurrentUserBytoken())
    }
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState())
    }
  }, [status])

  return (
    <Router>
      <Navbar />
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" render={() => <ArticlesList />} />
          <Route exact path="/articles" render={() => <ArticlesList />} />
          <Route exact path="/articles/:slug" component={ArticleDetails} />
          <Route exact path="/sign-up" component={registerForm} />
          <Route exact path="/log-in" component={LoginForm} />
          <PrivateRoute path="/profile">
            <UpdateProfileForm />
          </PrivateRoute>
          <PrivateRoute path="/new-article">
            <NewArticle formName="Create new article" />
          </PrivateRoute>
          <PrivateRoute exact path="/articles/:slug/edit">
            <NewArticle formName="Edit article" />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
