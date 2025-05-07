import { Col, Divider, Form, Input, InputNumber, Row } from 'antd';

import React from 'react';
import { useIntl } from 'react-intl';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import commonResources from '../../../messages';
import searchArticleResources from '../messages';
import JournalSelect from '../../../components/FilterComponents/JournalSelect';
import ResearcherSelect from '../../../components/FilterComponents/ResearcherSelect';

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
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(commonResources.title)}
            name='title'
          >
            <Input
              placeholder={intl.formatMessage(commonResources.enterTitle)}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(commonResources.publishYear)}
            name='publishYear'
          >
            <InputNumber
              placeholder={intl.formatMessage(commonResources.enterPublishYear)}
              style={{ width: '100%' }}
              controls={false}
              min={0}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(searchArticleResources.doi)}
            name='doi'
          >
            <Input
              placeholder={intl.formatMessage(searchArticleResources.enterDoi)}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={8}>
          <AffiliationSelect mode='single' />
        </Col>
        <Col xs={24} sm={8}>
          <JournalSelect mode='multiple' />
        </Col>
        <Col xs={24} sm={8}>
          <ResearcherSelect mode='multiple' />
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
    </Form>
  );
};

export default SearchArticleFilter;
