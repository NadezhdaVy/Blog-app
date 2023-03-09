import React from 'react'
import { Alert } from 'antd'

import styles from './errorIndicator.module.scss'

function ErrorIndicator({ error }) {
  let errorMessage
  if (typeof error === 'object') {
    const errorName = Object.keys(error)[0]
    const errorValue = Object.values(error)[0]
    errorMessage = `${errorName} ${errorValue}`
  } else {
    errorMessage = error
  }

  return <Alert className={styles.error} message={errorMessage} type="error" />
}

export default ErrorIndicator
