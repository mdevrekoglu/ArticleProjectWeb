import React from 'react';
import { useIntl } from 'react-intl';
import CustomDivider from '../../../components/DataPageItems/CustomDivider';
import { Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import CustomEnumSelect from '../../../components/FilterComponents/CustomEnumSelect';
import { FileTypeEnum } from '../../AzureFiles/enums';
import azureFilesResources from '../../AzureFiles/messages';
import { ReportTypeEnum } from '../enums';

interface GeneralReportFilterProps {
  form: any;
}

const GeneralReportFilter: React.FC<GeneralReportFilterProps> = ({ form }) => {
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
            label={intl.formatMessage(azureFilesResources.fileName)}
            name='fileName'
            rules={[{ required: true }, { max: 225 }]}
          >
            <Input
              placeholder={intl.formatMessage(
                azureFilesResources.enterFileName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <CustomEnumSelect
            enumObject={FileTypeEnum}
            name='fileType'
            label={intl.formatMessage(azureFilesResources.fileType)}
            rules={[{ required: true }]}
          />
        </Col>

        <Col xs={24} sm={8}>
          <CustomEnumSelect
            enumObject={ReportTypeEnum}
            name='reportType'
            label={intl.formatMessage(azureFilesResources.reportType)}
            rules={[{ required: true }]}
          />
        </Col>

        <Col xs={24} sm={24}>
          <DataPageFormItem
            label={intl.formatMessage(azureFilesResources.description)}
            name='description'
            rules={[{ required: true }, { max: 500 }]}
          >
            <TextArea
              placeholder={intl.formatMessage(
                azureFilesResources.enterDescription
              )}
              autoSize
              count={{
                show: true,
                max: 500
              }}
            />
          </DataPageFormItem>
        </Col>
      </Row>
      <CustomDivider />
    </Form>
  );
};

export default GeneralReportFilter;
