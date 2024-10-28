import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import '../styles.css';
import { useIntl } from 'react-intl';
import authenticationResources from '../messages';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectDomain from '../components/SelectDomain';
import { UserTypes } from '../enums';
import DeuPatternBackground from '../components/DeuPatternBackground';
import DeuLogo from '../../../assets/DeuLogo.png';
import { userLogInModel, userLogInResponseModel } from './models';
import ApiService from '../../../modules/ApiService';
import { UseAuth } from '../../../modules/AuthContext';

const Login = () => {
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Student);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const intl = useIntl();
  const { login } = UseAuth();

  const handleDomainChange = (userType: UserTypes) => {
    setUserType(userType);
  };

  const handleLogin = async (values: any) => {
    setLoading(true);

    const loginData: userLogInModel = {
      email: values.email,
      password: values.password,
      userType: userType
    };

    try {
      const response = await ApiService.UsePost<
        userLogInModel,
        userLogInResponseModel
      >('/Authentication/Login', loginData);

      if (response.isSuccessed) {
        login(response.token);

        notification.success({
          message: intl.formatMessage(authenticationResources.loginSuccess),
          description: (
            <div>
              {response.messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          ),
          placement: 'topRight',
          duration: 5,
          style: { width: '500px' }
        });
      } else {
        notification.error({
          message: intl.formatMessage(authenticationResources.loginFailed),
          description: (
            <div>
              {response.messages.map((msg, index) => (
                <div key={index}>{msg}</div>
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
          authenticationResources.unableToLoginUnknownError
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
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={handleLogin}
      >
        <div className='logo-container'>
          <img src={DeuLogo} className='school-logo' alt='' />
        </div>

        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputEmailMessage
              )
            }
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder={intl.formatMessage(authenticationResources.email)}
            addonAfter={
              <SelectDomain handleDomainChange={handleDomainChange} />
            }
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputPasswordMessage
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
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>
              {intl.formatMessage(authenticationResources.rememberMe)}
            </Checkbox>
          </Form.Item>

          <Link className='password-forgot-link' to='/forgot-password'>
            {intl.formatMessage(authenticationResources.forgotPassword)}
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='form-button'
            loading={loading}
          >
            {intl.formatMessage(authenticationResources.login)}
          </Button>
        </Form.Item>

        <Form.Item className='custom-form-item'>
          <span style={{ marginRight: '8px' }}>
            {intl.formatMessage(authenticationResources.dontHaveAccount)}
          </span>

          <Link to='/authentication/register' className='register-now-link'>
            {intl.formatMessage(authenticationResources.registerNow)}
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
