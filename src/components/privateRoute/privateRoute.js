import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

function PrivateRoute({ children }) {
  const { userToken } = useSelector((state) => state.auth)

  return userToken ? children : <Navigate to="log-in" />
}

export default PrivateRoute
