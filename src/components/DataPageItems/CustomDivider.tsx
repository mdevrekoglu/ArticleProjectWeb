import { Divider, DividerProps } from 'antd';
import React from 'react';

interface CustomDividerProps extends DividerProps {
  children?: React.ReactNode;
}

const CustomDivider: React.FC<CustomDividerProps> = ({
  children,
  ...props
}) => {
  return (
    <Divider
      {...props}
      style={{ marginTop: '8px', marginBottom: '8px', ...props.style }}
    >
      {children}
    </Divider>
  );
};

export default CustomDivider;
