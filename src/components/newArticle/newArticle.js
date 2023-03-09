import React, { useEffect } from 'react'
import { Input, Form, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import ErrorIndicator from '../errorIndicator/errorIndicator'
import { clearArticlesState, selectArticleById, fetchArticle, updateArticle } from '../../redux/slices/articlesSlice'

import styles from './newArticle.module.scss'

function NewArticle({ formName }) {
  const { slug } = useParams()
  const item = useSelector((state) => selectArticleById(state, slug))
  const history = useHistory()
  const { error } = useSelector((state) => state.articles)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = (values) => {
    if (formName === 'Create new article') {
      dispatch(fetchArticle(values))
    }
    if (formName === 'Edit article') {
      const valuesWithSlug = { ...values, slug }
      dispatch(updateArticle(valuesWithSlug))
    }
    form.resetFields()
  }
  const { status } = useSelector((state) => state.articles)
  useEffect(() => {
    dispatch(clearArticlesState())
  }, [])

  useEffect(() => {
    if ((formName === 'Edit article' && !item) || status === 'succeeded') {
      dispatch(clearArticlesState())
      history.push('/')
    }
  }, [status, formName])

  const initialValues = item
    ? { title: item.title, tagList: item.tagList, description: item.description, body: item.body }
    : { tagList: ['programming'] }

  const errorMesage = error ? <ErrorIndicator error="something went wrong" /> : null

  return (
    <div className={styles['newArticle-container']}>
      {errorMesage}
      <div className={styles['newArticle-main']}>
        <h1 className={styles.newArticle__title}>{formName}</h1>
        <Form
          form={form}
          className={styles.NewArticle}
          layout="vertical"
          name="newArticle"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={initialValues}
          requiredMark={false}
        >
          <Form.Item name="title" label="Title" rules={[{ min: 3, max: 40, required: true, whitespace: true }]}>
            <Input className={styles.newArticle__input} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Short description"
            rules={[{ min: 3, max: 400, required: true, whitespace: true }]}
          >
            <Input className={styles.newArticle__input} />
          </Form.Item>

          <Form.Item name="body" label="Text" rules={[{ min: 3, required: true, whitespace: true }]}>
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
