import React from 'react'
import { Alert } from 'antd'

import { MyKnownError } from '../../ts/interfaces'

import styles from './errorIndicator.module.scss'

type Props = {
  error: MyKnownError | string
}

function ErrorIndicator({ error }: Props) {
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
