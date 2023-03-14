import React from 'react'
import { Card, Avatar, Tag, Space, Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Popconfirm from '../popconfirm'
import convertTime from '../../utils/formatDate'
import RateItem from '../rateItem'

import styles from './articlesItem.module.scss'

function ArticlesItem({ article }) {
  const renderTags = ({ tagList }) => {
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

  const acountDescription = ({ author, updatedAt }) => (
    <div className={styles['person-info']}>
      <div className={styles['person-info__description']}>
        <div>{author.username}</div>
        <div>{convertTime(updatedAt)}</div>
      </div>
      <Avatar onError={() => false} className={styles['person-info__avatar']} src={author.image} size={42} />
    </div>
  )

  const { status } = useSelector((state) => state.articles)
  if (status === 'loading') {
    return (
      <>
        <Space style={{ position: 'absolute', right: 0, top: 9 }}>
          <Skeleton.Input style={{ height: 20 }} />
          <Skeleton.Avatar />
        </Space>
        <Skeleton
          active
          paragraph={{
            rows: 3,
          }}
        />
      </>
    )
  }

  return (
    <Card
      bordered={false}
      className={styles['articles-item']}
      extra={acountDescription(article)}
      title={
        <Space size={4} direction="vertical">
          <Space size={10}>
            <Link className={styles['articles-item__title']} to={`articles/${article.slug}`}>
              {article.title}
            </Link>
            <RateItem stars={article.favoritesCount} slug={article.slug} favorited={article.favorited} />
          </Space>
          {renderTags(article)}
        </Space>
      }
    >
      <div className={styles['articles-item-container']}>
        <p className={styles['articles-item__content']}>{article.description}</p>
        <Space className={styles.buttons}>
          <Popconfirm slug={article.slug}>
            <Button>Delete</Button>
          </Popconfirm>

          <Link to={`/articles/${article.slug}/edit`}>
            <Button>Edit</Button>
          </Link>
        </Space>
      </div>
    </Card>
  )
}

export default ArticlesItem
