import React, { useEffect } from "react";
import routes from "./index.js";
import gStore from "@src/store/global";
import { getUser } from "@src/http/public";
import NoMatch from "@base/noMatch";
import { checkAuth, getActiveRoute, findRoute } from "@utils/index";
import { useLocalObservable, Observer } from "mobx-react-lite";
import { HashRouter, Routes, Route, useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";

// 模拟后端返回路由
const getMenu = async () => {
  return Promise.resolve(routes);
};

const renderRoute = (routes) => {
  return (
    <>
      {routes.map((route) => {
        const { layout: Layout, component: Component, children, logined, auths } = route;
        let { path } = route;
        path = path.replace(/\//, "");
        const CheckAuth = () => {
          const location = useLocation();
          if (logined && !gStore.g_userInfo) {
            return <Navigate to={`/login?redict_uri=${location.pathname}`} />;
          }
          if (!checkAuth(route.auths, gStore.g_userAuth)) {
            return <Navigate to={`/403`} />;
          }
          return (
            <>
              <Component gStore={gStore} location={location} />
            </>
          );
        };

        if (!children) {
          if (Layout) {
            return (
              <Route key={path} element={<Layout targetRoute={route} gStore={gStore} />}>
                <Route path={path} element={<CheckAuth />} />
              </Route>
            );
          }
          return <Route key={path} path={path} element={<CheckAuth />} />;
        } else {
          if (Layout) {
            return (
              <Route key={path} path={path} element={<Layout targetRoute={route} gStore={gStore} />}>
                <Route index element={<NoMatch />} />
                {renderRoute(children, true)}
                <Route path="*" element={<NoMatch />} />
              </Route>
            );
          }
          return (
            <Route key={path} path={path}>
              <Route index element={<NoMatch />} />
              {renderRoute(children, true)}
              <Route path="*" element={<NoMatch />} />
            </Route>
          );
        }
      })}
    </>
  );
};

const PermissionRoute = (props) => {
  const store = useLocalObservable(() => ({
    state: false,
  }));
  useEffect(() => {
    (async () => {
      gStore.g_menu = await getMenu();
      store.state = true;
    })();
  }, []);
  return (
    <Observer>
      {() => {
        console.log(store.state);
        return (
          <>
            {store.state && (
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Main />}>
                    {renderRoute(gStore.g_menu)}
                    {/* {renderRoute(routes)} */}
                    <Route path="*" element={<NoMatch />} />
                  </Route>
                </Routes>
              </HashRouter>
            )}
          </>
        );
      }}
    </Observer>
  );
};

const Main = () => {
  const store = useLocalObservable(() => ({
    state: false,
  }));
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        gStore.g_userInfo = res.userInfo;
        gStore.g_userAuth = res.auth;
        location.pathname === "/" && navigate("home");
        store.state = true;
      } catch (err) {
        store.state = true;
        for (let i = 0; i < gStore.g_menu.length; i++) {
          const res = getActiveRoute(gStore.g_menu[i], location.pathname);
          if (res) {
            const target = findRoute(
              gStore.g_menu.filter((v) => v.path !== "/login"),
              "logined",
              false
            );
            navigate(!res.route.logined ? location.pathname : target?.fullPathName || "/login");
            break;
          }
        }
      }
    })();
  }, []);
  location.pathname === "/" && store.state && navigate("home");
  return <Observer>{() => <>{store.state ? <Outlet /> : <></>}</>}</Observer>;
};

export default PermissionRoute;
