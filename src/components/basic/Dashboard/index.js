import React, { useState, Suspense, useEffect } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import Loading from '@src/components/basic/Loading';
import { Layout } from 'caihrc';
import './styles.scss';
const LayoutUI = props => {
  const [collapsed, setCollapsed] = useState(false);
  return <Layout styleName="dashboard-wrap">
    <Layout.Sider
      styleName="fullHeight"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div styleName="logo" />
      <Menu menu={props.menu} />
    </Layout.Sider>
    <Layout styleName="fullHeight overflow-hidden">
      <Layout.Header styleName="header">
        <Header
          toggle={() => { setCollapsed(!collapsed); }}
          collapsed={collapsed}
        />
      </Layout.Header>
      <Suspense fallback={<Loading />}>
        <Layout.Content styleName="content">
          {props.children}
        </Layout.Content>
      </Suspense>
      <Layout.Footer styleName="padding-0">
        <Footer />
      </Layout.Footer>
    </Layout>
  </Layout>;
};

export default LayoutUI;
