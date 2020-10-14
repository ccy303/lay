import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import '../../../styles/common.scss';

const Loading = (props) => {
  useEffect(() => {
    if (props.pastDelay) {
      NProgress.start();
      return () => {
        NProgress.done();
      };
    }
  }, [props.pastDelay]);
  return null;
};

export default Loading;
