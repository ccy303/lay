import React from "react";
import { Form, Button, Input, Checkbox } from "antd";
import style from './styles.less';
const LoginCom = (props) => {
	const onFinish = (e) => {
		props.history.replace("/home");
	};
	return (
		<>
			<section className={style['login-wrap']}>
				<div className={style["login-box"]}>
					<h3>用户登录</h3>
					<Form
						name="basic"
						labelCol={{
							span: 7,
						}}
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
							<Input.Password />
						</Form.Item>
						<Form.Item name="remember" valuePropName="checked">
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</section>
		</>
	);
};
export default LoginCom;
