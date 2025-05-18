import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Select, Spin, notification } from 'antd';
import debounce from 'lodash/debounce';
import ApiService from '../../modules/ApiService';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';
import commonResources from '../../messages';

const messages = defineMessages({
  enterKeyword: {
    id: 'facultySelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  faculty: {
    id: 'facultySelect.faculty',
    defaultMessage: 'Faculty'
  }
});

const { Option } = Select;

interface FacultySelectProps {
  mode?: 'multiple' | 'single';
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
  selectedAffiliationId: number;
}

const FacultySelect: React.FC<FacultySelectProps> = ({
  mode = 'multiple',
  disabled = false,
  initialOption,
  rules = [],
  selectedAffiliationId
}) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<BaseGetOptionsOutputModel[]>([]);

  useEffect(() => {
    setOptions(initialOption ? [initialOption] : []);
  }, [initialOption]);

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFacultys = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length < 2 || !selectedAffiliationId) return;

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          { keyword: string; affiliationId: number },
          BaseGetOptionsOutputModel[]
        >('/Faculty/GetOptionsByKeyword', {
          keyword,
          affiliationId: selectedAffiliationId
        });

        setOptions(response || []);
      } catch (error) {
        notification.error({
          message: intl.formatMessage(commonResources.unknownError),
          placement: 'topRight',
          duration: 5
        });
      } finally {
        setLoading(false);
      }
    }, 1000),
    [selectedAffiliationId]
  );

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.faculty)}
      name={mode === 'multiple' ? 'facultyIds' : 'facultyId'}
      rules={rules}
    >
      <Select
        mode={mode === 'multiple' ? 'multiple' : undefined}
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchFacultys}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        maxTagCount={'responsive'}
        disabled={disabled || (!selectedAffiliationId && !initialOption)}
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

export default FacultySelect;
