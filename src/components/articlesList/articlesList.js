import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'antd'

import { fetchArticles, selectAllArticles } from '../../redux/slices/articlesSlice'
import PostsItem from '../articlesItem'

import styles from './articlesList.module.scss'

function ArticlesList() {
  const dispath = useDispatch()
  const articles = useSelector(selectAllArticles)
  const totalPages = useSelector((state) => state.articles.totalPages)

  const articlesStatus = useSelector((state) => state.articles.status)

  const [currentPage, setCurrentPage] = useState(1)

  const onChangePage = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispath(fetchArticles(currentPage))
  }, [])

  useEffect(() => {
    dispath(fetchArticles(currentPage))
  }, [currentPage, dispath])

  return (
    <List
      loading={articlesStatus === 'loading'}
      pagination={{
        onChange: (page) => onChangePage(page),
        align: 'center',
        total: totalPages,
        showSizeChanger: false,
      }}
      className={styles['articles-list']}
      grid={{ column: 1 }}
      dataSource={articles}
      renderItem={(article) => (
        <List.Item key={article.slug}>
          <PostsItem article={article} />
        </List.Item>
      )}
    />
  )
}

export default ArticlesList
