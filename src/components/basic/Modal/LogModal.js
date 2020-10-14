import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'caihrc';

export default props=>{
  const [loading, setLoading] = useState(false);
  const [op, setOp] = useState(undefined);
  const [dataQuery, setDataQuery] = useState({ ...props.reqQuery });
  const [columns, setColumns] = useState(props.columns(props.reqQuery.pageNum, props.reqQuery.pageSize));

  const httpReq = () => {
    setLoading(true);
    props.req(dataQuery)
      .then(res => {
        if (res.code === "0000") {
          setOp(res.result);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (props.visible) {
      setColumns(props.columns(dataQuery.pageNum, dataQuery.pageSize));
      httpReq();
    }
  }, [dataQuery]);

  useEffect(() => {
    if (props.visible) {
      setDataQuery({ ...props.reqQuery });
      setColumns(props.columns(props.reqQuery.pageNum, props.reqQuery.pageSize));
    }
  }, [props]);

  return (
    <Modal
      visible={props.visible}
      title="操作记录"
      footer={false}
      onCancel={props.onCancel}
      width={800}
    >
      <Table
        rowKey={'createTime'}
        loading={loading}
        pagination={ props.hidePagination ? false : {
          onShowSizeChange: (current, size) => {
            setDataQuery({ ...dataQuery, pageNum: Number(current), pageSize: Number(size) });
          },
          defaultPageSize: props.pageSizeOptions[0],
          pageSizeOptions: props.pageSizeOptions,
          showSizeChanger: true,
          pageSize: dataQuery.pageSize,
          current: dataQuery.pageNum,
          total: op?.totalRecords,
          /* eslint-disable camelcase */
          locale: { items_per_page: "条/页" },
          /* eslint-enable camelcase */
          showTotal: (total) => {
            return '共' + total + '条';
          },
          onChange: (current, size) => {
            setDataQuery({ ...dataQuery, pageNum: Number(current), pageSize: Number(size) });
          },
          itemRender: (current, type, originalElement) => {
            if (type == 'prev') {
              return <Button size={"small"}>上一页</Button>;
            }
            if (type == 'next') {
              return <Button size={"small"}>下一页</Button>;
            }
            return originalElement;
          },
        }}
        columns={columns}
        dataSource={op?.list || op}
        bordered
      />
    </Modal>
  );
};
