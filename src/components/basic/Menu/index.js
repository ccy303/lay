import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'caihrc';
import { useLocation, useRouteMatch } from "react-router-dom";
import { MenuContext } from '@src/routes/PermissionRoute';
import './styles.scss';
const { SubMenu } = Menu;
const MenuCom = props => {
  // const { menu: menus } = props;
  const menus = useContext(MenuContext);
  return <Menu
    mode="inline"
    theme="dark"
    // selectedKeys={selectedKeys}
    openKeys={['/page']}
  // defaultOpenKeys={defaultOpenKeys}
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
  </Menu >;
};

export default MenuCom;
