import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'antd'

import { clearState } from '../../redux/slices/authSlice'

import styles from './navbar.module.scss'

function LoggenInLinks({ user: { user } }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogOut = () => {
    localStorage.removeItem('token')
    dispatch(clearState())
    history.push('/log-in')
  }
  return (
    <>
      <Link className={styles['create-article']} to="/new-article">
        Create article
      </Link>
      <Link to="/profile">
        <div className={styles['person-info']}>
          <div className={styles['person-info__user-name']}>
            <div>{user.username}</div>
          </div>
          <Avatar className={styles['person-info__avatar']} src={user.image} size={42} />
        </div>
      </Link>
      <button type="button" className={styles['log-out']} onClick={onLogOut}>
        Log out
      </button>
    </>
  )
}

function Navbar() {
  const user = useSelector((state) => state.auth.userInfo)

  const noLoggedInLinks = (
    <>
      <Link to="/log-in">Log in</Link>
      <Link className={styles['sign-up']} to="/sign-up">
        Sign Up
      </Link>
    </>
  )

  const content = user.user ? <LoggenInLinks user={user} /> : noLoggedInLinks

  return (
    <nav className={styles.nav}>
      <div className={styles['nav-content']}>
        <div className={styles['nav-links']}>
          <Link to="/">Realworld Blog</Link>
          {content}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
