import React, { useRef } from 'react';
import CTableList from '@src/basic/CTaileList';
import moment from 'moment';
import { queryRecord } from '@http/historyRecord';
const SearchFrom = {
  reset: true,
  items: [{
    name: ['startDate', 'endDate'],
    label: "查询时间",
    type: "dateRange",
  }]
};
const columns = [
  {
    title: '企业名称',
    dataIndex: 'name',
  },
  {
    title: '目标国家',
    dataIndex: 'gender',
  },
  {
    title: '查询时间',
    dataIndex: 'tine',
  },
];
const request = (params, filters, sorter) => {
  return new Promise(resolve => {
    queryRecord(params).then(res => {
      resolve({
        data: res.data.list,
        total: res.data.total
      });
    });

  });
};
export default props => {
  return <CTableList
    searchFromConfig={SearchFrom}
    columns={columns}
    requestFun={request}
  />;
};
