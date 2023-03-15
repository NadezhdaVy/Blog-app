import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

import { logIn } from './routePaths'

function PrivateRoute({ children }) {
  const { userToken } = useSelector((state) => state.auth)

  return userToken ? children : <Navigate to={logIn} />
}

export default PrivateRoute
