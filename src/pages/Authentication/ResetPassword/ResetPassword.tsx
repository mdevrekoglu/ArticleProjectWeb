import React, { useState } from 'react';
import DeuPatternBackground from '../components/DeuPatternBackground';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import { Button, Form, Input, notification, theme } from 'antd';
import DeuLogo from '../../../components/Logos/DeuLogo';
import FormItem from 'antd/es/form/FormItem';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import authenticationResources from '../messages';
import ToggleThemeButton from '../../../components/ThemeItems/ToggleThemeButton';
import { userPasswordResetModel } from './models';
import ApiService from '../../../modules/ApiService';
import { messageOutputModel } from '../../../models/BaseModels';

const { useToken } = theme;
const ResetPassword = () => {
  const intl = useIntl();
  const { token } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const queryParams = new URLSearchParams(useLocation().search);

  const handleResetPassword = async (values: any) => {
    setLoading(true);

    const resetPasswordData: userPasswordResetModel = {
      email: values.email,
      newPassword: values.password,
      token: queryParams.get('token') || ''
    };

    try {
      const response = await ApiService.UsePost<
        userPasswordResetModel,
        messageOutputModel
      >('/Authentication/ResetPassword', resetPasswordData);

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(
            authenticationResources.resetPasswordSuccess
          ),
          description: (
            <div>
              {response.messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </div>
          ),
          placement: 'topRight',
          duration: 5,
          style: { width: '500px' }
        });
        navigate('/authentication/login');
      } else {
        notification.error({
          message: intl.formatMessage(
            authenticationResources.resetPasswordFailed
          ),
          description: (
            <div>
              {response.messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </div>
          ),
          placement: 'topRight',
          duration: 5,
          style: { width: '500px' }
        });
      }
    } catch (error) {
      notification.error({
        message: intl.formatMessage(
          authenticationResources.unableToResetPasswordUnknownError
        ),
        placement: 'topRight',
        duration: 5
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='basic-container'>
      <div className='background-layer'>
        <DeuPatternBackground />
      </div>
      <Form
        name='reset-password'
        className='basic-form'
        onFinish={handleResetPassword}
        style={{ backgroundColor: token.colorBgLayout }}
      >
        <DeuLogo />

        <FormItem name='email' initialValue={queryParams.get('email')}>
          <Input
            prefix={<MailOutlined />}
            placeholder={intl.formatMessage(authenticationResources.email)}
            disabled={true}
          />
        </FormItem>

        <FormItem
          name='password'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputPasswordMessage
              )
            },
            {
              min: 6,
              message: intl.formatMessage(
                authenticationResources.inputPasswordMinMessage
              )
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder={intl.formatMessage(authenticationResources.password)}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible
            }}
          ></Input.Password>
        </FormItem>

        <FormItem
          name='password-confirm'
          rules={[
            {
              required: true,
              message: 'Please confirm your password.'
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters.'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  intl.formatMessage(
                    authenticationResources.inputPasswordNotMatchMessage
                  )
                );
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder={intl.formatMessage(authenticationResources.password)}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible
            }}
          ></Input.Password>
        </FormItem>

        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            className='form-button'
            loading={loading}
          >
            {intl.formatMessage(authenticationResources.resetPassword)}
          </Button>
        </FormItem>

        <FormItem className='custom-form-item'>
          <ToggleThemeButton />
        </FormItem>
      </Form>
    </div>
  );
};

export default ResetPassword;
