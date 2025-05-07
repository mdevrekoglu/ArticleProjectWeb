import { notification, Select, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import ApiService from '../../modules/ApiService';
import { debounce } from 'lodash';

const messages = defineMessages({
  enterKeyword: {
    id: 'journalSelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  unknownError: {
    id: 'journalSelect.unknownError',
    defaultMessage: 'Unknown error occurred. Please try again later.'
  },
  anErrorOccurred: {
    id: 'journalSelect.anErrorOccurred',
    defaultMessage: 'An error occurred!'
  },
  journal: {
    id: 'journalSelect.Journal',
    defaultMessage: 'Journal'
  }
});

const { Option } = Select;

interface JournalSelectProps {
  mode?: 'multiple' | 'single';
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
}

const JournalSelect: React.FC<JournalSelectProps> = ({
  mode = 'multiple',
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
  const fetchJournals = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) return; // Only fetch if at least 2 characters

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          {
            keyword: string;
          },
          BaseGetOptionsOutputModel[]
        >('/Journal/GetOptionsByKeyword', {
          keyword: searchTerm
        });

        setOptions(response || []);
      } catch (error) {
        notification.error({
          message: intl.formatMessage(messages.unknownError),
          placement: 'topRight',
          duration: 5
        });
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.journal)}
      name={mode === 'multiple' ? 'journalIds' : 'journalId'}
      rules={rules}
    >
      <Select
        mode={mode === 'multiple' ? 'multiple' : undefined}
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchJournals}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{
          width: '100%'
        }}
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

export default JournalSelect;
