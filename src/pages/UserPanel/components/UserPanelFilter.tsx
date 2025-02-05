import { Col, Divider, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import userPanelResources from '../messages';

interface UserPanelFilterProps {
  form: any;
}

const UserPanelFilter: React.FC<UserPanelFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form form={form} layout='inline' style={{ width: '100%' }}>
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(userPanelResources.firstName)}
            name='firstName'
          >
            <Input
              placeholder={intl.formatMessage(
                userPanelResources.enterFirstName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(userPanelResources.lastName)}
            name='lastName'
          >
            <Input
              placeholder={intl.formatMessage(userPanelResources.enterLastName)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(userPanelResources.role)}
            name='role'
          >
            <Input
              placeholder={intl.formatMessage(userPanelResources.enterRole)}
            />
          </DataPageFormItem>
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
    </Form>
  );
};

export default UserPanelFilter;
