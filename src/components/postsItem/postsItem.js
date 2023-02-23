import React from 'react'
import { Card, Avatar, Tag, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import styles from './postsItem.module.scss'

function PostsItem({ post }) {
  const acountDescription = ({ auther }) => (
    <div className={styles['person-info']}>
      <div className={styles['person-info__description']}>
        <div>{auther}</div>
        <div>15 March</div>
      </div>
      <Avatar className={styles['person-info__avatar']} icon={<UserOutlined />} size={42} />
    </div>
  )

  const renderTags = ({ tags }) => {
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

  return (
    <Card
      bordered={false}
      className={styles['posts-item']}
      hoverable
      extra={acountDescription(post)}
      title={
        <Space direction="vertical">
          <a href="#top" className={styles['posts-item__title']}>
            {post.title}
          </a>
          {renderTags(post)}
        </Space>
      }
    >
      <p className={styles['posts-item__content']}>{post.content.substring(0, 100)}</p>
    </Card>
  )
}

export default PostsItem
