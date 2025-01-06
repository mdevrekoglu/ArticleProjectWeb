import React, { useState } from 'react';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import { useIntl } from 'react-intl';
import searchCollaboratorResources from './messages';
import { collaboratorDataListModel, collaboratorSearchModel } from './models';
import { Form, notification } from 'antd';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import SearchCollaboratorFilter from './components/SearchCollaboratorFilter';
import SearchCollaboratorTable from './components/SearchCollaboratorTable';

const SearchCollaborator = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<collaboratorDataListModel>();

  const fetchData = async () => {
    setLoading(true);

    // Validate the form
    try {
      await form.validateFields();
    } catch (error) {
      setLoading(false);
      return;
    }

    try {
      const searchData: collaboratorSearchModel = {
        ...form.getFieldsValue()
      };

      const response = await ApiService.UsePost<
        collaboratorSearchModel,
        collaboratorDataListModel
      >('/Collaborator/GetCollaborators', searchData);

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
    } catch (error) {
      notification.error({
        message: intl.formatMessage(commonResources.unknownError),
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
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(
          searchCollaboratorResources.searchCollaborator
        )}
        onSearchClick={fetchData}
        loading={loading}
        onClearClick={handleClear}
        dataCount={data?.count}
      />

      <SearchCollaboratorFilter form={form} />

      <SearchCollaboratorTable data={data} />
    </div>
  );
};

export default SearchCollaborator;
