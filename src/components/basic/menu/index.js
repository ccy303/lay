import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams, useResolvedPath, matchPath, resolvePath } from "react-router-dom";
import { useLocalObservable, observer } from "mobx-react-lite";
import { Menu } from "antd";
import routes from "@src/routes";
import "./styles.less";
const { SubMenu } = Menu;

// 权限判断
const chakoutAuth = (rAuth) => {
  // if (!userAuth) return false;
  // for (let i = 0, len = rAuth.length; i < len; i++) {
  //   if (userAuth.includes(rAuth[i])) {
  //     return true;
  //   }
  // }
  return false;
};

const getMenu = (routes, menu = [], path = "") => {
  routes.forEach((route) => {
    if (route.menu) {
      const menuITem = {
        path: `${path}${route.path}`,
        title: route.title,
      };
      if (route.childrens?.length) {
        menuITem.childrens = [];
        getMenu(route.childrens, menuITem.childrens, menuITem.path);
      }
      menu.push(menuITem);
    } else if (route.childrens?.length) {
      getMenu(route.childrens, menu, route.path);
    }
  });
  return menu;
};

const getOpenKeys = (path) => {
  const arr = path.split("/").filter((v) => v);
  const out = [];
  for (let i = 1, len = arr.length; i <= len; i++) {
    const slis = arr.slice(0, i);
    out.push(`/${slis.join("/")}`);
  }
  return out;
};

const getActiveMenu = (route, path, join) => {
  let out = "";
  const _path = `${join || ""}${route.path}`;
  if (matchPath(_path, path)) {
    out = route.activePath || _path;
  } else if (route.childrens) {
    for (let i = 0; i < route.childrens.length; i++) {
      out = getActiveMenu(route.childrens[i], path, _path);
      if (out) {
        break;
      }
    }
  }
  return out;
};

const MenuCom = observer((props) => {
  const location = useLocation();
  const { targetRoute } = props;
  const store = useLocalObservable(() => ({
    menus: [],
    openKeys: getOpenKeys(location.pathname),
    activeKeys: [`${getActiveMenu(targetRoute, location.pathname)}`],
  }));
  const onOpenChange = (e) => {
    store.openKeys = Array.from(new Set([...e]));
  };

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, i) => {
          return item.childrens?.length ? (
            <SubMenu key={item.path} title={<span>{item.title}</span>}>
              {renderMenu(item.childrens)}
            </SubMenu>
          ) : (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    store.menus = getMenu(routes);
  }, []);

  return (
    <Menu
      mode="inline"
      onClick={(e) => {
        store.activeKeys = [e.key];
      }}
      defaultOpenKeys={store.openKeys}
      selectedKeys={store.activeKeys}
      openKeys={store.openKeys}
      onOpenChange={onOpenChange}
    >
      {renderMenu(store.menus)}
    </Menu>
  );
});

export default MenuCom;
