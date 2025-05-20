import { Button, Form, Input, notification, theme } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import authenticationResources from '../messages';
import SelectDomain from '../components/SelectDomain';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import DeuPatternBackground from '../components/DeuPatternBackground';
import { UserTypes } from '../enums';
import '../styles.css';
import ApiService from '../../../modules/ApiService';
import { userRegisterModel } from './models';
import { messageOutputModel } from '../../../models/BaseModels';
import DeuLogo from '../../../components/Logos/DeuLogo';
import ToggleThemeSwitch from '../../../components/ThemeItems/ToggleThemeSwitch';

const { useToken } = theme;
const Register = () => {
  const intl = useIntl();
  const { token } = useToken();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Student);

  const handleDomainChange = (userType: UserTypes) => {
    setUserType(userType);
  };

  const handleRegister = async (values: any) => {
    setloading(true);

    const registerData: userRegisterModel = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      userType: userType
    };

    try {
      const response = await ApiService.UsePost<
        userRegisterModel,
        messageOutputModel
      >('/Authentication/Register', registerData);

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(authenticationResources.registerSuccess),
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
          message: intl.formatMessage(authenticationResources.registerFailed),
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
          authenticationResources.unableToRegisterUnknownError
        ),
        placement: 'topRight',
        duration: 5
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='basic-container'>
      <div className='background-layer'>
        <DeuPatternBackground />
      </div>
      <Form
        name='normal_register'
        className='basic-form'
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        style={{ backgroundColor: token.colorBgLayout }}
      >
        <DeuLogo />

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
          <Button
            type='primary'
            htmlType='submit'
            className='form-button'
            loading={loading}
          >
            {intl.formatMessage(authenticationResources.register)}
          </Button>
        </FormItem>

        <Form.Item className='custom-form-item'>
          <span style={{ marginRight: '8px' }}>
            {intl.formatMessage(authenticationResources.alreadyHaveAccount)}
          </span>

          <Link to='/authentication/login'>
            {intl.formatMessage(authenticationResources.loginNow)}
          </Link>
        </Form.Item>

        <Form.Item className='custom-form-item'>
          <ToggleThemeSwitch />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
