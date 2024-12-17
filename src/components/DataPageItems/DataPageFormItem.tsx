import React from 'react';
import { Form, FormItemProps, theme } from 'antd';

const { useToken } = theme;
const DataPageFormItem: React.FC<FormItemProps> = props => {
  const { token } = useToken();

  return (
    <Form.Item
      labelAlign='left'
      style={{
        width: '100%',
        backgroundColor: token.colorBgElevated,
        borderRadius: '4px',
        padding: '4px',
        ...props.style
      }} // Allow overriding or extending the style
      colon={false}
      labelCol={{
        style: {
          width: '80px',
          textAlign: 'right',
          ...(props.labelCol?.style || {}) // Merge with additional labelCol styles if provided
        },
        ...props.labelCol
      }}
      {...props} // Spread any additional props passed to the component
    />
  );
};

export default DataPageFormItem;
