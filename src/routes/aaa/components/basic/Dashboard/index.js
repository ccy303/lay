import React, { useState, useContext } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import { Layout, Breadcrumb } from 'caihrc';
import { Link } from 'react-router-dom';
import { MenuContext } from '@routes/PermissionRoute';
import './styles.less';

const LayoutUI = props => {
  const [collapsed, setCollapsed] = useState(false);
  const context = useContext(MenuContext);
  return <Layout styleName="dashboard-wrap">
    <Layout styleName="fullHeight overflow-hidden">
      <Layout.Header styleName="header">
        <div styleName="logo" />
        <Header
          toggle={() => { setCollapsed(!collapsed); }}
          collapsed={collapsed}
        />
      </Layout.Header>
      <Layout>
        <Layout.Sider
          styleName="fullHeight"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu />
        </Layout.Sider>
        <Layout>
          <Layout.Header styleName="breadcrumb-header">
            <Breadcrumb>
              {context.ACTIVE_ROUTE?.map((v, i) => <Breadcrumb.Item key={v.path}>
                {i === 0 ? v.title : <Link to={v.path}>{v.title}</Link>}
              </Breadcrumb.Item>)}
            </Breadcrumb>
          </Layout.Header>
          <Layout.Content styleName="content">
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
      <Layout.Footer styleName="padding-0">
        <Footer />
      </Layout.Footer>
    </Layout>
  </Layout>;
};

export default LayoutUI;
