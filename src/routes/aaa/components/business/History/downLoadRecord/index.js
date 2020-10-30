import React, { useRef } from 'react';
import CTableList from '@src/basic/CTaileList';
import { queryRecord } from '@http/historyRecord';
// const SearchFrom = {
// eset: true,
// items: [{
// name: ['startDate', 'endDate'],
// label: "查询时间",
// type: "dateRange",
// }]
// };
const SearchFrom = {
  reset: true,
  items: [
    {
      name: "text",
      label: "text",
      type: "text",
    },
    {
      name: "number",
      label: "number",
      type: "number",
    },
    {
      name: "select", label: "select", type: "select",
      options: [
        { label: 'Apple', value: 1 },
        { label: 'Pear', value: 2 },
        { label: 'Orange', value: 3 }
      ]
    },
    {
      name: "time",
      label: "time",
      type: "time",
    },
    {
      name: ['startTime', 'endTime'],
      label: "timeRange",
      type: "timeRange",
    },
    {
      name: "date",
      label: "date",
      type: "date",
    },
    {
      name: "dateMonth",
      label: "dateMonth",
      type: "dateMonth",
    },
    {
      name: "dateWeek",
      label: "dateWeek",
      type: "dateWeek",
    },
    {
      name: "dateYear",
      label: "dateYear",
      type: "dateYear",
    },
    {
      name: ['startDate', 'endDate'],
      label: "dateRange",
      type: "dateRange",
    }
  ],
  keywordKey: "aa",
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
