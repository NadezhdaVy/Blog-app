import React from 'react'

import styles from './navbar.module.scss'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-content']}>
        <div className={styles['nav-links']}>
          <a href="#top">Realworld Blog</a>
          <a href="#top">Sign in</a>
          <a href="#top">Sign up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
