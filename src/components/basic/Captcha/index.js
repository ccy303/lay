import React, { useState, useEffect } from "react";
import { Modal, Message, Form } from "caihrc";
const BUTTON_TEXT = "获取验证码";

// 传入配置
// const captchaConfig = {
//   mobile: info.userCache.mobile, // 手机号
//   getCaptcha: httpPostSendCaptcha, // 获取验证码http方法
//   async okCallBack(v) { 点击确定回调方法
//     let httpEntry = null;
//     if (activeTab == "payroll") {
//       httpEntry = httpGetPayrollDownFile;
//     } else if (activeTab == "fastPay") {
//       httpEntry = httpGetFastPayDownFile;
//     }
//     const { code } = await httpEntry({
//       captcha: v,
//       resultId: resultId
//     });
//     return code;
//   },
//   mobileCanInput: false, // 手机号码输入框是否可输入
//   countDown: 60 // 倒计时(s)
// };

export default props => {
  const { config, visible, onOk, onCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [captchaBtnDisabled, setCaptchaBtnDisabled] = useState(false);
  const [okBtnDisabled, setOkBtnDisabled] = useState(true);
  const [myInterval, setMyInterval] = useState(null);
  const [buttonText, setButtonText] = useState(BUTTON_TEXT);
  const [captcha, setCaptcha] = useState("");
  let countDown = config.countDown;
  useEffect(() => {
    return () => {
      if (!visible) clear();
    };
  }, [visible, myInterval]);
  // 传入值确保interva为最新的
  function clear(interval) {
    if (interval) {
      clearInterval(interval);
    } else {
      myInterval && clearInterval(myInterval);
      setOkBtnDisabled(true);
    }
    setCaptchaBtnDisabled(false);
    setConfirmLoading(false);
    setButtonText(BUTTON_TEXT);
  }
  async function getCaptcha() {
    setCaptchaBtnDisabled(true);
    const { result } = await config.getCaptcha();
    if (result) {
      Message.success("短信验证码已发送");
      setButtonText(`${countDown}秒后重试`);
      const interval = setInterval(() => {
        countDown--;
        setButtonText(`${countDown}秒后重试`);
        if (countDown == 0) {
          clear(interval);
        }
      }, 1000);
      setMyInterval(interval);
    } else {
      clear();
    }
  }
  async function confirm() {
    setConfirmLoading(true);
  }
  return (
    visible && (
      <div className="captcha-modal">
        <Modal
          visible={visible}
          confirmLoading={confirmLoading}
          width={380}
          title="获取短信验证码"
          cancelText="取消"
          okText="确定"
          okButtonProps={{ disabled: okBtnDisabled }}
          onOk={() => {
            setConfirmLoading(true);
            onOk && onOk(captcha, () => setConfirmLoading(false));
          }}
          onCancel={() => {
            onCancel && onCancel();
          }}
          maskClosable={false}
        >
          <Form.Factory
            initialValues={{
              telephone: config.mobile ? config.mobile : ""
            }}
            onValuesChange={v => {
              let code = v ? v.smsCode : "";
              code = code.replace(" ", "");
              if (code.length == 6) {
                setOkBtnDisabled(false);
                setCaptcha(code);
              } else {
                setOkBtnDisabled(true);
              }
            }}
            colon={true}
            submitButton={false}
            items={[
              {
                label: "手机号",
                name: "telephone",
                disabled: !config.mobileCanInput
              },
              [
                {
                  name: "smsCode",
                  label: "短信验证码",
                  type: "text",
                  labelCol: { span: 9 },
                  wrapperCol: { span: 12 },
                  rules: [{ max: 6 }],
                  col: { span: 16 }
                },
                {
                  name: buttonText,
                  type: "button",
                  props: { disabled: captchaBtnDisabled },
                  onClick() {
                    getCaptcha();
                  }
                }
              ]
            ]}
          />
        </Modal>
      </div>
    )
  );
};
