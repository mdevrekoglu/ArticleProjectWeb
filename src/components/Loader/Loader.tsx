import React from 'react';
import { Spin, theme, Typography } from 'antd';
import './style.css';

const { Text } = Typography;
const { useToken } = theme;

const Loader: React.FC = () => {
  const { token } = useToken();

  return (
    <div
      className='loader-container'
      style={{ backgroundColor: token?.colorBgLayout }}
    >
      <Spin size='large' />
    </div>
  );
};

export default Loader;
