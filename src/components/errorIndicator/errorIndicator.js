import React from 'react'
import { Alert } from 'antd'

import styles from './errorIndicator.module.scss'

function ErrorIndicator({ error }) {
  const errorName = Object.keys(error)[0]
  const errorValue = Object.values(error)[0]
  return <Alert className={styles.error} message={`${errorName} ${errorValue}`} type="error" />
}

export default ErrorIndicator
