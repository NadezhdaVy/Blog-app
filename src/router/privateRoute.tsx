import { Navigate } from 'react-router-dom';
import * as React from 'react';

import { useAppSelector } from '../redux/store';

import { logIn } from './routePaths';

type Props = {
  children: React.ReactElement;
};

function PrivateRoute({ children }: Props) {
  const { userToken } = useAppSelector((state) => state.auth);

  return userToken ? children : <Navigate to={logIn} />;
}

export default PrivateRoute;
