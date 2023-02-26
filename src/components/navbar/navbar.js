import React from 'react'
import { Link } from 'react-router-dom'

import styles from './navbar.module.scss'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-content']}>
        <div className={styles['nav-links']}>
          <Link to="/">Realworld Blog</Link>
          <Link to="/log-in">Log in</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
