import { Col, Divider, Form, Input, Row } from 'antd';

import React from 'react';
import { useIntl } from 'react-intl';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import commonResources from '../../../messages';

interface SearchArticleFilterProps {
  form: any;
}

const SearchArticleFilter: React.FC<SearchArticleFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form
      form={form}
      layout='inline'
      style={{ width: '100%' }}
      requiredMark={false}
    >
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={12}>
          <DataPageFormItem
            label={intl.formatMessage(commonResources.title)}
            name='title'
          >
            <Input
              placeholder={intl.formatMessage(commonResources.enterTitle)}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={12}>
          <AffiliationSelect mode='single' />
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
    </Form>
  );
};

export default SearchArticleFilter;
