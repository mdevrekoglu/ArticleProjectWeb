import React, { useState } from 'react';
import DeuPatternBackground from '../components/DeuPatternBackground';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import { Button, Form, Input, notification, theme } from 'antd';
import DeuLogo from '../../../components/Logos/DeuLogo';
import FormItem from 'antd/es/form/FormItem';
import { MailOutlined } from '@ant-design/icons';
import authenticationResources from '../messages';
import ToggleThemeButton from '../../../components/ThemeItems/ToggleThemeButton';
import ApiService from '../../../modules/ApiService';
import { userConfirmEmailModel } from './model';
import { messageOutputModel } from '../../../models/BaseModels';

const { useToken } = theme;
const ConfirmEmail = () => {
  const intl = useIntl();
  const { token } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(useLocation().search);

  const handleConfirmEmail = async () => {
    setLoading(true);

    const confirmEmailData: userConfirmEmailModel = {
      email: queryParams.get('email') || '',
      token: queryParams.get('token') || ''
    };

    try {
      const response = await ApiService.UsePost<
        userConfirmEmailModel,
        messageOutputModel
      >('/Authentication/ConfirmEmail', confirmEmailData);

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(authenticationResources.emailConfirmed),
          description: (
            <div>
              {response.messages.map((msg: string, index: number) => (
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
            authenticationResources.emailNotConfirmed
          ),
          description: (
            <div>
              {response.messages.map((msg: string, index: number) => (
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
          authenticationResources.unableToConfirmEmailUnknownError
        ),
        placement: 'topRight',
        duration: 5,
        style: { width: '500px' }
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
        name='confirm-email'
        className='basic-form'
        onFinish={handleConfirmEmail}
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

        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            className='form-button'
            loading={loading}
          >
            {intl.formatMessage(authenticationResources.confirmEmail)}
          </Button>
        </FormItem>

        <FormItem className='custom-form-item'>
          <ToggleThemeButton />
        </FormItem>
      </Form>
    </div>
  );
};

export default ConfirmEmail;
