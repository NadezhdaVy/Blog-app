import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'

import { selectArticleById } from '../../redux/slices/articlesSlice'
import ArticlesItem from '../articlesItem'

import styles from './articleDetails.module.scss'

function ArticleDetails({ match }) {
  const history = useHistory()
  const { slug } = match.params
  const item = useSelector((state) => selectArticleById(state, slug))
  const [currentArticle, setCurrentArtticle] = useState(item)
  const { status } = useSelector((state) => state.articles)
  useEffect(() => {
    setCurrentArtticle(item)
  }, [status])

  if (!currentArticle) {
    history.push('/')
    return <Spin size="large" className={styles.spinner} />
  }

  return (
    <div className={styles.articleDetails}>
      <ArticlesItem article={currentArticle} />
      <div className={styles['articleDetails-body']}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleDetails
