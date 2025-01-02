import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { facultyDataListModel, facultySearchInputModel } from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import facultyResources from './messages';
import { Form, notification } from 'antd';
import ApiService from '../../modules/ApiService';
import FacultyFilter from './components/FacultyFilter';
import FacultyTable from './components/FacultyTable';
import FacultyDetailModal from './components/FacultyDetailModal';

const Faculty: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<facultyDataListModel>();

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
      const searchData: facultySearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        facultySearchInputModel,
        facultyDataListModel
      >('/Faculty/GetAllPagedBySearchModel', searchData);

      if (response.isSuccessed) {
        setData(response);
      } else {
        notification.error({
          message: intl.formatMessage(facultyResources.anErrorOccurred),
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
        message: intl.formatMessage(facultyResources.unknownError),
        placement: 'topRight',
        duration: 5,
        style: { width: '400px' }
      });
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
        pageTitle={intl.formatMessage(facultyResources.faculty)}
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
        loading={loading}
        dataCount={data?.count}
      />

      <FacultyFilter form={form} />

      <FacultyTable
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

      <FacultyDetailModal
        open={isModalVisible}
        handleModalClose={handleModalClose}
        inputId={selectedId}
      />
    </div>
  );
};

export default Faculty;
