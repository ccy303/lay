import React, { useEffect, useState } from 'react';
import routes from './index.js';
import { HashRouter, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'caihrc';
import { getAuth } from '@http/user';
let activeRouteTimer = null; // 激活route防抖计时器
let authTimer = null; // 权限请求节流计时器
let buffer = []; // 缓冲区
let userAuth = []; // 用户权限数组

// 权限判断
const chakoutAuth = (rAuth) => {
  if (!userAuth) return true;
  for (let i = 0, len = rAuth.length; i < len; i++) {
    if (userAuth.includes(rAuth[i])) {
      return true;
    }
  }
  return false;
};

const getMenu = (routes, menu = []) => {
  routes.forEach(v => {
    if (v.menu) {
      // 权限判断
      if (!v.userAuth || chakoutAuth(v.userAuth)) {
        let menuITem = {
          path: v.path,
          title: v.title
        };
        if (v.childrens?.length) {
          menuITem.childrens = [];
          getMenu(v.childrens, menuITem.childrens);
        }
        menu.push(menuITem);
      }
    }
  });
  return menu;
};

const PermissionRoute = props => {
  const [activeRoute, setActiveRoute] = useState([]);
  const renderRoute = (route) => {
    console.log(route)
    return <Switch>
      {route.map((r, i) => {
        return getRouteElement(r, i, route);
      })}
    </Switch>;
  };
  const getRouteElement = (route, index) => {
    const newProp = {
      key: route.key || index,
      path: route.path,
      exact: !!route.exact,
      strict: !!route.strict
    };
    return <Route {...newProp} render={props => {
      if (route.redirect) {
        return <Redirect {...newProp} from={route.path} to={route.redirect} />;
      }
      if (!userAuth || !userAuth.length) {
        return <Redirect {...newProp} from={route.path} to='/login' />;
      }
      // 多级路由匹配会重复setstate重复渲染，用缓冲区(防抖解决)
      buffer.push(route);
      if (activeRouteTimer) {
        clearTimeout(activeRouteTimer);
        activeRouteTimer = null;
      }
      activeRouteTimer = setTimeout(() => {
        setActiveRoute([...buffer]);
        buffer = [];
        clearTimeout(activeRouteTimer);
        activeRouteTimer = null;
      });
      // 权限判断
      if (route.userAuth && !chakoutAuth(route.userAuth)) {
        return <Redirect {...newProp} from={route.path} to='/403' />;
      }
      return render(route, props);
    }} />;
  };
  const render = (route, props) => {
    const { component: Component, wrappers, childrens } = route;
    const routes = renderRoute(childrens || []);
    if (Component) {
      let ret = <Component {...props}>{routes}</Component>;
      if (wrappers) {
        let len = wrappers.length - 1;
        while (len >= 0) {
          ret = React.createElement(wrappers[len], { ...props }, ret);
          len -= 1;
        }
      }
      return ret;
    }
    return routes;
  };
  return <HashRouter>
    <MenuContext.Provider value={{
      MENU: () => {
        return Promise.resolve(getMenu(routes));
      },
      ACTIVE_ROUTE: activeRoute,
      CLEAR_ACTIVE_ROUTE: () => {
        setActiveRoute([]);
      }
    }}>
      <Route path="/" render={props => {
        if (!authTimer) {
          // 多次匹配/会重复触发接口，authTimer 限流 100ms内只执行一次
          userAuth = getAuth().data;
          authTimer = true;
          setTimeout(() => { authTimer = false; }, 100);
        }
        return renderRoute(routes);
      }} />
    </MenuContext.Provider>
  </HashRouter >;
};

const Loading = props => {
  return <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,.1)',
    zIndex: 10000,
  }}>
    <Spin delay={props.delay || 0} size="small" tip="加载中" />
  </div>;
};

export const MenuContext = React.createContext([]);
export default PermissionRoute;
