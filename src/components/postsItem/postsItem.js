import React from 'react'
import { Card, Avatar, Tag, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import styles from './postsItem.module.scss'

export const renderTags = ({ tags }) => {
  let id = 1
  const renderedTags = tags.map((tag) => (
    <Tag key={id++} className={styles.tag}>
      <a href="#top">{tag}</a>
    </Tag>
  ))

  return (
    <Space size={1} className={styles['posts-item__tags']}>
      {renderedTags}
    </Space>
  )
}

export const acountDescription = ({ auther }) => (
  <div className={styles['person-info']}>
    <div className={styles['person-info__description']}>
      <div>{auther}</div>
      <div>15 March</div>
    </div>
    <Avatar className={styles['person-info__avatar']} icon={<UserOutlined />} size={42} />
  </div>
)

function PostsItem({ post }) {
  return (
    <Card
      bordered={false}
      className={styles['posts-item']}
      extra={acountDescription(post)}
      title={
        <Space size={4} direction="vertical">
          <Link className={styles['posts-item__title']} to={`/articles/${post.id}`}>
            {post.title}
          </Link>
          {renderTags(post)}
        </Space>
      }
    >
      <p className={styles['posts-item__content']}>{post.content.substring(0, 100)}</p>
    </Card>
  )
}

export default PostsItem
