import { useState } from 'react';
import '../styles.css';
import DeuPatternBackground from '../components/DeuPatternBackground';
import { Button, Form, notification, theme } from 'antd';
import { useIntl } from 'react-intl';
import authenticationResources from '../messages';
import Input from 'antd/es/input/Input';
import { MailOutlined } from '@ant-design/icons';
import SelectDomain from '../components/SelectDomain';
import { UserTypes } from '../enums';
import { userRequestModel } from '../models';
import ApiService from '../../../modules/ApiService';
import { messageOutputModel } from '../../../models/BaseModels';
import { useNavigate } from 'react-router-dom';
import DeuLogo from '../../../components/DeuLogo';
import ToggleThemeButton from '../../../components/ToggleThemeButton';

const { useToken } = theme;
const ForgotPassword = () => {
  const intl = useIntl();
  const { token } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Student);

  const handleDomainChange = (userType: UserTypes) => {
    setUserType(userType);
  };

  const handleForgotPassword = async (values: any) => {
    setLoading(true);

    const forgotPasswordData: userRequestModel = {
      email: values.email,
      userType: userType
    };

    try {
      const response = await ApiService.UseGet<
        userRequestModel,
        messageOutputModel
      >('Authentication/ResetPasswordEmail', forgotPasswordData);

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(
            authenticationResources.sendPasswordResetEmailSuccess
          ),
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
        navigate('/authentication/login');
      } else {
        notification.error({
          message: intl.formatMessage(
            authenticationResources.sendPasswordResetEmailFailed
          ),
          description: (
            <div>
              {response.messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          ),
          placement: 'topRight',
          duration: 5
        });
      }
    } catch (error) {
      notification.error({
        message: intl.formatMessage(
          authenticationResources.unableToSendPasswordResetEmail
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
        name='forgot-password'
        className='basic-form'
        onFinish={handleForgotPassword}
        style={{ backgroundColor: token.colorBgLayout }}
      >
        <DeuLogo />

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

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='form-button'
            loading={loading}
          >
            {intl.formatMessage(authenticationResources.sendPasswordResetEmail)}
          </Button>
        </Form.Item>

        <Form.Item className='custom-form-item'>
          <ToggleThemeButton />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
