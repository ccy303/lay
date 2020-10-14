import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'caihrc';
import './styles.scss';

// 面包屑规则是 最后一个页面不可以点击
export default props => {
  return <div styleName='bread-crumb'>
    <Breadcrumb>
      {props.breadcrumb.map((v, i) => {
        return i === props.breadcrumb.length - 1 ? (
          <Breadcrumb.Item key={i}>
            <span>{v.title}</span>
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={i}>
            {
              v.path
                ?
                (<Link to={v.path}>{v.title}</Link>)
                :
                (<span>{v.title}</span>)
            }
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  </div>;
};
