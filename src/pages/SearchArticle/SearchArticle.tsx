import { Form } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import searchArticleResources from './messages';
import { articleDataListModel } from './models';
import SearchArticleFilter from './components/SearchArticleFilter';

const SearchArticle = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<articleDataListModel>();

  const fetchData = async () => {};

  const handleClear = () => {
    form.resetFields();
    setData(undefined);
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(searchArticleResources.searchArticle)}
        onSearchClick={fetchData}
        loading={loading}
        onClearClick={handleClear}
        dataCount={data?.count}
      />

      <SearchArticleFilter form={form} />
    </div>
  );
};

export default SearchArticle;
