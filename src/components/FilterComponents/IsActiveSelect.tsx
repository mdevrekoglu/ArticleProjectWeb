import React from 'react';
import { Radio } from 'antd';
import { defineMessages, useIntl } from 'react-intl';
import DataPageFormItem from '../DataPageItems/DataPageFormItem';

const messages = defineMessages({
  isActive: {
    id: 'isActiveSelect.isActive',
    defaultMessage: 'Is Active'
  },
  all: {
    id: 'isActiveSelect.all',
    defaultMessage: 'All'
  },
  active: {
    id: 'isActiveSelect.active',
    defaultMessage: 'Active'
  },
  notActive: {
    id: 'isActiveSelect.inactive',
    defaultMessage: 'Not Active'
  }
});

interface IsActiveSelectProps {
  value?: boolean | null;
  onChange?: (value: boolean | null) => void;
  name?: string;
  rules?: any[];
  disabled?: boolean;
}

const IsActiveSelect: React.FC<IsActiveSelectProps> = ({
  value = undefined,
  onChange,
  name = 'isActive',
  rules = [],
  disabled = false
}) => {
  const intl = useIntl();

  const radioButtonStyle = {
    fontSize: '12px',
    padding: '0px 10px'
  };

  return (
    <DataPageFormItem
      label={intl.formatMessage(messages.isActive)}
      name={name}
      rules={rules}
      initialValue={value}
    >
      <Radio.Group
        onChange={e => onChange?.(e.target.value)}
        optionType='button'
        buttonStyle='solid'
        style={{
          display: 'flex'
        }}
        disabled={disabled}
      >
        <Radio.Button value={undefined} style={radioButtonStyle}>
          {intl.formatMessage(messages.all)}
        </Radio.Button>
        <Radio.Button value={true} style={radioButtonStyle}>
          {intl.formatMessage(messages.active)}
        </Radio.Button>
        <Radio.Button value={false} style={radioButtonStyle}>
          {intl.formatMessage(messages.notActive)}
        </Radio.Button>
      </Radio.Group>
    </DataPageFormItem>
  );
};

export default IsActiveSelect;
