import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button, TableList } from 'caihrc';
import moment from 'moment';
import qs from 'qs';
let FIRST_TIME_LOAD = true;
export default ({
  searchFromConfig,
  columns = [],
  reload = false,
  reset = false,
  toolBarRender = [],
  requestFun,
  saveQueryStr = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const actionRef = useRef();
  const queryCache = qs.parse(window.location.href.split('?')[1]);
  reload && toolBarRender.push(<Button onClick={() => actionRef.current.reload()} type="primary">刷新</Button>);
  reset && toolBarRender.push(<Button onClick={() => actionRef.current.reset()} type="primary">重置</Button>);
  saveQueryStr && useMemo(() => {
    if (FIRST_TIME_LOAD && Object.keys(queryCache).length && searchFromConfig && searchFromConfig.items) {
      const { items = [] } = searchFromConfig;
      for (let i = 0, len = items.length; i < len; i++) {
        switch (items[i].type) {
          case 'dateRange':
          case 'time':
          case 'timeRange':
          case 'date':
          case 'dateMonth':
          case 'dateWeek':
          case 'dateYear': {
            // 时间日期格式initialValue设置 等组件库修复bug
            // items[i].initialValue = [
            //   // moment(queryCacheObject[items[i].name[1]] || null),
            //   // moment(queryCacheObject[items[i].name[0]] || null),
            // ];
          }
            break;
          default: items[i].initialValue = queryCache[items[i].name] || null;
        }
      }
    }
  }, []);
  const request = (params, filters, sorter) => {
    for (let k in params) {
      params[k]._isAMomentObject && (params[k] = params[k].format('YYYY-MM-DD'));
    }
    if (saveQueryStr) {
      FIRST_TIME_LOAD && (params = Object.assign({}, params, queryCache));
      window.location.href = window.location.href.split('?')[0] + '?' + qs.stringify(params);
    }
    FIRST_TIME_LOAD = false;
    return requestFun(params, filters, sorter);
  };
  return <TableList
    columns={
      [].concat([{
        title: '序号',
        render: (text, row, index) => (currentPage - 1) * 10 + (index + 1)
      }], columns)
    }
    rowKey='id'
    request={request}
    search={searchFromConfig}
    toolBarRender={toolBarRender}
    actionRef={actionRef}
    pagination={{
      onChange: (e) => setCurrentPage(e)
    }}
  />;
};
