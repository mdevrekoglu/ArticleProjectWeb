import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { journalDataListModel, journalSearchInputModel } from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import journalResources from './messages';
import { Form, message, notification, Upload, UploadProps } from 'antd';
import ApiService from '../../modules/ApiService';
import JournalFilter from './components/JournalFilter';
import JournalTable from './components/JournalTable';
import JournalDetailModal from './components/JournalDetailModel';
import commonResources from '../../messages';
import { messageOutputModel } from '../../models/BaseModels';

const Journal: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<journalDataListModel>();

  // Modal control
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  // State for pagination and sorting
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
      const searchData: journalSearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        journalSearchInputModel,
        journalDataListModel
      >('/Journal/GetAllPagedBySearchModel', searchData);

      if (response.isSuccessed) {
        setData(response);
      } else {
        notification.error({
          message: intl.formatMessage(journalResources.anErrorOccurred),
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
      notification.error({
        message: intl.formatMessage(journalResources.unknownError),
        placement: 'topRight',
        duration: 5,
        style: { width: '400px' }
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    accept: '.xlsx',
    showUploadList: false,
    beforeUpload: file => {
      const isExcel =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file`);
      }
      return isExcel || Upload.LIST_IGNORE;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('File', file as File);

      try {
        const response = await ApiService.UsePostFormData<messageOutputModel>(
          '/Journal/UploadExcel',
          formData
        );

        if (response.isSuccessed) {
          notification.success({
            message: intl.formatMessage(commonResources.uploadSuccess),
            description: response.messages.join('\n'),
            placement: 'topRight',
            duration: 5,
            style: { width: '400px' }
          });
          onSuccess?.(response);
        }
      } catch (err) {
        notification.error({
          message: intl.formatMessage(commonResources.uploadFailed),
          description: (err as Error).message
        });
        onError?.(err as Error);
      } finally {
        setLoading(false);
      }
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

  const handleModelOpen = (id?: number) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const handleModalClose = (isDataChanged?: boolean) => {
    setIsModalVisible(false);
    setSelectedId(undefined);

    if (isDataChanged) {
      fetchData(
        pagination.current,
        pagination.pageSize,
        sorter.field,
        sorter.order
      );
    }
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(journalResources.journal)}
        onSearchClick={() =>
          fetchData(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
          )
        }
        onClearClick={handleClear}
        onNewItemClick={handleModelOpen}
        uploadProps={uploadProps}
        loading={loading}
        dataCount={data?.count}
      />

      <JournalFilter form={form} />

      <JournalTable
        data={data}
        onSortChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        loading={loading}
        onOpenModal={handleModelOpen}
      />

      <JournalDetailModal
        open={isModalVisible}
        handleModalClose={handleModalClose}
        inputId={selectedId}
      />
    </div>
  );
};

export default Journal;
