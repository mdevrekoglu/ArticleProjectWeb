import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import facultyResources from '../messages';
import AffiliationSearch from '../../../components/FilterComponents/AffiliationSearch';

interface FacultyFilterProps {
  form: any;
  onAffiliationChange: (selectedIds: number[]) => void;
}

const FacultyFilter: React.FC<FacultyFilterProps> = ({
  form,
  onAffiliationChange
}) => {
  const intl = useIntl();

  return (
    <Form form={form} layout='inline' style={{ width: '100%' }}>
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(facultyResources.facultyName)}
            name='facultyName'
          >
            <Input
              placeholder={intl.formatMessage(
                facultyResources.enterFacultyName
              )}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={16}>
          <AffiliationSearch onChange={onAffiliationChange} />
        </Col>
      </Row>
    </Form>
  );
};

export default FacultyFilter;
