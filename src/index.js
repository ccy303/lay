import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'caihrc';
import zhCN from 'caihrc/lib/locale/zh_CN';
import App from './App';
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
  ,
  document.getElementById('root')
);
