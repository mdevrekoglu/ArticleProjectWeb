import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import ApiService from '../../modules/ApiService';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';

const messages = defineMessages({
  enterKeyword: {
    id: 'userSelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  unknownError: {
    id: 'userSelect.unknownError',
    defaultMessage: 'Unknown error occurred. Please try again later.'
  },
  anErrorOccurred: {
    id: 'userSelect.anErrorOccurred',
    defaultMessage: 'An error occurred!'
  },
  user: {
    id: 'userSelect.user',
    defaultMessage: 'User'
  }
});

const { Option } = Select;

interface UserSelectProps {
  name?: string;
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
}

const UserSelect: React.FC<UserSelectProps> = ({
  name = 'userId',
  disabled = false,
  initialOption,
  rules = []
}) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<BaseGetOptionsOutputModel[]>([]);

  useEffect(() => {
    setOptions(initialOption ? [initialOption] : []);
  }, [initialOption]);

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) return; // Only fetch if at least 2 characters

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          {
            keyword: string;
          },
          BaseGetOptionsOutputModel[]
        >('/UserManagement/GetOptionsByKeyword', {
          keyword: searchTerm
        });

        setOptions(response || []);
      } catch (error) {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.user)}
      name={name}
      rules={rules}
    >
      <Select
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchUsers}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        maxTagCount={'responsive'}
        disabled={disabled}
        allowClear
        showSearch
      >
        {options.map(option => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Select>
    </DataPageFormItem>
  );
};

export default UserSelect;
