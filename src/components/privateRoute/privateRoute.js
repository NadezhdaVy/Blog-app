import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

function PrivateRoute({ children, pathname }) {
  const user = useSelector((state) => state.auth.userInfo)
  return (
    <Route
      pathname={pathname}
      render={({ location }) =>
        user.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/log-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
