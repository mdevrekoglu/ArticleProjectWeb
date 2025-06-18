import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import AffiliationSearch from '../../../components/FilterComponents/AffiliationSelect';
import FacultySearch from '../../../components/FilterComponents/FacultySelect';
import DepartmentSearch from '../../../components/FilterComponents/DepartmentSelect';
import departmentResources from '../messages';
import { useWatch } from 'antd/es/form/Form';
import CustomDivider from '../../../components/DataPageItems/CustomDivider';

interface MajorDisciplineFilterProps {
  form: any;
}

const MajorDisciplineFilter: React.FC<MajorDisciplineFilterProps> = ({ form }) => {
  const intl = useIntl();
  const affiliationId = useWatch('affiliationId', form);
  const facultyId = useWatch('facultyId', form);

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
            label={intl.formatMessage(departmentResources.majorDisciplineName)}
            name='majorDisciplineName'
          >
            <Input
              placeholder={intl.formatMessage(
                departmentResources.enterMajorDisciplineName
              )}
            />
          </DataPageFormItem>
        </Col>
        <Col xs={24} sm={8}>
          <AffiliationSearch mode='single' />
        </Col>
        <Col xs={24} sm={8}>
          <FacultySearch mode='single' selectedAffiliationId={affiliationId} />
        </Col>
        <Col xs={24} sm={8}>
          <DepartmentSearch mode='single' selectedFacultyId={facultyId} />
        </Col>
      </Row>
      <CustomDivider />
    </Form>
  );
};

export default MajorDisciplineFilter;
