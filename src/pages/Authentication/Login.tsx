import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './styles.css';
import { useIntl } from 'react-intl';
import authenticationResources from './messages';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SelectDomain from './components/SelectDomain';
import { Domains } from '../enum';

const Login = () => {
  const [domain, setDomain] = useState(Domains.Student);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const intl = useIntl();

  const handleDomainChange = (value: Domains) => {
    setDomain(value);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='basic-container'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
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
          <Button type='primary' htmlType='submit' className='form-button'>
            {intl.formatMessage(authenticationResources.login)}
          </Button>
        </Form.Item>

        <Form.Item className='custom-form-item'>
          <span style={{ marginRight: '8px' }}>
            {intl.formatMessage(authenticationResources.dontHaveAccount)}
          </span>

          <Link to='/register' className='register-now-link'>
            {intl.formatMessage(authenticationResources.registerNow)}
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
