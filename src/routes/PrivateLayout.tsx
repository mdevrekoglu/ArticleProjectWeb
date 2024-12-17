import React from 'react';
import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';
import SideBar from '../components/Layout/SideBar';

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapseChange = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar collapsed={collapsed} onCollapseChange={handleCollapseChange} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'margin-left 0.2s',
          marginTop: 64,
          padding: '12px'
        }}
      >
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
