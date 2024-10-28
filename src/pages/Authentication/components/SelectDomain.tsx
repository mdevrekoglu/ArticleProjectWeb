import { Select } from 'antd';
import React from 'react';
import { Domains, UserTypes } from '../enums';

interface SelectDomainProps {
  handleDomainChange: (userType: UserTypes) => void;
}

const SelectDomain: React.FC<SelectDomainProps> = ({ handleDomainChange }) => {
  const { Option } = Select;

  // Define the mapping between Domains and UserTypes
  const domainToUserTypeMap: { [key in Domains]: UserTypes } = {
    [Domains.Student]: UserTypes.Student,
    [Domains.Lecturer]: UserTypes.Lecturer
  };

  const domainOptions = Object.values(Domains);

  const onChange = (selectedDomain: Domains) => {
    const userType = domainToUserTypeMap[selectedDomain];
    handleDomainChange(userType); // Pass only the UserType value (0 for Student, 1 for Lecturer)
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
