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

const PermissionRoute = props => {
  const [menu, setMenu] = useState(getMenu(routes));
  const renderRoute = () => {
    const ele = <>
      <HashRouter>
        <Switch>
          {routes.map(c => {
            return <Route
              key={c.path}
              path={!c.childrens?.length ? c.path : `${c.path}/*`}
              // path={c.path}
              exact
              render={cp => {
                if (c.redirect) {
                  return <Redirect to={c.redirect} />
                }
                return <>
                  {c.layout ?
                    <c.layout menu={menu}>
                      {c.childrens ?
                        <Switch>
                          {c.childrens?.map(r => {
                            return <Route path={r.path} exact key={r.path} render={rp => {
                              return <r.component />;
                            }} />;
                          })}
                        </Switch> :
                        <c.component />
                      }
                    </c.layout> :
                    <c.component />
                  }
                </>
                // if (c.redirect) { return <Redirect from={c.path} to={c.redirect} />; }
                // return <>
                //   {
                //     // c.layout ?
                //     //   <c.layout menu={menu}>
                //     //     {c.childrens ?
                //     //       <Switch>
                //     //         {c.childrens?.map(r => {
                //     //           return <Route path={r.path} exact key={r.path} render={rp => {
                //     //             if (r.redirect) {
                //     //               return <Redirect from={r.path} to={r.redirect} />;
                //     //             }
                //     //             return <r.component />;
                //     //           }} />;
                //     //         })}
                //     //       </Switch> :
                //     //       <c.component />
                //     //     }
                //     //   </c.layout> :
                //       <c.component />
                //   }
                // </>;
              }} />;
          })}
        </Switch>
      </HashRouter>
    </>;
    return ele;
  };
  return renderRoute();
};

// return <>
//   <HashRouter>
//     <Switch>
//       {AppRoutes.routes.map(r => {
//         return <Route
//           key={r.path}
//           path={r.path}
//           render={rp => {
//             return status === 'pending' ?
//               <Loading /> :
//               r.layout ?
//                 <r.layout
//                   menu={menu}
//                 >
//                   <Switch>
//                     {flatRoute?.map(c => <Route
//                       exact
//                       key={c.path}
//                       path={c.path}
//                       render={cp => {
//                         const { setRoutePath, setMenuProps, menuProps } = props.CommonStore;
//                         const { path: matchPat, url: path } = cp.match;
//                         if (c.loginAuth && !info) {
//                           return <Redirect to='/login' />;
//                         }
//                         setRoutePath({
//                           matchPat,
//                           path,
//                         });
//                         const { openKeys } = menuProps;
//                         // 此处有一个问题：Route渲染时，会替换原来的layout,但mobx监听的还是旧的layout数据变化
//                         // 所以会产生react警告：渲染不同的组件时，不能更新组件，
//                         // 暂时解决方案：异步事件队列，用setTimeOut包裹事件，等dom加载完步后触发异步
//                         setTimeout(() => {
//                           setMenuProps('selectedKeys', [c.key]);
//                           setMenuProps('openKeys', Array.from(
//                             new Set([...openKeys, ...[c.key?.split('-')[0]]])
//                           ));
//                         });
//                         return <c.component
//                           key={props.CommonStore.getMenuConfig.activePath}
//                           {...cp}
//                           setVal2Url={setVal2Url}
//                           getUrl2Val={getUrl2Val}
//                         />;
//                       }}
//                     />)}
//                   </Switch>
//                 </r.layout> :
//                 <r.component {...rp} />;
//           }}
//         />;
//       })}
//     </Switch>
//   </HashRouter>
//   {props.CommonStore.httpRequest && <Loading delay="500" />}
// </>;
// };

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
