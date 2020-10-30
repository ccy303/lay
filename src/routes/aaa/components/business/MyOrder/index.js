import React, { useEffect, useState, useRef } from "react";
import { TableList, Button } from "caihrc";
import { columns, group } from "./list.js";
import { getOrderList } from '../../../http/order';
import "./styles.less";

export default props => {

  const request = async (search) => {
    const result = await getOrderList({
      pageNum: 1,
      pageSize: 50,
    });
    // 这能拿到筛选条件
    return new Promise((resolve) => {
      resolve({
        data: [{}],
        total: 0
      });
    });
  };

  const Total = () => ((
    <div styleName="toolbar">
      <div>
        汇总：2020-10-08至2020-10-14，订单量198条，订单总额共237,600元。
      </div>
      <div>
        <Button>导出</Button>
      </div>
    </div>
  ));
  return <div styleName="container">
    <TableList
      style={{
        width: '100%'
      }}
      rowKey="dataId"
      size="middle"
      columns={columns}
      // actionRef={props.tableListAction}
      request={request}
      scroll={{ x: 1340 }}
      pagination={{
        size: "small",
        pageSize: 50,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["50", "100", "200"],
      }}
      search={{
        items: group,
        keywordKey: "keyword",
        clearBtn: false,
        reset: false,
        submitText: "查询"
      }}
      toolBarRender={[<Total />]}
    />
  </div>;
};
