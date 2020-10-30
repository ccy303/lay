import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'caihrc';

export const columns = [{
  title: '序号',
  width: 80,
  dataIndex: 'index',
  align: "center",
}, {
  title: '机构名称',
  width: 100,
  dataIndex: 'agencyName',
  align: "center",
}, {
  title: '下单账号',
  width: 100,
  dataIndex: 'account',
  align: "center",
}, {
  title: '订单编号',
  width: 100,
  dataIndex: 'orderId',
  align: "center",
}, {
  title: '订单类型',
  width: 100,
  dataIndex: 'orderType',
  align: "center",
}, {
  title: '订单摘要',
  width: 100,
  dataIndex: 'orderAbstract',
  align: "center",
}, {
  title: '目标国家',
  width: 100,
  dataIndex: 'country',
  align: "center",
}, {
  title: '订单金额(元/人民币)',
  width: 160,
  dataIndex: 'orderAccount',
  align: "center",
}, {
  title: '支付方式',
  width: 100,
  dataIndex: 'payway',
  align: "center",
}, {
  title: '下单时间',
  width: 100,
  dataIndex: 'orderTime',
  align: "center",
}, {
  title: '结算时间',
  width: 100,
  dataIndex: 'settleTime',
  align: "center",
}, {
  title: '订单状态',
  width: 100,
  dataIndex: 'orderStatus',
  align: "center",
}, {
  title: '报告状态',
  width: 100,
  dataIndex: 'reportStatus',
  align: "center",
}, {
  title: '操作',
  width: 220,
  fixed: 'right',
  align: "center",
  render: (text, record) => {
    return (
      <Space>
        <Button><Link to={'/order/1'}>查看详情</Link></Button>
        <Button>下载报告</Button>
      </Space>
    );
  }
}];

export const group = [
  {
    name: "orderTimeFilter",
    label: "下单时间",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
    type: "select",
    options: [
      { label: '全部', value: 0 },
      { label: '下单时间', value: 1 },
      { label: '结算时间', value: 2 },
    ],
    props: {
      defaultValue: 0,
      placeholder: "请选择下单时间",
    }
  },
  {
    name: ["startTime", "endTime"],
    label: "时间范围",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
    type: "dateRange",
    props: {
      placeholder: ["开始时间", "结束时间"],
      showTime: true,
      format: "YYYY-MM-DD HH:mm:ss",
      // renderExtraFooter: () => {
      //   params.timeRangeRadioRef.current = params.timeRangeRadioRef.current || 0;
      //   const options = [
      //     { label: '全部', value: 0 },
      //     { label: '下单时间', value: 1 },
      //     { label: '结算时间', value: 2 },
      //   ];
      //   return (
      //     <Radio.Group
      //       options={options}
      //       defaultValue={params.timeRangeRadioRef.current}
      //       onChange={(e) => {
      //         params.timeRangeRadioRef.current = e.target.value;
      //       }}
      //     />
      //   );
      // }
    }
  },
  {
    name: "agencyName",
    label: "机构名称",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
    type: "select",
    options: [
      { label: '测试', value: 1 },
    ],
    props: {
      placeholder: "请选择机构名称"
    }
  },
  {
    name: "reportStatus",
    label: "报告状态",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
    type: "select",
    options: [
      { label: '全部', value: 0 },
      { label: '可下载', value: 1 },
      { label: '更新中', value: 2 },
      { label: '报告获取失败', value: 3 },
    ],
    props: {
      defaultValue: 0,
      placeholder: "请选择报告状态"
    }
  },
  {
    name: "orderStatus",
    label: "订单状态",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    },
    type: "select",
    options: [
      { label: '全部', value: 0 },
      { label: '可下载', value: 1 },
      { label: '更新中', value: 2 },
      { label: '报告获取失败', value: 3 },
    ],
    props: {
      defaultValue: 0,
      placeholder: "请选择订单状态"
    }
  },
];
