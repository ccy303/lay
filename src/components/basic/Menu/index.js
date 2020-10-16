import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'caihrc';
import { useLocation, useRouteMatch } from "react-router-dom";
import { MenuContext } from '@src/routes/PermissionRoute';
import './styles.scss';
const { SubMenu } = Menu;

let menu_open_keys = [];

const MenuCom = props => {
  const menus = useContext(MenuContext);
  const [openKeys, setOpenKeys] = useState(Array.from(new Set([...menu_open_keys, useRouteMatch().path])));
  const onOpenChange = (e) => {
    setOpenKeys((state) => {
      menu_open_keys = Array.from(new Set([...e, ...state]));
      return menu_open_keys
    });
  }
  return <Menu
    mode="inline"
    theme="dark"
    selectedKeys={[useLocation()?.pathname]}
    openKeys={openKeys}
    onOpenChange={onOpenChange}
  >
    {menus.map((item, i) => {
      return item.childrens?.length ?
        <SubMenu
          key={item.path}
          title={<span>{item.title}</span>}
        >
          {item.childrens.map(child => {
            return <Menu.Item key={child.path}>
              <Link to={child.path}>
                <span>{child.title}</span>
              </Link>
            </Menu.Item>;
          })}
        </SubMenu> :
        <Menu.Item
          key={item.path}
        >
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>;
    })}
  </Menu>;
};

export default MenuCom;
