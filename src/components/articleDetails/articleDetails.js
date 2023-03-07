import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearArticlesState } from '../../redux/slices/articlesSlice'
import { getResource } from '../../api/api'
import ArticlesItem from '../articlesItem'

import styles from './articleDetails.module.scss'

function ArticleDetails({ match }) {
  const { slug } = match.params

  const dispatch = useDispatch()
  const history = useHistory()
  const [currentArticle, setCurrentArtticle] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { status } = useSelector((state) => state.articles)
  const { userInfo, userToken } = useSelector((state) => state.auth)

  async function getCurrentArticle() {
    try {
      setLoading(true)
      const response = await getResource(slug, userToken)
      setCurrentArtticle(response)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentArticle()
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearArticlesState())
      history.push('/')
    }
  }, [status])

  if (loading) {
    return <Spin size="large" className={styles.spinner} />
  }

  if (error || !currentArticle) {
    console.log(status)
    return <div>{error.message}</div>
  }

  if (status === 'failed') {
    console.log('failed oooops')
  }

  return (
    <div
      className={
        userInfo.user && userInfo.user.username === currentArticle.author.username
          ? styles.articleDetails
          : styles['articleDetails-hidden']
      }
    >
      <ArticlesItem article={currentArticle} />
      <div className={styles['articleDetails-body']}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentArticle.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleDetails
