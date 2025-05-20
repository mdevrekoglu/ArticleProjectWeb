import { Button, Form, Input, notification, theme } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { UserTypes } from '../enums';
import DeuPatternBackground from '../components/DeuPatternBackground';
import DeuLogo from '../../../components/Logos/DeuLogo';
import authenticationResources from '../messages';
import { MailOutlined } from '@ant-design/icons';
import SelectDomain from '../components/SelectDomain';
import '../styles.css';
import { userRequestModel } from '../models';
import ApiService from '../../../modules/ApiService';
import { messageOutputModel } from '../../../models/BaseModels';
import ToggleThemeSwitch from '../../../components/ThemeItems/ToggleThemeSwitch';

const { useToken } = theme;
const ResendConfirmEmail = () => {
  const intl = useIntl();
  const { token } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<UserTypes>(UserTypes.Student);

  const handleDomainChange = (userType: UserTypes) => {
    setUserType(userType);
  };

  const handleResendConfirmEmail = async (values: any) => {
    setLoading(true);

    const resendConfirmEmailData: userRequestModel = {
      email: values.email,
      userType: userType
    };

    try {
      const response = await ApiService.UseGet<
        userRequestModel,
        messageOutputModel
      >('Authentication/ResendEmailConfirm', resendConfirmEmailData);

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(
            authenticationResources.resendConfirmEmailSuccess
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
            authenticationResources.resendConfirmEmailFailed
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
      }
    } catch (error) {
      notification.error({
        message: intl.formatMessage(
          authenticationResources.unableToResendConfirmEmailUnknownError
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
        name='resend-confirm-email'
        className='basic-form'
        onFinish={handleResendConfirmEmail}
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
            {intl.formatMessage(authenticationResources.resendConfirmEmail)}
          </Button>
        </Form.Item>

        <Form.Item className='custom-form-item'>
          <ToggleThemeSwitch />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResendConfirmEmail;
