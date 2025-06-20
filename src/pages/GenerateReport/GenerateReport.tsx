import { Button, Form, message, notification, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import generateReportResources from './messages';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import commonResources from '../../messages';
import Dragger from 'antd/es/upload/Dragger';
import { FileSyncOutlined, InboxOutlined } from '@ant-design/icons';
import CustomDivider from '../../components/DataPageItems/CustomDivider';
import { Typography } from 'antd';
import GeneralReportFilter from './components/GeneralReportFilter';

import ApiService from '../../modules/ApiService';
import { messageOutputModel } from '../../models/BaseModels';

const { Title } = Typography;

const GenerateReport: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const handleClear = () => {
    form.resetFields();
    setFile(undefined);
  };

  const uploadProps: UploadProps = {
    accept: '.xlsx',
    showUploadList: false,
    maxCount: 1,
    beforeUpload: (file: File) => {
      const isExcel =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file`);
      }
      return isExcel || Upload.LIST_IGNORE;
    },
    customRequest: async ({ file, onSuccess, onError }: any) => {
      setFile(file as File);
      debugger;
      onSuccess?.(intl.formatMessage(commonResources.success));
      onError?.(new Error(intl.formatMessage(commonResources.error)));
    },
    onRemove: () => {
      handleClear();
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      const droppedFiles = e.dataTransfer.files;

      if (!droppedFiles || droppedFiles.length === 0) return;

      if (droppedFiles.length > 1) {
        message.error(
          intl.formatMessage(generateReportResources.draggerWarningMessage)
        );
        return;
      }

      const file = droppedFiles[0];
      const isExcel =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file`);
        return;
      }

      setFile(file);
    }
  };

  const handleGenerateReportClick = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    setLoading(true);

    const formValues = form.getFieldsValue();
    const formData = new FormData();

    formData.append('file', file as File);
    formData.append('fileName', formValues.fileName);
    formData.append('description', formValues.description);
    formData.append('fileType', formValues.fileType);
    formData.append('reportType', formValues.reportType);

    try {
      const response = await ApiService.UsePostFormData<messageOutputModel>(
        '/AzureFile/GenerateReport',
        formData
      );

      if (response.isSuccessed) {
        notification.success({
          message: intl.formatMessage(commonResources.uploadSuccess),
          description: response.messages.join('\n'),
          placement: 'topRight',
          duration: 0,
          style: { width: '600px' }
        });
      } else {
        notification.error({
          message: intl.formatMessage(commonResources.error),
          description: response.messages.join('\n'),
          placement: 'topRight'
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(generateReportResources.generateReport)}
        onClearClick={handleClear}
        loading={loading}
      />

      <Dragger {...uploadProps}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          {intl.formatMessage(generateReportResources.clickOrDragMessage)}
        </p>
        <p className='ant-upload-hint'>
          {intl.formatMessage(generateReportResources.draggerWarningMessage)}
        </p>
      </Dragger>

      <CustomDivider />

      {file && (
        <>
          <Title level={5} style={{ marginTop: 5, color: '#1890ff' }}>
            {intl.formatMessage(generateReportResources.selectedFile, {
              fileName: file.name,
              fileSize: (file.size / (1024 * 1024)).toFixed(2),
              lastModified: new Date(file.lastModified).toLocaleString()
            })}
          </Title>

          <GeneralReportFilter form={form} />

          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
          >
            <Button
              icon={<FileSyncOutlined />}
              type='primary'
              onClick={() => handleGenerateReportClick()}
              loading={loading}
            >
              {intl.formatMessage(generateReportResources.generateReport)}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GenerateReport;
