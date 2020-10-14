import React, { useState, useRef, useEffect } from 'react';
import { TableList } from 'caihrc';
import { useHistory } from "react-router-dom";
import Moment from "moment";
import qs from "query-string";

let isFirst = true;

export default (props) => {
  const history = useHistory();
  const getUrl2Val = (ops = {}) => {
    let queryString = qs.parse(history.location.search);
    // Object.keys(ops).map(key => {
    //   if (queryString[key] && ops[key]["type"] === "date") {
    //     queryString[key] = Moment(ops[key]);
    //   }
    // });
    return queryString;
  };

  const setVal2Url = (val = {}, cover = false) => {
    let _arg = {};
    Object.keys(val).map((item) => {
      if (val[item]) {
        _arg[item] = val[item];
      }
    });
    val = _arg;
    const url = `${history.location.pathname}?${qs.stringify(cover ? val : { ...val })}`;
    history.replace(url);
    return {
      url,
    };
  };

  /**
   * 原TableList request 请求，到这里处理一遍
   * @param {*} params
   * @param {*} filters
   * @param {*} sorter
   */
  const request = (
    params,    // 搜索表单的数据 + 当前页码和pageSize
  ) => {
    const { requestParams } = props;
    // // httpArg和params 好像是一个东西
    const httpArg = getUrl2Val();
    if (isFirst) {
      params = { ...requestParams, ...params, ...httpArg };
      isFirst = false;
    } else {
      params = { ...requestParams, ...params };
    }
    setVal2Url(params);
    if (typeof props.request === "function") {
      return props.request(params);
    }
  };
  return <TableList
    {...props}
    pagination={{ ...props.pagination, current: parseInt(props.search.initialValues.current) }}
    request={request}
  />;
};
