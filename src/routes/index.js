// 代码分割
import Loadable from "react-loadable";
// loading组件
import Loading from "../components/basic/Loading";
// layout模块(lazy会造成每次切换页面加载layout时，layout被视为全新的chunk，导致重复渲染问题)
import DashboardComponents from "../components/basic/Dashboard";


const MyLoadable = (func) => Loadable({
  loader: func,
  loading: Loading,
  delay: 300,
});

const LoginComponent = MyLoadable(() =>
  import(/* webpackChunkName: 'Login' */ "../components/business/Login")
);
const NoMatchComponents = MyLoadable(() =>
  import(/* webpackChunkName: "NoMatch" */ "../components/business/NoMatch")
);
const Home = MyLoadable(() =>
  import(/* webpackChunkName: "home" */ "../components/business/home")
);
const Page1 = MyLoadable(() =>
  import(/* webpackChunkName: "page1" */ "../components/business/page1")
);
const Page2 = MyLoadable(() =>
  import(/* webpackChunkName: "page2" */ "../components/business/page2")
);
export const routes = [
  {
    path: "/",
    redirect: '/login',
    exact: true
  },
  {
    path: "/login",
    title: "登录",
    loginAuth: false,
    layout: null,
    menu: false,
    component: LoginComponent,
  },
  {
    path: "/home",
    title: "非权限路由",
    menu: true,
    userAuth: ['user', 'admin'],
    wrappers: [DashboardComponents],
    component: Home,
  },
  {
    title: "非权限路由1",
    menu: true,
    path: "/page",
    userAuth: ['user', 'admin'],
    component: DashboardComponents,
    childrens: [
      {
        path: "/page/page1",
        title: "页面1",
        menu: true,
        userAuth: ['user', 'admin'],
        component: Page1,
      }, {
        path: "/page/page2",
        title: "页面2",
        menu: true,
        userAuth: ['user', 'admin'],
        component: Page2,
      }, {
        path: "*",
        title: "404",
        component: NoMatchComponents,
      }
    ]
  }, {
    title: "非权限路由1",
    menu: true,
    path: "/info",
    userAuth: ['user', 'admin'],
    component: DashboardComponents,
    childrens: [
      {
        path: "/info/page1",
        title: "info1",
        menu: true,
        userAuth: ['user', 'admin'],
        component: Page1,
      }, {
        path: "/info/page2",
        title: "info2",
        menu: true,
        userAuth: ['user', 'admin'],
        component: Page2,
      }, {
        path: "*",
        title: "404",
        component: NoMatchComponents,
      }
    ]
  },
  {
    path: "*",
    title: "404",
    component: NoMatchComponents,
  },
];

export default routes;
