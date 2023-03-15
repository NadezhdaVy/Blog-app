import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../../router/routePaths'
import ErrorIndicator from '../errorIndicator'
import { loginUser, clearState } from '../../redux/slices/authSlice'

import styles from './loginForm.module.scss'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state) => state.auth)
  const { error } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearState())
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState)
      navigate('/')
    }
  }, [status])

  const onFinish = (values) => {
    dispatch(loginUser(values))
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
              Don’t have an account?<Link to={signUp}> Sign Up.</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default LoginForm
