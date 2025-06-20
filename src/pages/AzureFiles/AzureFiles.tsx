import { Form, notification, UploadProps } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { azureFileListOutputModel, azureFileSearchInputModel } from './models';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import azureFilesResources from './messages';
import AzureFileFilter from './components/AzureFileFilter';
import AzureFileTable from './components/AzureFileTable';
import { useNavigate } from 'react-router';
import { keyInputModel, messageOutputModel } from '../../models/BaseModels';

const AzureFiles = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<azureFileListOutputModel>();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [sorter, setSorter] = useState<{
    field?: string;
    order?: 'ascend' | 'descend';
  }>({});

  const fetchData = async (
    page = 1,
    pageSize = 10,
    sortField?: string,
    sortOrder?: string
  ) => {
    setLoading(true);
    try {
      const searchData: azureFileSearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        azureFileSearchInputModel,
        azureFileListOutputModel
      >('/AzureFile/GetAllPagedBySearchModel', searchData);

      if (response.isSuccessed) {
        setData(response);
      } else {
        notification.error({
          message: intl.formatMessage(commonResources.anErrorOccurred),
          description: response.messages.join('\n'),
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
      }

      setPagination({
        current: page,
        pageSize,
        total: response?.count || 0
      });
    } catch (error) {
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: number) => {
    setLoading(true);
    try {
      debugger;
      const { blob, fileName } = await ApiService.UseGetBlob<keyInputModel>(
        '/AzureFile/DownloadFileById',
        { id: id } as keyInputModel
      );

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    form.resetFields();
    setData(undefined);
    setPagination({ current: 1, pageSize: 10, total: 0 });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setSorter({ field: sorter.field, order: sorter.order });
    fetchData(current, pageSize, sorter.field, sorter.order);
  };

  const uploadProps: UploadProps = {
    showUploadList: false,
    maxCount: 1,
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('File', file as File);

      try {
        const response = await ApiService.UsePostFormData<messageOutputModel>(
          '/AzureFile/UploadFile',
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
          onSuccess?.(response);
          fetchData(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
          );
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(azureFilesResources.azureFiles)}
        onSearchClick={() =>
          fetchData(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
          )
        }
        uploadProps={uploadProps}
        uploadName={intl.formatMessage(commonResources.uploadFile)}
        onNewItemClick={() => navigate('/generate-report')}
        onClearClick={handleClear}
        loading={loading}
        dataCount={data?.count}
      />

      <AzureFileFilter form={form} />

      <AzureFileTable
        data={data?.data}
        onSortChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        loading={loading}
        onDownloadClick={handleDownload}
      />
    </div>
  );
};

export default AzureFiles;
