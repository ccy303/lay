import NProgress from 'nprogress';
import Loadable from "@loadable/component";

const MyLoadable = (func) => {
  const _func = () => {
    NProgress.start();
    return func();
  };
  return Loadable(_func, {
    resolveComponent: (conpoments) => {
      NProgress.done();
      return conpoments.default;
    }
  });
};

export default MyLoadable;
