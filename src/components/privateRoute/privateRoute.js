import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

function PrivateRoute({ children, pathname, ...rest }) {
  const { userToken } = useSelector((state) => state.auth)
  return (
    <Route
      {...rest}
      pathname={pathname}
      render={({ location }) =>
        userToken ? (
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
