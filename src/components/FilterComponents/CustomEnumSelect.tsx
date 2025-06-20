import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';

const { Option } = Select;

interface CustomEnumSelectProps<T> {
  enumObject: T;
  name: string;
  label: string;
  rules?: any[];
  disabled?: boolean;
  placeholder?: string;
}

function CustomEnumSelect<T extends object>({
  enumObject,
  name,
  label,
  rules = [],
  disabled = false,
  placeholder
}: CustomEnumSelectProps<T>) {
  const intl = useIntl();

  function formatEnumLabel(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  const options = Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      label: formatEnumLabel(key),
      value: (enumObject as any)[key] as number
    }));

  return (
    <DataPageFormItem label={label} name={name} rules={rules}>
      <Select
        disabled={disabled}
        placeholder={
          placeholder ||
          intl.formatMessage({
            id: 'select.placeholder',
            defaultMessage: 'Please select'
          })
        }
        allowClear
      >
        {options.map(opt => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </DataPageFormItem>
  );
}

export default CustomEnumSelect;
