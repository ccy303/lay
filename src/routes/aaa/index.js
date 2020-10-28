import MyLoadable from "../components/basic/Loadable";
import DashboardComponents from "../components/basic/Dashboard";

const LoginComponent = MyLoadable(() =>
  import(/* webpackChunkName: 'Login' */ "../components/business/Login")
);
const NoMatchComponents = MyLoadable(() =>
  import(/* webpackChunkName: "NoMatch" */ "../components/basic/NoMatch")
);
const NoAuthComponents = MyLoadable(() =>
  import(/* webpackChunkName: "NoAuth" */ "../components/basic/NoAuth")
);
const MyOrder = MyLoadable(() =>
  import(/* webpackChunkName: "MyOrder" */ "../components/business/MyOrder")
);
const OrderDetail = MyLoadable(() =>
  import(/* webpackChunkName: "OrderDetail" */ "../components/business/OrderDetail")
);
const DownLoadRecord = MyLoadable(() =>
  import(/* webpackChunkName: "downLoadRecord" */ "../components/business/History/downLoadRecord")
);
const QueryRecord = MyLoadable(() =>
  import(/* webpackChunkName: "queryRecord" */ "../components/business/History/queryRecord")
);
const InfoCenter = MyLoadable(() =>
  import(/* webpackChunkName: "infoCenter" */ "../components/business/InfoCenter")
);

const Test = MyLoadable(() =>
  import(/* webpackChunkName: "Test" */ "../components/business/Test")
);
export const routes = [
  {
    path: "/",
    redirect: '/home',
    loginAuth: true,
    exact: true
  },
  {
    path: "/login",
    title: "登录",
    layout: null,
    menu: false,
    component: LoginComponent,
  },
  {
    path: "/home",
    title: "我的订单",
    menu: true,
    userAuth: ['order:check'],
    loginAuth: true,
    wrappers: [DashboardComponents],
    component: MyOrder,
  },
  {
    path: "/order/:id",
    title: "订单详情",
    menu: true,
    userAuth: ['user', 'admin'],
    loginAuth: true,
    wrappers: [DashboardComponents],
    component: OrderDetail,
  },
  {
    title: "历史记录",
    menu: true,
    path: "/history",
    loginAuth: true,
    component: DashboardComponents,
    childrens: [
      {
        path: "/history/queryRecord",
        title: "查询记录",
        menu: true,
        exact: true,
        userAuth: ['history:queryRecord:check'],
        component: QueryRecord,
      }, {
        path: "/history/downloadRecord",
        title: "下载记录",
        menu: true,
        exact: true,
        userAuth: ['history:downloadRecord:check'],
        component: DownLoadRecord,
      }, {
        path: "/history/downloadRecord/:id",
        title: "记录详情",
        menu: false,
        exact: true,
        userAuth: ['history:downloadRecord:check'],
        component: Test,
      }, {
        path: "*",
        title: "404",
        component: NoMatchComponents,
      }
    ]
  }, {
    title: "消息中心",
    menu: true,
    path: "/info",
    loginAuth: true,
    userAuth: ['infoCenter:check'],
    wrappers: [DashboardComponents],
    component: InfoCenter,
  },
  {
    path: "/403",
    title: "403",
    component: NoAuthComponents,
  },
  {
    path: "*",
    title: "404",
    component: NoMatchComponents,
  },
];

export default routes;
