import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ArticlesList from '../components/articlesList'
import App from '../components/app'

import {
  defaultShownRoute,
  articleDetailsRoute,
  signUpRoute,
  logInRoute,
  profileRoute,
  newArticleRoute,
  editArticleRoute,
  navigateRoute,
} from './routeVars'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      defaultShownRoute(<ArticlesList />),
      articleDetailsRoute,
      signUpRoute,
      logInRoute,
      profileRoute,
      newArticleRoute,
      editArticleRoute,
      navigateRoute('/'),
    ],
  },
])

export default router
