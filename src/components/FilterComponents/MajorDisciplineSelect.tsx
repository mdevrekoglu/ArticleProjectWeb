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
    id: 'majorDisciplineSelect.enterKeyword',
    defaultMessage: 'Enter keyword'
  },
  majorDiscipline: {
    id: 'majorDisciplineSelect.majorDiscipline',
    defaultMessage: 'Major Discipline'
  }
});

const { Option } = Select;

interface MajorDisciplineSelectProps {
  mode?: 'multiple' | 'single';
  disabled?: boolean;
  initialOption?: BaseGetOptionsOutputModel;
  rules?: any[];
  selectedDepartmentId: number;
}

const MajorDisciplineSelect: React.FC<MajorDisciplineSelectProps> = ({
  mode = 'multiple',
  disabled = false,
  initialOption,
  rules = [],
  selectedDepartmentId
}) => {
  const intl = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<BaseGetOptionsOutputModel[]>([]);

  useEffect(() => {
    setOptions(initialOption ? [initialOption] : []);
  }, [initialOption]);

  // Debounced fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMajorDisciplines = useCallback(
    debounce(async (keyword: string) => {
      if (keyword.length < 2 || !selectedDepartmentId) return;

      setLoading(true);
      try {
        const response = await ApiService.UseGet<
          { keyword: string; facultyId: number },
          BaseGetOptionsOutputModel[]
        >('/MajorDiscipline/GetOptionsByKeyword', {
          keyword,
          facultyId: selectedDepartmentId
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
    [selectedDepartmentId]
  );

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.majorDiscipline)}
      name={mode === 'multiple' ? 'majorDisciplineIds' : 'majorDisciplineId'}
      rules={rules}
    >
      <Select
        mode={mode === 'multiple' ? 'multiple' : undefined}
        placeholder={intl.formatMessage(messages.enterKeyword)}
        defaultValue={initialOption?.id}
        onSearch={fetchMajorDisciplines}
        notFoundContent={loading ? <Spin size='small' /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        maxTagCount={'responsive'}
        disabled={disabled || (!selectedDepartmentId && !initialOption)}
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

export default MajorDisciplineSelect;
