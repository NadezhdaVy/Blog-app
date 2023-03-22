import React from 'react'
import { message, Popconfirm as Confirm } from 'antd'

import { useAppDispatch } from '../../redux/store'
import { deleteArticle } from '../../redux/slices/articlesSlice'

type Props = {
  children: React.ReactNode
  slug: string
}

function Popconfirm({ children, slug }: Props) {
  const cancel = () => {
    message.error('Click on No')
  }
  const dispatch = useAppDispatch()
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
