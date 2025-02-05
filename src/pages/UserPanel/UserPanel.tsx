import { Form, notification } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { userDataListModel, userSearchInputModel } from './models';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import userPanelResources from './messages';
import UserPanelFilter from './components/UserPanelFilter';
import UserPanelTable from './components/UserPanelTable';

const UserPanel: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<userDataListModel>();

  // Modal control
  /*
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  */

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
      const searchData: userSearchInputModel = {
        ...form.getFieldsValue(),
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        userSearchInputModel,
        userDataListModel
      >('/UserManagement/GetAllPagedBySearchModel', searchData);

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

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setSorter({ field: sorter.field, order: sorter.order });
    fetchData(current, pageSize, sorter.field, sorter.order);
  };

  /*
  const handleModelOpen = (id?: string) => {
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
  */

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(userPanelResources.userPanel)}
        onSearchClick={() =>
          fetchData(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
          )
        }
        onClearClick={handleClear}
        //onNewItemClick={handleModelOpen}
        loading={loading}
        dataCount={data?.count}
      />

      <UserPanelFilter form={form} />

      <UserPanelTable
        data={data}
        onSortChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        loading={loading}
        //onOpenModal={handleModelOpen}
      />
    </div>
  );
};

export default UserPanel;
