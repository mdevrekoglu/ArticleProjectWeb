import { Select } from 'antd';
import React from 'react';
import { Domains } from '../../enum';

interface SelectDomainProps {
  handleDomainChange: (value: Domains) => void;
}

const SelectDomain: React.FC<SelectDomainProps> = ({ handleDomainChange }) => {
  const { Option } = Select;
  const domainOptions = Object.values(Domains);

  return (
    <Select defaultValue={Domains.Student} onChange={handleDomainChange}>
      {domainOptions.map(domain => (
        <Option key={domain} value={domain}>
          {domain}
        </Option>
      ))}
    </Select>
  );
};

export default SelectDomain;
