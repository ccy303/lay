import load from "../components/basic/loadable";
import Layout from "../components/basic/layout";

export const routes = [
  {
    path: "/login",
    title: "登录",
    menu: false,
    component: load(() => import("../components/business/login")),
  },
  {
    path: "/home",
    title: "一级路由",
    menu: false,
    loginAuth: true,
    component: load(() => import("../components/business/home")),
  },
  {
    title: "工作台",
    menu: false,
    path: "/admin",
    loginAuth: true,
    layout: Layout,
    childrens: [
      {
        path: "/one",
        title: "一级路由",
        menu: true,
        loginAuth: true,
        component: load(() => import("../components/business/pageIndex")),
        breadcrumbs: [
          { path: "", title: "空连接" },
          { path: "http://www.baidu.com", title: "禁用链接", canBreadcrumb: false },
          {
            path: "http://www.baidu.com",
            title: "外部链接-百度(新窗口打开)",
            newWindow: true,
            canBreadcrumb: true,
          },
          {
            path: "http://www.douyu.com",
            title: "外部链接-斗鱼",
            canBreadcrumb: true,
          },
          { path: "/home", title: "内部链接", canBreadcrumb: true },
        ],
      },
      {
        title: "二级路由集合",
        menu: true,
        path: "/singlePage",
        canBreadcrumb: false,
        loginAuth: true,
        childrens: [
          {
            path: "/page1",
            title: "二级路由1",
            menu: true,
            component: load(() => import("../components/business/page1")),
          },
          {
            path: "/page2",
            title: "二级路由2",
            menu: true,
            component: load(() => import("../components/business/page2")),
          },
        ],
      },
      {
        path: "/multistage",
        title: "三级路由集合",
        menu: true,
        canBreadcrumb: false,
        loginAuth: true,
        childrens: [
          {
            path: "/page",
            title: "二级路由",
            menu: true,
            childrens: [
              {
                path: "/page1",
                title: "三级路由",
                menu: true,
                component: load(() => import("../components/business/page1")),
              },
            ],
          },
        ],
      },
      {
        title: "非菜单路由",
        menu: true,
        path: "/noMenuRoute",
        canBreadcrumb: false,
        loginAuth: true,
        childrens: [
          {
            path: "/page1",
            title: "列表",
            menu: true,
            component: load(() => import("../components/business/list")),
          },
          {
            path: "/page1/:id",
            title: "二级路由1",
            activePath: "/admin/noMenuRoute/page1",
            menu: false,
            component: load(() => import("../components/business/page1")),
          },
        ],
      },
    ],
  },
];

export default routes;
