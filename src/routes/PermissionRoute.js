import React, { useEffect, useState } from 'react';
import routes from './index.js';
import { HashRouter, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'caihrc';

const getMenu = (routes, menu = []) => {
  routes.forEach(v => {
    if (v.menu) {
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
  });
  return menu;
};

const render = (route, props) => {
  const { component: Component, wrappers, childrens } = route;
  const routes = renderRoute(childrens || []);
  if (Component) {
    let ret = <Component>{routes}</Component>;
    if (wrappers) {
      let len = wrappers.length - 1;
      while (len >= 0) {
        ret = React.createElement(wrappers[len], {}, ret);
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
  if (route.redirect) {
    return <Redirect {...newProp} from={route.path} to={route.redirect} />;
  }
  return <Route {...newProp} render={props => render(route, props)} />;
};

const renderRoute = (route) => {
  return <Switch>
    {route.map((r, i) => {
      return getRouteElement(r, i);
    })}
  </Switch>;
};

export const MenuContext = React.createContext([]);

const PermissionRoute = props => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    // 此处可以从服务端获取menu
    setMenu(getMenu(routes));
  }, []);
  return <HashRouter>
    <MenuContext.Provider value={menu}>
      {renderRoute(routes)}
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
