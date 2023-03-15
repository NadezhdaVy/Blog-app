import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'antd'

import { logIn } from '../../router/routePaths'
import { logOut } from '../../redux/slices/authSlice'

import styles from './navbar.module.scss'

function Navbar() {
  const { userInfo: user, userToken } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogOut = () => {
    localStorage.removeItem('token')
    dispatch(logOut())
    navigate('/log-in')
  }

  let content

  if (!userToken) {
    content = (
      <>
        <Link to={logIn}>Log in</Link>
        <Link className={styles['sign-up']} to="sign-up">
          Sign Up
        </Link>
      </>
    )
  } else {
    content = (
      <>
        <Link className={styles['create-article']} to="new-article">
          Create article
        </Link>
        <Link to="/profile">
          <div className={styles['person-info']}>
            <div className={styles['person-info__user-name']}>
              <div>{user.username}</div>
            </div>
            <Avatar onError={() => false} className={styles['person-info__avatar']} src={user.image} size={42} />
          </div>
        </Link>
        <button type="button" className={styles['log-out']} onClick={onLogOut}>
          Log out
        </button>
      </>
    )
  }

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
