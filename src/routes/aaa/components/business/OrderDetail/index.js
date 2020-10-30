import React, { } from "react";
import { Button } from "caihrc";
import { Link } from 'react-router-dom';
import "./styles.less";

export default props => {
  return <div styleName="container">
    <div styleName="title">订单明细信息</div>
    <div styleName="detail-container">
      <div>机构名称：</div>
      <div>下单账号：</div>
      <div>订单编号：</div>
      <div>订单类型：</div>
      <div>订单摘要：</div>
      <div>目标国家：</div>
      <div>目标城市：</div>
      <div>注册地址：</div>
      <div>订单金额（元/人民币）：</div>
      <div>支付方式：</div>
      <div>下单时间：</div>
      <div>结算时间：</div>
      <div>订单状态：</div>
      <div>报告状态：</div>
      <div>备注：</div>
    </div>
    <Button><Link to={'/home'}>返回</Link></Button>
  </div>;
};
