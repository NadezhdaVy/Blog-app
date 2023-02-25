import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'

import { selectArticleById } from '../../redux/slices/articlesSlice'
import ArticlesItem from '../articlesItem'

import styles from './articleDetails.module.scss'

function ArticleDetails({ match }) {
  const { slug } = match.params
  const item = useSelector((state) => selectArticleById(state, slug))

  return (
    <div className={styles.articleDetails}>
      <ArticlesItem article={item} />
      <div className={styles['articleDetails-body']}>
        {' '}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>po</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleDetails
