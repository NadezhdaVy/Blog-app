import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateProfile } from '../../redux/slices/authSlice'

import styles from './updateProfileForm.module.scss'

function UpdateProfileForm() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.userInfo)
  const { username, email } = user.user

  const [form] = Form.useForm()

  const onFinish = (values) => {
    dispatch(updateProfile(values))
    console.log('Received values of form: ', values)
  }

  return (
    <div className={styles['updateProfileForm-container']}>
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
                required: false,
                message: 'Username is incorrect',
                whitespace: true,
                max: 20,
                min: 6,
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
                required: false,
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
          <Form.Item name="image" label="Avatar image(url)">
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
