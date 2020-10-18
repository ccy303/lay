import axios from "axios";
import { Message } from "caihrc";
import { HashRouter } from "react-router-dom";
const router = new HashRouter();
let timer = null; // 防抖

// 请求拦截
axios.interceptors.request.use(config => {
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
});

export default axios;
