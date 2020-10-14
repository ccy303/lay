import React, { useState, useEffect } from 'react';
import { Menu, Message, Modal, Form, Input, Dropdown, Avatar } from 'caihrc';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import './styles.scss';

const Header = ({ toggle, collapsed, CommonStore }) => {
  const history = useHistory();
  const [changePwdModel, setChangePwdModel] = useState(false);
  const logout = () => {
    // httpLoginOut().then(res => {
    //   if (res.code !== '0000') return false;
    //   // CommonStore.setLoginInfo('info', null);
    //   Message.success('退出成功');
    //   history.push('/login');
    // });
  };
  const changePwd = () => {
    setChangePwdModel(true);
  };
  const onCancel = () => {
    setChangePwdModel(false);
  };
  const onOk = (v) => {
    // changePass(v).then(res => {
    //   setChangePwdModel(false);
    //   res.code === '0000' && Message.success('修改成功');
    // });
  };
  return <>
    <UI
      onLogout={logout}
      collapsed={collapsed}
      toggle={toggle}
      // roleName={CommonStore?.loginInfo?.info?.userCache?.nickname}
      changePwd={changePwd}
    />
    <CModal
      show={changePwdModel}
      onCancel={onCancel}
      onOk={onOk}
    />
  </>;
};

const UI = props => {
  const DropMenu = <Menu>
    <Menu.Item key="0" onClick={props.changePwd}>
      修改密码
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" onClick={props.onLogout}>
      退出系统
    </Menu.Item>
  </Menu>;
  return <div styleName="header-right">
    <Dropdown overlay={DropMenu}>
      <span styleName="nameBox hoverBox">
        <Avatar styleName="avatar" size="small" icon={<UserOutlined />} />
        <span>您好！{props.roleName}</span>
      </span>
    </Dropdown>
  </div>;
};

const CModal = props => {
  const [form] = Form.useForm();
  const submit = () => {
    form.validateFields().then(v => {
      props.onOk(v);
    });
  };
  const reg = /[0-9A-Za-z]{6,18}/;
  const rules = {
    newPassword: (rule, v) => {
      if (v !== "" && v !== undefined) {
        if (reg.test(v)) {
          return Promise.resolve();
        } else {
          return Promise.reject('请输入6-18位由字母和数字组成的新密码');
        }
      } else {
        return Promise.reject();
      }
    },
    _newPassword: (rule, v) => {
      // const newPassword = form.getFieldValue('newPassword');
      // if (v !== undefined && v !== "") {
      //   if (reg.test(v)) {
      //     return newPassword === v ? Promise.resolve() : Promise.reject('两次密码输入不一致');
      //   } else {
      //     return Promise.reject('请输入6-18位由字母和数字组成的新密码');
      //   }
      // } else {
      //   return Promise.reject();
      // }
    },
    oldPassword: async (rule, v) => {
      // const res = await validPassword({ password: v });
      // console.log(res);
      // if (v !== "" && v !== undefined) {
      //   return res.code === '0000' ? Promise.resolve() : Promise.reject('输入密码与当前密码不一致');
      // } else {
      //   return Promise.reject();
      // }
    }
  };
  return <Modal
    forceRender
    afterClose={form.resetFields}
    title="修改密码"
    visible={props.show}
    cancelText="取消"
    okText="提交"
    onCancel={() => { props.onCancel(); }}
    onOk={submit}
    maskClosable={false}
  >
    <Form
      form={form}
      labelCol={{ span: 4 }}
      name="changePwd"
    >
      <Form.Item
        label="当前密码"
        name="oldPassword"
        rules={[
          { required: true, message: '请输入当前密码' },
          { validator: rules.oldPassword }
        ]}
        validateTrigger="onBlur"
      >
        <Input type="password" placeholder="请输入当前密码" />
      </Form.Item>
      <Form.Item
        label="新密码"
        name="newPassword"
        rules={[
          { required: true, message: '请输入新密码' },
          { validator: rules.newPassword }
        ]}
        validateTrigger="onBlur"
      >
        <Input type="password" placeholder="请输入6-18位由字母和数字组成的新密码" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="_newPassword"
        rules={[
          { required: true, message: '请再一次输入新密码' },
          { validator: rules._newPassword },
        ]}
        validateTrigger="onBlur"
      >
        <Input type="password" placeholder="请再一次输入新密码" />
      </Form.Item>
    </Form>
  </Modal >;
};

export default Header;

