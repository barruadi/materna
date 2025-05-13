"use client"

import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const PageHeader: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <p>This is header</p>
        </Header>
  );
};

export default PageHeader;