import React from 'react';
import { Row, Col, Input, Form, Divider } from 'antd';
import { useIntl } from 'react-intl';
import affiliationResources from '../messages';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';

interface AffiliationFilterProps {
  form: any;
}

const AffiliationFilter: React.FC<AffiliationFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form
      form={form}
      layout='inline'
      style={{
        width: '100%'
      }}
    >
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(affiliationResources.name)}
            name='affiliationName'
          >
            <Input
              placeholder={intl.formatMessage(affiliationResources.enterName)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(affiliationResources.city)}
            name='city'
          >
            <Input
              placeholder={intl.formatMessage(affiliationResources.enterCity)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(affiliationResources.address)}
            name='address'
          >
            <Input
              placeholder={intl.formatMessage(
                affiliationResources.enterAddress
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(affiliationResources.country)}
            name='country'
          >
            <Input
              placeholder={intl.formatMessage(
                affiliationResources.enterCountry
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(affiliationResources.organizationType)}
            name='organizationType'
          >
            <Input
              placeholder={intl.formatMessage(
                affiliationResources.enterOrganizationType
              )}
            />
          </DataPageFormItem>
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </Form>
  );
};

export default AffiliationFilter;
