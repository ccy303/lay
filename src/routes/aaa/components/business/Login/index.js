import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { login, config } from '@http/user';
const LoginCom = props => {
  // http://localhost:20070/#/login?origin_uri1=http://localhost:20071?aaa%3D0%26bbb%3D1
  (async () => {
    const { code, client_id, origin_uri } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (code) {
      try {
        await login({ code, client_id, redirect_uri: encodeURI(location.href) });
      } catch (error) {
        console.log('error: ', error);
      }
      // axios.get('/api/user/info');
      // sessionStorage.setItem('login', true);
      // sessionStorage.setItem('useAuth', 'admin');
      const href = unescape(origin_uri ?? '');
      if (href) {
        location.href = href;
      } else {
        props.history.push('/home');
      }
      return;
    }
    try {
      const res = await config();
      const { flag, data, message } = res;
      if (!flag) throw Error(message);
      const uri = data.url;
      delete data.url;
      data.redirect_uri = encodeURI(location.href);
      location.href = `${uri}/login/authLogin${qs.stringify(data, {
        addQueryPrefix: true,
      })}`;
    } catch (error) {
      console.log('error: ', error);
    }
  })();
  return null;
};
export default LoginCom;
