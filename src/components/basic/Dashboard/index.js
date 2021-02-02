import React, { useState, useContext } from 'react';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { MenuContext } from '@src/routes/PermissionRoute';
import './styles.less';

const LayoutUI = props => {
  const { orgName, userName, phoneNum } = props;
  const [collapsed, setCollapsed] = useState(false);
  const context = useContext(MenuContext);
  return <Layout styleName="dashboard-wrap">
    <Layout styleName="fullHeight overflow-hidden">
      <Layout.Header styleName="header">
        {/*  eslint-disable-next-line no-undef */}
        <Header
          toggle={() => { setCollapsed(!collapsed); }}
          collapsed={collapsed}
          roleName={orgName + ' ' + (userName || phoneNum)}
        />
      </Layout.Header>
      <Layout style={{ height: "500px" }}>
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
            <Breadcrumb separator=">">
              {
                context.ACTIVE_ROUTE?.slice(-1)[0]?.breadcrumbs?.length ?
                  <>
                    {context.ACTIVE_ROUTE?.slice(-1)[0]?.breadcrumbs?.map(v => {
                      return <Breadcrumb.Item key={v.path}>
                        {(() => {
                          if (!v.path || !v.canBreadcrumb) { return v.title; }
                          if (/^(www|https:\/\/|http:\/\/)/.test(v.path)) {
                            return <a href={v.path} target={v.newWindow ? '_block' : ''} >{v.title}</a>;
                          } else {
                            return <Link to={v.path}>{v.title}</Link>;
                          }
                        })()}
                        {/* {v.path ? <Link to={v.path}>{v.title}</Link> : v.title} */}
                      </Breadcrumb.Item>;
                    })}
                  </> :
                  <>
                    {context.ACTIVE_ROUTE?.map((v, i) => {
                      return <Breadcrumb.Item key={v.path}>
                        {i === 0 && !v.canBreadcrumb ? v.title : <Link to={v.path}>{v.title}</Link>}
                      </Breadcrumb.Item>;
                    })}
                  </>
              }
            </Breadcrumb>
          </Layout.Header>
          <Layout.Content styleName="content">
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
      <Layout.Footer styleName="padding-left-200">
        <Footer />
      </Layout.Footer>
    </Layout>
  </Layout>;
};

export default LayoutUI;
