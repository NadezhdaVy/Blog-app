import React from 'react'
import { Link } from 'react-router-dom'

import styles from './navbar.module.scss'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-content']}>
        <div className={styles['nav-links']}>
          <Link to="/">Realworld Blog</Link>
          <a href="#top">Sign in</a>
          <a href="#top">Sign up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
