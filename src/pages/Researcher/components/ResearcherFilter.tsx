import { Col, Divider, Form, Input, Row } from 'antd';
import * as React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import researcherResources from '../messages';
import AffiliationSearch from '../../../components/FilterComponents/AffiliationSelect';
import IsActiveSelect from '../../../components/FilterComponents/IsActiveSelect';

interface ResearcherFilterProps {
  form: any;
}

const ResearcherFilter: React.FC<ResearcherFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form form={form} layout='inline' style={{ width: '100%' }}>
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.firstName)}
            name='firstName'
          >
            <Input
              placeholder={intl.formatMessage(
                researcherResources.enterFirstName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.lastName)}
            name='lastName'
          >
            <Input
              placeholder={intl.formatMessage(
                researcherResources.enterLastName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.email)}
            name='email'
          >
            <Input
              placeholder={intl.formatMessage(researcherResources.enterEmail)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.position)}
            name='position'
          >
            <Input
              placeholder={intl.formatMessage(
                researcherResources.enterPosition
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.staffTitle)}
            name='staffTitle'
          >
            <Input
              placeholder={intl.formatMessage(
                researcherResources.enterStaffTitle
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <AffiliationSearch />
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.woSId)}
            name='woSId'
          >
            <Input
              placeholder={intl.formatMessage(researcherResources.enterWoSId)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.orcId)}
            name='orcId'
          >
            <Input
              placeholder={intl.formatMessage(researcherResources.enterOrcId)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(researcherResources.scopusId)}
            name='scopusId'
          >
            <Input
              placeholder={intl.formatMessage(
                researcherResources.enterScopusId
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <IsActiveSelect />
        </Col>
      </Row>

      <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
    </Form>
  );
};

export default ResearcherFilter;
