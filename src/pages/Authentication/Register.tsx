import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import authenticationResources from './messages';
import SelectDomain from './components/SelectDomain';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Register = () => {
  const intl = useIntl();
  const [domain, setDomain] = useState('@ogr.deu.edu.tr');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleDomainChange = (value: string) => {
    setDomain(value);
  };

  return (
    <div className='basic-container'>
      <Form
        name='normal_register'
        className='register-form'
        initialValues={{ remember: true }}
      >
        <FormItem
          name='firstName'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputNameMessage
              )
            },
            {
              max: 30,
              message: intl.formatMessage(
                authenticationResources.inputNameMaxMessage
              )
            }
          ]}
        >
          <Input
            placeholder={intl.formatMessage(authenticationResources.name)}
          ></Input>
        </FormItem>

        <FormItem
          name='lastName'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputLastNameMessage
              )
            },
            {
              max: 20,
              message: intl.formatMessage(
                authenticationResources.inputLastNameMaxMessage
              )
            }
          ]}
        >
          <Input
            placeholder={intl.formatMessage(authenticationResources.lastName)}
          ></Input>
        </FormItem>

        <FormItem
          name='email'
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                authenticationResources.inputEmailMessage
              )
            },
            {
              max: 240,
              message: intl.formatMessage(
                authenticationResources.inputEmailMaxMessage
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
          ></Input>
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
          <Button type='primary' htmlType='submit' className='form-button'>
            {intl.formatMessage(authenticationResources.register)}
          </Button>
        </FormItem>

        <Form.Item className='custom-form-item'>
          <span style={{ marginRight: '8px' }}>
            {intl.formatMessage(authenticationResources.alreadyHaveAccount)}
          </span>

          <Link to='/login'>
            {intl.formatMessage(authenticationResources.loginNow)}
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
