import React, { useState } from 'react';
import routes from './index.js';
import { HashRouter, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
let activeRouteTimer = null; // 激活route防抖计时器
let buffer = []; // 缓冲区
let userAuth = null; // 用户权限数组, null 表示没有登录，空数组表示已经登录但是没有权限，非空数组为对应权限
let userInfo = {}; // 用户信息
let getAuthSta = true; // 是否获取权限列表
const getAuth = () => {
  return {
    auth: ['order:check'],
    userInfo: {}
  };
};
export const getUserAuthFfun = () => userAuth;

export const changeGetAuthSta = () => getAuthSta = true;

// 权限判断
const chakoutAuth = (rAuth) => {
  if (!userAuth) return false;
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
  const [activeRoute, setActiveRoute] = useState();
  const renderRoute = (route) => {
    return <Switch>
      {route.map((r, i) => {
        return getRouteElement(r, i);
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
      if (route.loginAuth && !userAuth) {
        return <Redirect
          {...newProp}
          from={route.path}
          to={`/login?origin_uri=${escape(props.location.pathname + props.location.search)}`}
        />;
      }
      // 多级路由匹配会重复setstate重复渲染，用缓冲区(防抖解决)
      buffer.push(route);
      if (activeRouteTimer) {
        clearTimeout(activeRouteTimer);
        activeRouteTimer = null;
      }
      activeRouteTimer = setTimeout(() => {
        // react setstate 的执行过程可能为异步，也可能为同步，
        // 当前状况为同步执行，既先执行setActiveRoute，等待试图更新完毕后在清除定时器
        setActiveRoute(() => {
          return buffer.reduce((prev, next) => {
            !prev.find(v => v.path === next.path) && prev.push(next);
            return prev;
          }, []);
        });
        clearTimeout(activeRouteTimer);
        activeRouteTimer = null;
        buffer = [];
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
      let ret = <Component {...userInfo} {...props}>{routes}</Component >;
      if (wrappers) {
        let len = wrappers.length - 1;
        while (len >= 0) {
          ret = React.createElement(wrappers[len], { ...props, ...userInfo }, ret);
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
        // 多次匹配/会重复触发接口，authTimer 限流 2000ms内只执行一次
        if (getAuthSta) {
          try {
            const data = getAuth();
            userAuth = data.auth;
            userInfo = data.userInfo;
            // authTimer = true;
            getAuthSta = false;
            setTimeout(() => { getAuthSta = true; }, 2000);
          } catch (err) {
            console.log(err);
          }
        }
        return renderRoute(routes);
      }} />
    </MenuContext.Provider>
  </HashRouter>;
};

export const MenuContext = React.createContext([]);
export default PermissionRoute;
