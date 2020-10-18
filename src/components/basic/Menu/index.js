import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'caihrc';
import { useLocation, useRouteMatch } from "react-router-dom";
import { MenuContext } from '@src/routes/PermissionRoute';
import './styles.scss';
const { SubMenu } = Menu;

let MENU_OPEN_KEYS = [];
const MenuCom = props => {
  const [menus, setMenu] = useState([]);
  const getMenus = useContext(MenuContext);
  useEffect(() => {
    getMenus().then(res => {
      setMenu(res);
    });
  }, []);
  const [openKeys, setOpenKeys] = useState(
    Array.from(new Set([...MENU_OPEN_KEYS, useRouteMatch().path]))
  );
  const onOpenChange = (e) => {
    setOpenKeys(() => {
      MENU_OPEN_KEYS = Array.from(new Set([...e]));
      return MENU_OPEN_KEYS;
    });
  };
  return <Menu
    mode="inline"
    theme="dark"
    selectedKeys={[useLocation()?.pathname]}
    openKeys={openKeys}
    onOpenChange={onOpenChange}
  >
    {menus?.map((item, i) => {
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
