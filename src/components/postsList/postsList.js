import React from 'react'
import { useSelector } from 'react-redux'
import { List } from 'antd'

import PostsItem from '../postsItem'

import styles from './postsList.module.scss'

function PostsList() {
  const posts = useSelector((state) => state.posts)

  return (
    <List
      className={styles['posts-list']}
      grid={{ column: 1 }}
      dataSource={posts}
      renderItem={(post) => (
        <List.Item key={post.id}>
          <PostsItem post={post} />
        </List.Item>
      )}
    />
  )
}

export default PostsList
