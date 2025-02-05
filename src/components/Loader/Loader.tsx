import React from 'react';
import { Spin, theme } from 'antd';
import './style.css';

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
