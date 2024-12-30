import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { facultyDataListModel, facultySearchInputModel } from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import facultyResources from './messages';
import { Form, notification } from 'antd';
import ApiService from '../../modules/ApiService';
import FacultyFilter from './components/FacultyFilter';

const Faculty: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<facultyDataListModel>();

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
        sortingType: sortOrder,
        affiliationIds: form.getFieldsValue().affiliationIds || []
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

  const handleAffiliationChange = (selectedIds: number[]) => {
    console.log('Selected IDs:', selectedIds);
    // Use the selected IDs here
  };

  const handleClear = () => {
    form.resetFields();
    setData(undefined);
    setPagination({ current: 1, pageSize: 10, total: 0 });
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(facultyResources.pageTitle)}
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
      />

      <FacultyFilter
        form={form}
        onAffiliationChange={handleAffiliationChange}
      />
    </div>
  );
};

export default Faculty;
