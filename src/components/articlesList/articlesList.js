import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'antd'

import { getCurrentUserBytoken } from '../../redux/slices/authSlice'
import { fetchArticles, selectAllArticles } from '../../redux/slices/articlesSlice'
import PostsItem from '../articlesItem'

import styles from './articlesList.module.scss'

function ArticlesList() {
  const dispath = useDispatch()
  const { userToken } = useSelector((state) => state.auth)
  const articles = useSelector(selectAllArticles)
  const totalPages = useSelector((state) => state.articles.totalPages)
  // const user = useSelector((state) => state.auth.userInfo)
  // console.log(user)
  const articlesStatus = useSelector((state) => state.articles.status)

  const [currentPage, setCurrentPage] = useState(1)

  const onChangePage = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispath(fetchArticles(currentPage))
    if (userToken) {
      dispath(getCurrentUserBytoken())
    }
  }, [])

  useEffect(() => {
    dispath(fetchArticles(currentPage))
  }, [currentPage])

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
