import React, { useState, useContext } from "react";
import Header from "../header";
import Menu from "../menu";
import { Layout, Breadcrumb } from "antd";
import { Outlet } from "react-router-dom";
import style from "./styles.less";

const LayoutUI = (props) => {
  return (
    <Layout className={style.warp}>
      <Layout.Header className={style.header}>
        <Header {...props} />
      </Layout.Header>
      <Layout>
        <Layout.Sider className={style.sider}>
          <Menu {...props} />
        </Layout.Sider>
        <Layout.Content className={style.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutUI;
