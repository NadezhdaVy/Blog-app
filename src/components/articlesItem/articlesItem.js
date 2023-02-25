import React from 'react'
import { Card, Avatar, Tag, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import styles from './articlesItem.module.scss'

export const renderTags = ({ tagList }) => {
  let id = 1
  const renderedTags = tagList.map((tag) => (
    <Tag key={id++} className={styles.tag}>
      <a href="#top">{tag}</a>
    </Tag>
  ))

  return (
    <Space size={1} className={styles['articles-item__tags']}>
      {renderedTags}
    </Space>
  )
}

export const acountDescription = ({ author }) => (
  <div className={styles['person-info']}>
    <div className={styles['person-info__description']}>
      <div>{author.username}</div>
      <div>15 March</div>
    </div>
    <Avatar className={styles['person-info__avatar']} icon={<UserOutlined />} size={42} />
  </div>
)

function ArticlesItem({ article }) {
  return (
    <Card
      bordered={false}
      className={styles['articles-item']}
      extra={acountDescription(article)}
      title={
        <Space size={4} direction="vertical">
          <Link className={styles['articles-item__title']} to={`/articles/${article.slug}`}>
            {article.title}
          </Link>
          {renderTags(article)}
        </Space>
      }
    >
      <p className={styles['posts-item__content']}>{article.description}</p>
    </Card>
  )
}

export default ArticlesItem
