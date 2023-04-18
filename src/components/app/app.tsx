import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { clearState, getCurrentUserBytoken } from '@/redux/slices/authSlice';
import Navbar from '@components/navbar';

import styles from './app.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { userToken, userInfo, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !userInfo.username) {
      dispatch(getCurrentUserBytoken());
    }
  }, []);

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
