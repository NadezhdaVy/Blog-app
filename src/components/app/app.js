import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { clearState, getCurrentUserBytoken } from '../../redux/slices/authSlice'
import Navbar from '../navbar'

import styles from './app.module.scss'

function App() {
  const dispatch = useDispatch()
  const { userToken, userInfo, status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userToken && !userInfo.user) {
      dispatch(getCurrentUserBytoken())
    }
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState())
    }
  }, [status])

  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
