import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/store'
import { signUp } from '../../router/routePaths'
import ErrorIndicator from '../errorIndicator'
import { loginUser, clearState } from '../../redux/slices/authSlice'
import { LogInData } from '../../ts/types'

import styles from './loginForm.module.scss'

function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearState())
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState)
      navigate('/')
    }
  }, [status])

  const onFinish = (values: LogInData) => {
    dispatch(loginUser(values))
  }
  const errorMessage = error ? <ErrorIndicator error={error} /> : null

  return (
    <>
      {errorMessage}
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormInner}>
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
              <Input className={styles.loginFormInput} placeholder="Email address" />
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
              <Input className={styles.loginFormInput} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button className={styles.loginFormButton} type="primary" htmlType="submit">
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
