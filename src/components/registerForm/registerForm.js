import { Button, Form, Input, Checkbox } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import ErrorIndicator from '../errorIndicator'
import { registerUser, clearState } from '../../redux/slices/authSlice'

import styles from './registerForm.module.scss'

function registerForm() {
  const history = useHistory()
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState())
      history.push('/')
    }
  }, [status])

  const { error } = useSelector((state) => state.auth)
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    dispatch(registerUser(values))
  }
  const errorMessage = error ? <ErrorIndicator error={error} /> : null
  return (
    <>
      {errorMessage}
      <div className={styles['registerForm-container']}>
        <div className={styles['registerForm-main']}>
          Create new Account
          <Form
            className={styles.registerForm}
            requiredMark={false}
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Username is incorrect',
                  whitespace: true,
                  max: 20,
                  min: 6,
                },
              ]}
            >
              <Input className={styles.registerForm__input} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email address"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input className={styles.registerForm__input} placeholder="Email address" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Your password needs to be at least 6 characters.',
                  max: 40,
                  min: 6,
                },
              ]}
            >
              <Input.Password className={styles.registerForm__input} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Repeat Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Passwords must match'))
                  },
                }),
              ]}
            >
              <Input.Password className={styles.registerForm__input} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>I agree to the processing of my personal information</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button className={styles.registerForm__button} type="primary" htmlType="submit">
                Create
              </Button>
              Already have an account?<Link to="/log-in"> Sign In.</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default registerForm
