import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

import styles from './loginForm.module.scss'

const loginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles['loginForm-container']}>
      <div className={styles['loginForm-inner']}>
        <Form
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
            requiredMark={false}
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
                message: 'Please input your Password!',
              },
            ]}
            requiredMark={false}
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
  )
}
export default loginForm
