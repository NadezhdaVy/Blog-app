import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ErrorIndicator from '../errorIndicator'
import { loginUser, clearState } from '../../redux/slices/authSlice'

import styles from './loginForm.module.scss'

const loginForm = () => {
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  const dispath = useDispatch()
  const history = useHistory()
  const { status } = useSelector((state) => state.auth)
  const { error } = useSelector((state) => state.auth)
  useEffect(() => {
    if (status === 'succeeded') {
      dispath(clearState)
      history.replace(from)
    }
  }, [status])

  const onFinish = (values) => {
    dispath(loginUser(values))
    console.log('Received values of form: ', values)
  }
  const errorMessage = error ? <ErrorIndicator error={error} /> : null

  return (
    <>
      {errorMessage}
      <div className={styles['loginForm-container']}>
        <div className={styles['loginForm-inner']}>
          <Form
            requiredMark={false}
            layout="vertical"
            name="normal_login"
            className={styles.loginForm}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
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
              <Input className={styles.loginForm__input} placeholder="Email address" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Password is incorrect!',
                  min: 6,
                  max: 20,
                },
              ]}
            >
              <Input className={styles.loginForm__input} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button className={styles.loginForm__button} type="primary" htmlType="submit">
                Log in
              </Button>
              Don’t have an account?<Link to="/sign-up"> Sign Up.</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default loginForm
