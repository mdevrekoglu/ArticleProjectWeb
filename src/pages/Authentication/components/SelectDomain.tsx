import { Select } from 'antd';
import React from 'react';
import { Domains, UserTypes } from '../enums';

interface SelectDomainProps {
  handleDomainChange: (userType: UserTypes) => void;
}

const SelectDomain: React.FC<SelectDomainProps> = ({ handleDomainChange }) => {
  const { Option } = Select;

  const domainToUserTypeMap: { [key in Domains]: UserTypes } = {
    [Domains.Student]: UserTypes.Student,
    [Domains.Lecturer]: UserTypes.Lecturer
  };

  const domainOptions = Object.values(Domains);

  const onChange = (selectedDomain: Domains) => {
    const userType = domainToUserTypeMap[selectedDomain];
    handleDomainChange(userType);
  };

  return (
    <Select defaultValue={Domains.Student} onChange={onChange}>
      {domainOptions.map(domain => (
        <Option key={domain} value={domain}>
          {domain}
        </Option>
      ))}
    </Select>
  );
};

export default SelectDomain;
