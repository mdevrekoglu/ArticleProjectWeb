// src/pages/Authentication/components/QuartileSelect.tsx
import React from 'react';
import { Select } from 'antd';
import { Quartiles } from '../enums';

const quartileOptions = [
  { label: 'Q1', value: Quartiles.Q1 },
  { label: 'Q2', value: Quartiles.Q2 },
  { label: 'Q3', value: Quartiles.Q3 },
  { label: 'Q4', value: Quartiles.Q4 },
];

interface Props {
  value?: number; // Antd Form'dan gelir
  onChange?: (value: number) => void; // Antd Form'dan gelir
  placeholder?: string;
}

const QuartileSelect: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Select Quartile'}
      options={quartileOptions}
      style={{ width: '100%' }}
    />
  );
};

export default QuartileSelect;
