import { notification, Select, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { BaseGetOptionsOutputModel } from '../../models/BaseModels';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';
import { debounce } from 'lodash';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';

const messages = defineMessages({
  enterKeyword: {
    id: 'departmentSelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  department: {
    id: 'departmentSelect.department',
    defaultMessage: 'Department'
  }
});

const { Option } = Select;

interface DepartmentSelectProps {
  mode?: 'multiple' | 'single';
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
  selectedFacultyId: number;
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({
  mode = 'multiple',
  disabled = false,
  initialOption,
  rules = [],
  selectedFacultyId
}) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<BaseGetOptionsOutputModel[]>([]);

  useEffect(() => {
    setOptions(initialOption ? [initialOption] : []);
  }, [initialOption]);

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDepartments = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length < 2 || !selectedFacultyId) return;

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          { keyword: string; facultyId: number },
          BaseGetOptionsOutputModel[]
        >('/Department/GetOptionsByKeyword', {
          keyword,
          facultyId: selectedFacultyId
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
    [selectedFacultyId]
  );

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.department)}
      name={mode === 'multiple' ? 'departmentIds' : 'departmentId'}
      rules={rules}
    >
      <Select
        mode={mode === 'multiple' ? 'multiple' : undefined}
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchDepartments}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        maxTagCount={'responsive'}
        disabled={disabled || (!selectedFacultyId && !initialOption)}
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

export default DepartmentSelect;
