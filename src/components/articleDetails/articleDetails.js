import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spin } from 'antd'

import getResource from '../../api/api'
import ArticlesItem from '../articlesItem'

import styles from './articleDetails.module.scss'

function ArticleDetails({ match }) {
  const { slug } = match.params

  const [currentArticle, setCurrentArtticle] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getCurrentArticle() {
    try {
      setLoading(true)
      const response = await getResource(slug)
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

  if (loading) {
    return <Spin size="large" className={styles.spinner} />
  }

  if (error || !currentArticle) {
    console.log(error)
    return <div>{error.message}</div>
  }

  return (
    <div className={styles.articleDetails}>
      <ArticlesItem article={currentArticle} />
      <div className={styles['articleDetails-body']}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentArticle.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleDetails
