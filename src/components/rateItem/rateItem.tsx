import React, { useState } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Rate, Space } from 'antd'

import { useAppSelector } from '../../redux/store'
import { postFavorite } from '../../api/api'

import styles from './rateItem.module.scss'

type Props = {
  stars: number
  slug: string
  favorited: boolean
}

function RateItem({ stars, slug, favorited }: Props) {
  const [rating, setRating] = useState(stars)
  const [like, setLike] = useState(favorited)
  const [error, setError] = useState<null | Error>(null)
  const { userToken } = useAppSelector((state) => state.auth)

  async function rateItem(id: string, token: string | null, liked: boolean) {
    try {
      if (!token) {
        throw new Error('no token')
      }
      const response = await postFavorite(id, token, liked)
      setLike((state) => !state)
      setRating(response.favoritesCount)
    } catch (e) {
      const err = e as Error
      setError(err)
    }
  }
  if (error) {
    console.log(error)
  }

  return (
    <Space className={styles.rateContainer}>
      <Rate
        disabled={!userToken}
        onChange={() => rateItem(slug, userToken, like)}
        className={styles.rate}
        count={1}
        character={<HeartOutlined style={{ color: like ? 'red' : 'black' }} className={styles.rateIcon} />}
      />
      <span style={{ position: 'relative', bottom: -1 }}>{rating}</span>
    </Space>
  )
}

export default RateItem
