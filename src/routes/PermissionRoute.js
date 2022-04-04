import React, { useEffect } from "react";
import routes from "./index.js";
import gStore from "@src/store/global";
import { getUser } from "@src/http/public";
import NoMatch from "@base/noMatch";
import { useLocalObservable, Observer } from "mobx-react-lite";
import { HashRouter, Routes, Route, useNavigate, Outlet, useLocation, Navigate } from "react-router-dom";

const renderRoute = (routes) => {
  return (
    <>
      {routes.map((route) => {
        const { component: Component, layout: Layout, childrens } = route;
        let { path } = route;
        path = path.replace(/\//, "");
        if (!childrens) {
          if (Layout) {
            return (
              <Route key={path} element={<Layout targetRoute={route} gStore={gStore} />}>
                <Route path={path} element={<Component gStore={gStore} />} />
              </Route>
            );
          }
          return <Route key={path} path={path} element={<Component gStore={gStore} />} />;
        } else {
          if (Layout) {
            return (
              <Route key={path} path={path} element={<Layout targetRoute={route} gStore={gStore} />}>
                <Route index element={<NoMatch />} />
                {renderRoute(childrens, true)}
                <Route path="*" element={<NoMatch />} />
              </Route>
            );
          }
          return (
            <Route key={path} path={path}>
              <Route index element={<NoMatch />} />
              {renderRoute(childrens, true)}
              <Route path="*" element={<NoMatch />} />
            </Route>
          );
        }
      })}
    </>
  );
};

const PermissionRoute = (props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          {renderRoute(routes)}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HashRouter>
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
        store.state = true;
        gStore.g_userInfo = res.userInfo;
        gStore.g_userAuth = res.auth;
        location.pathname === "/" && navigate("home");
      } catch (err) {
        store.state = true;
        navigate("/login");
      }
    })();
  }, []);
  location.pathname === "/" && store.state && navigate("home");
  return <Observer>{() => <>{store.state ? <Outlet /> : <></>}</>}</Observer>;
};

export default PermissionRoute;
