import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearState, updateProfile } from '../../redux/slices/authSlice';
import { UpdateData } from '../../ts/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ErrorIndicator from '../errorIndicator';

import styles from './updateProfileForm.module.scss';

function UpdateProfileForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo: user, status, error } = useAppSelector((state) => state.auth);
  const { username, email } = user;

  const [form] = Form.useForm();

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearState());
      navigate('/');
    }
  }, [status]);

  const onFinish = (values: UpdateData) => {
    dispatch(updateProfile(values));
  };

  const errorMessage = error ? <ErrorIndicator error={error} /> : null;
  return (
    <div className={styles.updateProfileFormContainer}>
      {errorMessage}
      <div className={styles.updateProfileFormMain}>
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
            <Input className={styles.updateProfileFormInput} placeholder="Username" />
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
            <Input className={styles.updateProfileFormInput} placeholder="email" />
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
            <Input.Password className={styles.updateProfileFormInput} placeholder="New password" />
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
            <Input className={styles.updateProfileFormInput} placeholder="avatar" />
          </Form.Item>
          <Form.Item>
            <Button className={styles.updateProfileFormButton} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default UpdateProfileForm;
