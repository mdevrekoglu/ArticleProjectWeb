import { Col, Divider, Form, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import searchCollaboratorResources from '../messages';
import TextArea from 'antd/es/input/TextArea';

interface SearchCollaboratorFilterProps {
  form: any;
}

const SearchCollaboratorFilter: React.FC<SearchCollaboratorFilterProps> = ({
  form
}) => {
  const intl = useIntl();

  return (
    <Form
      form={form}
      layout='inline'
      style={{ width: '100%' }}
      requiredMark={false}
    >
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={24}>
          <DataPageFormItem
            label={intl.formatMessage(searchCollaboratorResources.text)}
            name='text'
            rules={[{ required: true }, { max: 1250 }, { min: 250 }]}
          >
            <TextArea
              placeholder={intl.formatMessage(
                searchCollaboratorResources.textPlaceholder
              )}
              autoSize
              count={{
                show: true,
                max: 1250
              }}
            ></TextArea>
          </DataPageFormItem>
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </Form>
  );
};

export default SearchCollaboratorFilter;
