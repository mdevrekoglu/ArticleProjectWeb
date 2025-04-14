import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, notification } from 'antd';
import { researcherDataListModel, researcherSearchInputModel } from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import researcherResources from './messages';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import ResearcherFilter from './components/ResearcherFilter';
import ResearcherTable from './components/ResearcherTable';
import { SyncOutlined } from '@ant-design/icons';
import ResearcherFetchModal from './components/ResearcherFetchModal';

const Researcher: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<researcherDataListModel>();

  // Modal control
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const [isFetchModalVisible, setIsFetchModalVisible] = useState(false);

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
      const searchData: researcherSearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        researcherSearchInputModel,
        researcherDataListModel
      >('/Researcher/GetAllPagedBySearchModel', searchData);

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

        setData(undefined);
      }

      setPagination({
        current: page,
        pageSize,
        total: response?.count || 0
      });
    } catch (error) {
      notification.error({
        message: intl.formatMessage(commonResources.unknownError),
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

  const handleFetchModelOpen = () => {
    setIsFetchModalVisible(true);
  };

  const handleFetchModalClose = (isDataChanged?: boolean) => {
    setIsFetchModalVisible(false);

    if (isDataChanged) {
      fetchData(
        pagination.current,
        pagination.pageSize,
        sorter.field,
        sorter.order
      );
    }
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setSorter({ field: sorter.field, order: sorter.order });
    fetchData(current, pageSize, sorter.field, sorter.order);
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(researcherResources.researcher)}
        onSearchClick={() =>
          fetchData(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
          )
        }
        onClearClick={handleClear}
        loading={loading}
        dataCount={data?.count}
        extraButton={
          <Button
            type='default'
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
            icon={<SyncOutlined />}
            loading={loading}
            onClick={handleFetchModelOpen}
          >
            {intl.formatMessage(researcherResources.fetchFromScopus)}
          </Button>
        }
      />

      <ResearcherFilter form={form} />

      <ResearcherTable
        data={data}
        onSortChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        loading={loading}
      />

      <ResearcherFetchModal
        open={isFetchModalVisible}
        handleModalClose={handleFetchModalClose}
      />
    </div>
  );
};

export default Researcher;
