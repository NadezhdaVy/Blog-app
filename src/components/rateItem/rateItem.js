import React, { useState } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Rate, Space } from 'antd'
import { useSelector } from 'react-redux'

import { postFavorite } from '../../api/api'

import styles from './rateItem.module.scss'

function RateItem({ stars, slug, favorited }) {
  const [rating, setRating] = useState(stars)
  const [like, setLike] = useState(favorited)
  const [error, setError] = useState(null)
  const { userToken } = useSelector((state) => state.auth)

  async function rateItem(id, token, liked) {
    try {
      const response = await postFavorite(id, token, liked)
      setLike((state) => !state)
      setRating(response.favoritesCount)
    } catch (e) {
      setError(e)
    }
  }
  if (error) {
    console.log(error)
  }

  return (
    <Space className={styles['rate-container']}>
      <Rate
        disabled={!userToken}
        onChange={() => rateItem(slug, userToken, like)}
        className={styles.rate}
        count={1}
        character={<HeartOutlined style={{ color: like ? 'red' : 'black' }} className={styles.rate__icon} />}
      />
      <span>{rating}</span>
    </Space>
  )
}

export default RateItem
