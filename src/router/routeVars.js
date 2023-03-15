import { Navigate } from 'react-router-dom'
import React from 'react'

import LoginForm from '../components/loginForm'
import UpdateProfileForm from '../components/updateProfileForm'
import NewArticle from '../components/newArticle'
import ArticleDetails from '../components/articleDetails'
import RegisterForm from '../components/registerForm'

import PrivateRoute from './privateRoute'

export const privateRoute = (component) => <PrivateRoute>{component}</PrivateRoute>

const createRoute = (path, component, isPrivate) => ({
  path,
  element: isPrivate ? privateRoute(component) : component,
})

export const articleDetailsRoute = createRoute('articles/:slug', <ArticleDetails />)

export const signUpRoute = createRoute('sign-up', <RegisterForm />)

export const logInRoute = createRoute('log-in', <LoginForm />)

export const profileRoute = createRoute('profile', <UpdateProfileForm />, true)

export const newArticleRoute = createRoute('new-article', <NewArticle formName="Create new article" />, true)

export const editArticleRoute = createRoute('articles/:slug/edit', <NewArticle formName="Edit article" />, true)

export const navigateRoute = (to) => ({
  path: '*',
  element: <Navigate to={to} replace />,
})

export const defaultShownRoute = (component) => ({
  index: true,
  element: component,
})
