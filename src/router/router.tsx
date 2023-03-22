import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import LoginForm from '../components/loginForm'
import UpdateProfileForm from '../components/updateProfileForm'
import NewArticle from '../components/newArticle'
import App from '../components/app'
import ArticleDetails from '../components/articleDetails'
import RegisterForm from '../components/registerForm'
import ArticlesList from '../components/articlesList'

import { articlesDetails, signUp, logIn, profile, newArticle, editArticle } from './routePaths'
import PrivateRoute from './privateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      { index: true, element: <ArticlesList /> },
      {
        path: articlesDetails(':slug'),
        element: <ArticleDetails />,
      },
      {
        path: signUp,
        element: <RegisterForm />,
      },
      {
        path: logIn,
        element: <LoginForm />,
      },
      {
        path: profile,
        element: (
          <PrivateRoute>
            <UpdateProfileForm />
          </PrivateRoute>
        ),
      },
      {
        path: newArticle,
        element: (
          <PrivateRoute>
            <NewArticle formName="Create new article" />
          </PrivateRoute>
        ),
      },
      {
        path: editArticle(':slug'),
        element: (
          <PrivateRoute>
            <NewArticle formName="Edit article" />
          </PrivateRoute>
        ),
      },

      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export default router
