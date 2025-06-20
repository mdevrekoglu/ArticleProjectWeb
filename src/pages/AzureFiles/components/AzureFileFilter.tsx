import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import CustomDatePicker from '../../../components/FilterComponents/CustomDatePicker';
import azureFilesResources from '../messages';
import CustomEnumSelect from '../../../components/FilterComponents/CustomEnumSelect';
import { FileTypeEnum } from '../enums';
import CustomDivider from '../../../components/DataPageItems/CustomDivider';
import UserSelect from '../../../components/FilterComponents/UserSelect';
import { ReportTypeEnum } from '../../GenerateReport/enums';

interface AzureFileFilterProps {
  form: any;
}

const AzureFileFilter: React.FC<AzureFileFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form form={form} layout='inline' style={{ width: '100%' }}>
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(azureFilesResources.fileName)}
            name='fileName'
          >
            <Input
              placeholder={intl.formatMessage(
                azureFilesResources.enterFileName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(azureFilesResources.fileGUID)}
            name='fileGUID'
          >
            <Input
              placeholder={intl.formatMessage(
                azureFilesResources.enterFileGUID
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <CustomDatePicker />
        </Col>

        <Col xs={24} sm={8}>
          <UserSelect name='createdBy' />
        </Col>

        <Col xs={24} sm={8}>
          <CustomEnumSelect
            enumObject={FileTypeEnum}
            name='fileType'
            label={intl.formatMessage(azureFilesResources.fileType)}
          />
        </Col>

        <Col xs={24} sm={8}>
          <CustomEnumSelect
            enumObject={ReportTypeEnum}
            name='reportType'
            label={intl.formatMessage(azureFilesResources.reportType)}
          />
        </Col>
      </Row>
      <CustomDivider />
    </Form>
  );
};

export default AzureFileFilter;
