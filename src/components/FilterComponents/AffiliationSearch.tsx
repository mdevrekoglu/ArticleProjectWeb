import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Select, Spin, notification } from 'antd';
import debounce from 'lodash/debounce';
import ApiService from '../../modules/ApiService';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';

const messages = defineMessages({
  enterKeyword: {
    id: 'affiliationSearch.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  unknownError: {
    id: 'affiliationSearch.unknownError',
    defaultMessage: 'Unknown error occurred. Please try again later.'
  },
  anErrorOccurred: {
    id: 'affiliationSearch.anErrorOccurred',
    defaultMessage: 'An error occurred!'
  },
  affiliation: {
    id: 'affiliationSearch.affiliation',
    defaultMessage: 'Affiliation'
  }
});

const { Option } = Select;

interface AffiliationSearchProps {
  onChange: (selectedIds: number[]) => void; // Callback for selected IDs
}

const AffiliationSearch: React.FC<AffiliationSearchProps> = ({ onChange }) => {
  const intl = useIntl();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<BaseGetOptionsOutputModel[]>([]);
  const [selectedAffiliations, setSelectedAffiliations] = React.useState<
    number[]
  >([]);

  // Debounced fetch function
  const fetchAffiliations = React.useCallback(
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

  const handleChange = (values: number[]) => {
    setSelectedAffiliations(values);
    onChange(values); // Call the callback with the selected IDs
  };

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.affiliation)}
      name='affiliationIds'
    >
      <Select
        mode='multiple'
        placeholder={intl.formatMessage(messages.enterKeyword)}
        onSearch={fetchAffiliations}
        onChange={handleChange}
        value={selectedAffiliations}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        allowClear
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

export default AffiliationSearch;
