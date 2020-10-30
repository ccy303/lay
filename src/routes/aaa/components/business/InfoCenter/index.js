import React, { useState, useRef, useEffect } from "react";
import { Modal, TableList, Message } from "caihrc";
import { getInfoList, getReadStatus } from '../../../http/infoCenter';
import CTaileList from '../../basic/CTaileList';
import './style.less';

export default props => {
  const readRef = React.createRef();
  const [visible, setVisible] = useState(false);
  // 消息详情
  const [infoDetails, setInfoDetails] = useState({});
  const [data, setData] = useState([]);

  const titleClick = (e, recode) => {
    e.persist();
    setInfoDetails({
      title: recode.title,
      infoType: recode.infoType,
      infoContent: recode.infoContent,
      time: recode.time
    });
    setVisible(true);
    console.log(e.target.classList.contains("noRead"));
    // 未阅发送
    if (recode.readStatus === 1 && e.target.classList.contains("noRead")) {
      e.target.parentNode.parentNode.lastChild.textContent = "已阅";
      delete e.target.classList.remove("noRead") ;
      getReadStatus({ readStatus: recode.readStatus });
    }
  };

  // useEffect(() => {
  //   getInfoList().then(res => {
  //     if (res.code === "0000") {
  //       setData(res.data.list);
  //     } else {
  //       Message.error("数据获取失败");
  //     }
  //   });
  // }, []);

  return <>
    <UI
      titleClick={titleClick}
      data={data}
      readRef={readRef}
    />
    <Modal
      visible={visible}
      title="消息详情"
      onOk={() => setVisible(false)}
      cancelButtonProps={{
        style: {
          display: "none"
        }
      }}
      onCancel={() => setVisible(false)}
    >
      <p className="modal-text"><span>标题：</span>{infoDetails?.title}</p>
      <p className="modal-text"><span>消息类型：</span>{infoDetails?.infoType}</p>
      <p className="modal-text"><span>消息内容：</span>{infoDetails?.infoContent}</p>
      <p className="modal-text"><span>时间：</span>{infoDetails?.time}</p>
    </Modal>
  </>;
};

const UI = props => {
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      render: (text, recode, index) => {
        return <span
          className={recode.readStatus === 1 ? 'noRead' : null}
          onClick={(e) => props.titleClick(e, recode)}>
          {recode.title}
        </span>;
      }
    },
    {
      title: "消息类型",
      align: "center",
      dataIndex: "infoType"
    },
    {
      title: "消息内容",
      align: "center",
      dataIndex: "infoContent"
    },
    {
      title: "时间",
      width: 160,
      align: "center",
      dataIndex: "time"
    },
    {
      title: "状态",
      width: 65,
      align: "center",
      dataIndex: "status",
    },
  ];
  const action = useRef();
  const request = (params, filters, sorter) => {
    return new Promise(resolve => {
      // 处理参数成后端需要的格式
      getInfoList(params).then(res=>{
        resolve({
          data: res.data.list || [],
          total: res.data.total
        });
      });

    });
  };

  return <div className="message">
    <div className="message-title">
      <p>消息中心</p>
    </div>
    <div className="message-table">
      <CTaileList
        // key="time"
        columns={columns}
        requestFun={request}
        actionRef={action}
        searchFromConfig={{ items: [], reset: false, submitButton: false }}
      />
      {/* <TableList*/}
      {/*  actionRef={action}*/}
      {/*  rowKey="time"*/}
      {/*  request={request}*/}
      {/*  columns={columns}*/}
      {/*  pagination={{*/}
      {/*    pageSize: 5,*/}
      {/*    showQuickJumper: true,*/}
      {/*    showSizeChanger: true,*/}
      {/*    pageSizeOptions: ["5", "10", "20"],*/}
      {/*  }}*/}
      {/*  search={{*/}
      {/*    items: [],*/}
      {/*    reset: false,*/}
      {/*    submitButton: false*/}
      {/*  }}*/}
      {/* />*/}
    </div>
  </div>;
};
