// import "core-js/stable";
// import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ConfigProvider locale={zhCN}>
		<App />
	</ConfigProvider>
);
