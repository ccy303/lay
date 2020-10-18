import React, { useEffect, useState } from 'react';
import routes from './index.js';
import { HashRouter, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'caihrc';

const getMenu = (routes, menu = []) => {
  const useAuth = sessionStorage.getItem('useAuth');
  routes.forEach(v => {
    if (v.menu) {
      if (!v.userAuth || v?.userAuth.includes(useAuth)) {
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

const getRouteElement = (route, index) => {
  const newProp = {
    key: route.key || index,
    path: route.path,
    exact: !!route.exact,
    strict: !!route.strict
  };
  const userAuth = sessionStorage.getItem('useAuth');
  const login = sessionStorage.getItem('login');
  return <Route {...newProp} render={props => {
    if (route.redirect) {
      return <Redirect {...newProp} from={route.path} to={route.redirect} />;
    }
    if ((route.loginAuth || route.userAuth) && !login) {
      return <Redirect {...newProp} from={route.path} to='/login' />;
    }
    if (route.userAuth && !route.userAuth?.includes(userAuth)) {
      return <Redirect {...newProp} from={route.path} to='/403' />;
    }
    return render(route, props);
  }} />;
};

const renderRoute = (route) => {
  return <Switch>
    {route.map((r, i) => {
      return getRouteElement(r, i, route);
    })}
  </Switch>;
};

export const MenuContext = React.createContext([]);

let MENU = () => {
  return Promise.resolve(getMenu(routes));
};

const PermissionRoute = props => {
  return <HashRouter>
    <MenuContext.Provider value={MENU}>
      <Route path="/" render={props => {
        return renderRoute(routes);
      }} />
    </MenuContext.Provider>
  </HashRouter>;
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

export default PermissionRoute;
