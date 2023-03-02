/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react'

function PrivateRoute({ children, pathname, ...rest }) {
  const user = useSelector((state) => state.auth.userInfo)
  return (
    <Route
      {...rest}
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
