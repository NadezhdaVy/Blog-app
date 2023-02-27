import React from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Rate, Space } from 'antd'

import styles from './rateItem.module.scss'

function RateItem({ stars }) {
  return (
    <Space className={styles['rate-container']}>
      <Rate className={styles.rate} count={1} character={<HeartOutlined />} />
      <span>{stars}</span>
    </Space>
  )
}

export default RateItem
