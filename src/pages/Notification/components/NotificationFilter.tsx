import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import notificationResources from '../messages';
import IsActiveSelect from '../../../components/FilterComponents/IsActiveSelect';
import CustomDatePicker from '../../../components/FilterComponents/CustomDatePicker';
import CustomDivider from '../../../components/DataPageItems/CustomDivider';

interface NotificationFilterProps {
  form: any;
}

const NotificationFilter: React.FC<NotificationFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form form={form} layout='inline' style={{ width: '100%' }}>
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(notificationResources.title)}
            name='title'
          >
            <Input
              placeholder={intl.formatMessage(notificationResources.enterTitle)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <CustomDatePicker />
        </Col>

        <Col xs={24} sm={8}>
          <IsActiveSelect />
        </Col>
      </Row>
      <CustomDivider />
    </Form>
  );
};

export default NotificationFilter;
