import axios from "axios";
import { Message } from "caihrc";
import { HashRouter } from "react-router-dom";
import { runCommonStoreActions } from "@src/store";
const router = new HashRouter();
let timer = null; // 防抖

// 请求拦截
axios.interceptors.request.use(config => {
  config.headers.Loading && runCommonStoreActions("setHttpRequest", [true]);
  if (config.method.toLocaleLowerCase() === 'get') {
    if (config.params) {
      config.params._t = new Date().getTime();
    }
  }
  return config;
});

// 响应拦截
axios.interceptors.response.use(response => {
  const { data, config } = response;
  const { noMsg, Loading, downloadFile } = config.headers;
  Loading && runCommonStoreActions("setHttpRequest", [false]);
  if (data.code !== "0000" && !noMsg && !downloadFile) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      Message.error(data.message);
    }, 500);
  }
  (data.code === "401 UNAUTHORIZED" || data.code === "401") &&
    router.history.push("/login");
  if (downloadFile) return response;
  return data;
  // // 会话失效跳转
  // if (data.code === '401 UNAUTHORIZED') {
  //   router.history.push('/login');
  //   // throw error 会导致后续代码无法执行
  //   // new Error('UNAUTHORIZED');
  // } else {
  //   // 会话未失效，但是返回结果不符合预期
  //   if (data.code !== '0000') {
  //     // message提示
  //     Message.error(data.message);
  //   }
  //   // 无论正确与否，结果都返回
  //   return Promise.resolve(data);
  // }
});

export default axios;
