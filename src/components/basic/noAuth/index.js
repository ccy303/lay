import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

const NoMatch = () => {
  return <div styleName="no-match-wrap" >
    <section>
      <h1>403</h1>
      <p>
        您没有权限访问此页面
        <Link to={'/home'}>返回首页</Link>
      </p>
    </section>
  </div>;
};

export default NoMatch;
