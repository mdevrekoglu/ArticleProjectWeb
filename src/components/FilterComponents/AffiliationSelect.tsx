import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Select, Spin, notification } from 'antd';
import debounce from 'lodash/debounce';
import ApiService from '../../modules/ApiService';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';

const messages = defineMessages({
  enterKeyword: {
    id: 'affiliationSelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  unknownError: {
    id: 'affiliationSelect.unknownError',
    defaultMessage: 'Unknown error occurred. Please try again later.'
  },
  anErrorOccurred: {
    id: 'affiliationSelect.anErrorOccurred',
    defaultMessage: 'An error occurred!'
  },
  affiliation: {
    id: 'affiliationSelect.affiliation',
    defaultMessage: 'Affiliation'
  }
});

const { Option } = Select;

interface AffiliationSelectProps {
  mode?: 'multiple' | 'single';
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
}

const AffiliationSelect: React.FC<AffiliationSelectProps> = ({
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
  const fetchAffiliations = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) return; // Only fetch if at least 2 characters

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          {
            keyword: string;
          },
          BaseGetOptionsOutputModel[]
        >('/Affiliation/GetOptionsByKeyword', {
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
      label={intl.formatMessage(messages.affiliation)}
      name={mode === 'multiple' ? 'affiliationIds' : 'affiliationId'}
      rules={rules}
    >
      <Select
        mode={mode === 'multiple' ? 'multiple' : undefined}
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchAffiliations}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
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

export default AffiliationSelect;
