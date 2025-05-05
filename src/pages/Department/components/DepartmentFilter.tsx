import { Col, Divider, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import facultyResources from '../messages';
import AffiliationSearch from '../../../components/FilterComponents/AffiliationSelect';
import FacultySearch from '../../../components/FilterComponents/FacultySelect';
import departmentResources from '../messages';
import { useWatch } from 'antd/es/form/Form';

interface DepartmentFilterProps {
  form: any;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({ form }) => {
  const intl = useIntl();
  const affiliationId = useWatch('affiliationId', form);

  return (
    <Form form={form}
    layout='inline' 
    style={{
       width: '100%' 
       }}
       >

      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(departmentResources.departmentName)}
            name='departmentName'
          >
            <Input
              placeholder={intl.formatMessage(
                departmentResources.enterDepartmentName
              )}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={8}>
          <AffiliationSearch mode='single'/>

        </Col>
        <Col xs={24} sm={8}>
          <FacultySearch mode='single' selectedAffiliationId={affiliationId}/>

        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(departmentResources.StudentCount)}
            name='city'
          >
            <Input
              placeholder={intl.formatMessage(departmentResources.enterStudentCount)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(departmentResources.ResearcherCount)}
            name='city'
          >
            <Input
              placeholder={intl.formatMessage(departmentResources.enterResearcherCount)}
            />
          </DataPageFormItem>
        </Col>

      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </Form>
  );
};

export default DepartmentFilter;
