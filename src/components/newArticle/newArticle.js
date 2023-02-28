/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Input, Form, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticle } from '../../redux/slices/articlesSlice'

import styles from './newArticle.module.scss'

function NewArticle() {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log(values)
    dispatch(fetchArticle(values))
  }
  const { error, status } = useSelector((state) => state.articles)
  useEffect(() => {
    console.log(error)
    console.log(status)
  }, [status])
  const [form] = Form.useForm()

  console.log(error)
  console.log(status)
  return (
    <div className={styles['newArticle-container']}>
      <div className={styles['newArticle-main']}>
        <h1 className={styles.newArticle__title}>Create new article</h1>
        <Form
          form={form}
          className={styles.NewArticle}
          layout="vertical"
          name="newArticle"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={{ tagList: ['programming'] }}
          requiredMark={false}
        >
          <Form.Item name="title" label="Title" rules={[{ min: 3, max: 30, required: true, whitespace: true }]}>
            <Input className={styles.newArticle__input} />
          </Form.Item>
          <Form.Item name="description" label="Short description">
            <Input className={styles.newArticle__input} />
          </Form.Item>

          <Form.Item name="body" label="Text">
            <Input.TextArea className={styles.newArticle__input} />
          </Form.Item>

          <Form.List name="tagList">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item label={index === 0 ? 'Tags' : ''} required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input tag or delete this field.',
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Tag"
                        style={{
                          width: '40%',
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        className={styles.deleteButton}
                        onClick={() => {
                          remove(field.name)
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    className={styles.buttonAdd}
                    onClick={() => add()}
                    style={{
                      width: '20%',
                    }}
                  >
                    Add tag
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button size="large" className={styles['newArticle__submit-button']} type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NewArticle
