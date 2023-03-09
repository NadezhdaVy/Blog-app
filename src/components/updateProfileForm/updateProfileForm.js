import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ErrorIndicator from '../errorIndicator'
import { clearState, updateProfile } from '../../redux/slices/authSlice'

import styles from './updateProfileForm.module.scss'

function UpdateProfileForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo: user, status, error } = useSelector((state) => state.auth)
  const { username, email } = user

  const [form] = Form.useForm()

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState())
      history.push('/')
    }
  }, [status])

  const onFinish = (values) => {
    dispatch(updateProfile(values))
  }

  const errorMessage = error ? <ErrorIndicator error={error} /> : null
  return (
    <div className={styles['updateProfileForm-container']}>
      {errorMessage}
      <div className={styles['updateProfileForm-main']}>
        Edit Profile
        <Form
          className={styles.updateProfileForm}
          requiredMark={false}
          layout="vertical"
          form={form}
          name="updateProfile"
          onFinish={onFinish}
        >
          <Form.Item
            initialValue={username}
            name="username"
            label="Username"
            rules={[
              {
                type: 'string',
                message: 'Username is incorrect',
                whitespace: true,
                max: 20,
                min: 4,
              },
              {
                required: true,
                message: 'Please input your Username',
              },
            ]}
          >
            <Input className={styles.updateProfileForm__input} placeholder="Username" />
          </Form.Item>
          <Form.Item
            initialValue={email}
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
            <Input className={styles.updateProfileForm__input} placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: false,
                message: 'Your password needs to be at least 6 characters.',
                max: 40,
                min: 6,
              },
            ]}
          >
            <Input.Password className={styles.updateProfileForm__input} placeholder="New password" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Avatar image(url)"
            rules={[
              {
                type: 'url',
              },
              {
                type: 'string',
                min: 6,
              },
            ]}
          >
            <Input className={styles.updateProfileForm__input} placeholder="avatar" />
          </Form.Item>
          <Form.Item>
            <Button className={styles.updateProfileForm__button} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default UpdateProfileForm
