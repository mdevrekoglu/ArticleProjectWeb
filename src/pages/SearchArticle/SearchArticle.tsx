import { Form, notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import searchArticleResources from './messages';
import { articleDataListModel, articleSearchInputModel } from './models';
import SearchArticleFilter from './components/SearchArticleFilter';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import SearchArticleTable from './components/SearchArticleTable';

const SearchArticle = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<articleDataListModel>();

  // State for pagination and sorting
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchData = async (
    page = 1,
    pageSize = 10,
    sortField?: string,
    sortOrder?: string
  ) => {
    const formValues = form.getFieldsValue();

    const hasAnyValue = Object.values(formValues).some(
      value =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
    );

    if (!hasAnyValue) {
      notification.warning({
        message: intl.formatMessage(searchArticleResources.validationWarning),
        description: intl.formatMessage(
          searchArticleResources.enterAtLeastOneFilter
        ),
        placement: 'topRight',
        duration: 4
      });
      return;
    }

    setLoading(true);

    try {
      const searchData: articleSearchInputModel = {
        ...formValues,
        pageIndex: page - 1,
        pageSize: pageSize,
        sortingColumn: sortField,
        sortingType: sortOrder
      };

      const response = await ApiService.UseGet<
        articleSearchInputModel,
        articleDataListModel
      >('/SearchArticle/GetAllPagedBySearchModel', searchData);

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

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, sorter.field, sorter.order);
  };

  const handleClear = () => {
    form.resetFields();
    setData(undefined);
    setPagination({ current: 1, pageSize: 10, total: 0 });
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(searchArticleResources.searchArticle)}
        onSearchClick={() => fetchData(pagination.current, pagination.pageSize)}
        onClearClick={handleClear}
        loading={loading}
        dataCount={data?.count}
      />

      <SearchArticleFilter form={form} />

      <SearchArticleTable
        data={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true
        }}
        onSortChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default SearchArticle;
