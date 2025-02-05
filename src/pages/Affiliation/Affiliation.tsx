import React, { useState } from 'react';
import { Form, notification } from 'antd';
import AffiliationFilter from './components/AffiliationFilter';
import {
  affiliationDataListModel,
  affiliationSearchInputModel
} from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import affiliationResources from './messages';
import { useIntl } from 'react-intl';
import AffiliationTable from './components/AffiliationTable';
import ApiService from '../../modules/ApiService';
import AffiliationDetailModal from './components/AffiliationDetailModal'; // Import the modal

const Affiliation: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<affiliationDataListModel>();

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

  // Modal control
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  // Fetch data function with pagination and sorting
  const fetchData = async (
    page = 1,
    pageSize = 10,
    sortField?: string,
    sortOrder?: string
  ) => {
    setLoading(true);
    try {
      const searchData: affiliationSearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        affiliationSearchInputModel,
        affiliationDataListModel
      >('/Affiliation/GetAllPagedBySearchModel', searchData);

      if (response.isSuccessed) {
        setData(response);
      } else {
        notification.error({
          message: intl.formatMessage(affiliationResources.anErrorOccurred),
          description: response.messages.join('\n'),
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
        setData(undefined);
      }

      setPagination({
        current: page,
        pageSize,
        total: response?.count || 0
      });
    } catch (error) {
      notification.error({
        message: intl.formatMessage(affiliationResources.unknownError),
        placement: 'topRight',
        duration: 5,
        style: { width: '400px' }
      });
      setData(undefined);
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
        pageTitle={intl.formatMessage(affiliationResources.affiliation)}
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

      <AffiliationFilter form={form} />

      <AffiliationTable
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

      <AffiliationDetailModal
        open={isModalVisible}
        handleModalClose={handleModalClose}
        inputId={selectedId}
      />
    </div>
  );
};

export default Affiliation;
