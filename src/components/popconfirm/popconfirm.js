import React from 'react'
import { message, Popconfirm as Confirm } from 'antd'
import { useDispatch } from 'react-redux'

import { deleteArticle } from '../../redux/slices/articlesSlice'

const cancel = () => {
  message.error('Click on No')
}

function Popconfirm({ children, slug }) {
  const dispatch = useDispatch()
  return (
    <Confirm
      placement="topLeft"
      title="Are you sure to delete this article?"
      onConfirm={() => dispatch(deleteArticle(slug))}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Confirm>
  )
}

export default Popconfirm
