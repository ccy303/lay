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
const Page3 = MyLoadable(() =>
  import(/* webpackChunkName: "Page3" */ "../components/business/page3")
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
  },
  {
    title: "二级路由集合",
    menu: true,
    path: "/singlePage",
    userAuth: ['order:check'],
    canBreadcrumb: true,
    loginAuth: true,
    component: DashboardComponents,
    childrens: [{
      path: "/singlePage/page1",
      title: "二级路由集合1",
      menu: true,
      exact: true,
      userAuth: ['order:check'],
      component: Page1,
    }, {
      path: "/singlePage/page2",
      title: "二级路由集合2",
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
    canBreadcrumb: true,
    loginAuth: true,
    component: DashboardComponents,
    childrens: [{
      path: "/multistage/page",
      title: "二级级路由",
      menu: true,
      childrens: [{
        path: "/multistage/page/page1",
        title: "三级路由",
        menu: true,
        exact: true,
        component: Page1,
      }],
    },
    ]
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
