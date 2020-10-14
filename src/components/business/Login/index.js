import React, { useState, useRef } from 'react';
import { Login } from 'caihrc';
import Footer from '../../basic/Footer';
import './styles.scss';
const { LoginByUserName } = Login;
const LoginCom = props => {
  const [loading, setLoading] = useState(false);
  // const { pending, info } = props.CommonStore.loginInfo;
  const userNameLoginRef = useRef();
  const config = {
    ref: userNameLoginRef,
    userName: {
      key: 'username',
      placeholder: '请输入账户名',
      errorMsg: '请输入账户名'
    },
    password: {
      key: 'password',
      placeholder: '密码',
    },
    captcha: {
      key: 'captcha',
      placeholder: '请输入验证码',
      errorMsg: '请输入验证码',
      src: `/admin/sys/user/imageCode`,
    },
    showEnglish: false,
    register: { hasItem: false },
    remember: { hasRemember: false, },
    forget: { hasItem: false },
    btnProps: {
      loading,
    },
    handleLogin: (values, successCb, failCb) => {
      setLoading(true);
    }
  };
  return <>
    <section styleName="login-wrap">
      <div styleName="login-box">
        <LoginByUserName {...config} />
      </div>
    </section>
    <Footer />
  </>;
};
export default LoginCom;
