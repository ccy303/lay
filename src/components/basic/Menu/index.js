import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useRouteMatch } from "react-router-dom";
import { MenuContext } from '@src/routes/PermissionRoute';
import './styles.scss';
const { SubMenu } = Menu;

let MENU_OPEN_KEYS = [];
const MenuCom = props => {
  const [menus, setMenu] = useState([]);
  const context = useContext(MenuContext);
  const lastRoute = context.ACTIVE_ROUTE?.slice(-1) || [];
  useEffect(() => {
    setTimeout(() => {
      context.MENU().then(res => {
        setMenu(res);
      });
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

  const renderMenu = (menus) => {
    return <>{menus.map((item, i) => {
      return item.childrens?.length ?
        <SubMenu
          key={item.path}
          title={<span>{item.title}</span>}
        >
          {renderMenu(item.childrens)}
        </SubMenu> :
        <Menu.Item
          key={item.path}
        >
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>;
    })}</>;
  };

  return <Menu
    mode="inline"
    theme="dark"
    // selectedKeys={[useLocation()?.pathname]}
    selectedKeys={[lastRoute[0]?.activeMenuPath || lastRoute[0]?.path]}
    openKeys={openKeys}
    onOpenChange={onOpenChange}
    onClick={() => { context.CLEAR_ACTIVE_ROUTE(); }}
  >
    {renderMenu(menus)}
  </Menu>;
};

export default MenuCom;
