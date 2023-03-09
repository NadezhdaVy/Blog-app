import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import { clearState, getCurrentUserBytoken } from '../../redux/slices/authSlice'
import RegisterForm from '../registerForm'
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
    <BrowserRouter>
      <Navbar />
      <div className={styles.app}>
        <Routes>
          <Route exact path="/" element={<ArticlesList />} />
          <Route exact path="/articles/:slug" element={<ArticleDetails />} />
          <Route exact path="/sign-up" element={<RegisterForm />} />
          <Route exact path="/log-in" element={<LoginForm />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UpdateProfileForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <NewArticle formName="Create new article" />
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute path="/new-article">
                <NewArticle formName="Edit article" />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
