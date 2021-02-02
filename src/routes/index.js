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
const Home = MyLoadable(() =>
  import(/* webpackChunkName: "Home" */ "../components/business/Home")
);
const Page1 = MyLoadable(() =>
  import(/* webpackChunkName: "Page1" */ "../components/business/page1")
);
const Page2 = MyLoadable(() =>
  import(/* webpackChunkName: "Page2" */ "../components/business/page2")
);
const List = MyLoadable(() =>
  import(/* webpackChunkName: "List" */ "../components/business/list")
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
    title: "一级路由",
    menu: true,
    path: "/home",
    loginAuth: true,
    wrappers: [DashboardComponents],
    component: Home,
    breadcrumbs: [
      { path: "", title: "空连接" },
      { path: "http://www.baidu.com", title: "禁用链接", canBreadcrumb: false },
      { path: "http://www.baidu.com", title: "外部链接-百度(新窗口打开)", newWindow: true, canBreadcrumb: true },
      { path: "http://www.douyu.com", title: "外部链接-斗鱼", canBreadcrumb: true },
      { path: "/home", title: "内部链接", canBreadcrumb: true },
    ]
  },
  {
    title: "二级路由集合",
    menu: true,
    path: "/singlePage",
    userAuth: ['order:check'],
    canBreadcrumb: false,
    loginAuth: true,
    component: DashboardComponents,
    childrens: [{
      path: "/singlePage/page1",
      title: "二级路由1",
      menu: true,
      exact: true,
      userAuth: ['order:check'],
      component: Page1,
    }, {
      path: "/singlePage/page2",
      title: "二级路由2",
      menu: true,
      exact: true,
      userAuth: ['order:check'],
      component: Page2,
    }]
  },
  {
    path: "/multistage",
    title: "三级路由集合",
    menu: true,
    canBreadcrumb: false,
    loginAuth: true,
    component: DashboardComponents,
    childrens: [{
      path: "/multistage/page",
      title: "二级路由",
      menu: true,
      childrens: [{
        path: "/multistage/page/page1",
        title: "三级路由",
        menu: true,
        exact: true,
        component: Page1,
      }],
    }]
  },
  {
    title: "非菜单路由",
    menu: true,
    path: "/noMenuRoute",
    canBreadcrumb: false,
    loginAuth: true,
    component: DashboardComponents,
    childrens: [{
      path: "/noMenuRoute/page1",
      title: "列表",
      menu: true,
      exact: true,
      component: List,
    }, {
      path: "/noMenuRoute/page2",
      title: "二级路由1",
      activeMenuPath: '/noMenuRoute/page1',
      menu: false,
      exact: true,
      component: Page1,
    }]
  },
  {
    path: "/403",
    title: "无权限",
    wrappers: [DashboardComponents],
    component: NoAuthComponents,
  },
  {
    path: "*",
    title: "页面不存在",
    wrappers: [DashboardComponents],
    component: NoMatchComponents,
  },
];

export default routes;
