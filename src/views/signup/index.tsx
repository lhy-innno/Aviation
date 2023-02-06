import {
	AlipayCircleOutlined,
	IdcardOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	TaobaoCircleOutlined,
	UserOutlined,
	WeiboCircleOutlined
} from '@ant-design/icons'
import {
	LoginForm,
	ProConfigProvider,
	ProFormCheckbox,
	ProFormText,
	ProFormSelect
} from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import { message } from 'antd'
import type { CSSProperties } from 'react'
import React from 'react'
import { nationality } from '@/views/signup/nationality'
import './style.less'
import api from '@/api/index'
import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const iconStyles: CSSProperties = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer'
}

const Index: React.FC = () => {
	const formRef = useRef<ProFormInstance>()
	const navigate = useNavigate()
	const onSubmit = () => {
		formRef.current
			?.validateFields(['name', 'username', 'password', 'email', 'nationality', 'gender', 'phone'])
			.then(() => {
				try {
					api.user.signUp({
						name: formRef?.current?.getFieldValue('name'),
						username: formRef?.current?.getFieldValue('username'),
						nationality: formRef?.current?.getFieldValue('nationality'),
						gender: formRef?.current?.getFieldValue('gender'),
						password: formRef?.current?.getFieldValue('password'),
						email: formRef?.current?.getFieldValue('email'),
						phone: formRef?.current?.getFieldValue('phone')
					})
					message.success('注册成功')
					navigate('/login')
				} catch (e) {
					console.log(e)
				}
			})
	}
	return (
		<ProConfigProvider hashed={false}>
			<div style={{ backgroundColor: 'white' }}>
				<LoginForm
					submitter={{
						searchConfig: {
							submitText: '注册'
						},
						submitButtonProps: {
							onClick: onSubmit
						}
					}}
					formRef={formRef}
					logo="https://cdn.jsdelivr.net/gh/lhy-innno/Image-hosting-service/img/202301111720873.png"
					title="Listenbourg Airways"
					subTitle="全球最先进的航空公司"
				>
					{
						<>
							<ProFormText
								name="username"
								fieldProps={{
									size: 'large',
									prefix: <UserOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入用户名'}
								rules={[
									{
										pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/,
										required: true,
										message: '请输入3到12位由中文，英文字母，或者数字组成的用户名'
									}
								]}
							/>
							<ProFormText
								name="name"
								fieldProps={{
									size: 'large',
									prefix: <IdcardOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入姓名'}
								rules={[
									{
										message: '请输入3到12位由英文字母，或者数字组成的姓名',
										required: true,
										pattern: /^[a-zA-Z0-9]{3,12}$/
									}
								]}
							/>
							<ProFormText
								name="phone"
								fieldProps={{
									size: 'large',
									prefix: <PhoneOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入手机号'}
								rules={[
									{
										required: true,
										message: '请正确输入手机号!',
										pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/
									}
								]}
							/>
							<ProFormText
								name="email"
								fieldProps={{
									size: 'large',
									prefix: <MailOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入邮箱'}
								rules={[
									{
										required: true,
										message: '请输入邮箱!',
										pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
									}
								]}
							/>
							<ProFormSelect
								name="nationality"
								showSearch
								placeholder="请选择国籍"
								fieldProps={{
									size: 'large'
								}}
								rules={[{ required: true, message: '请选择国籍' }]}
								options={nationality}
							/>
							<ProFormSelect
								name="gender"
								fieldProps={{
									size: 'large'
								}}
								rules={[{ required: true, message: '请选择性别' }]}
								showSearch
								placeholder="请选择性别"
								options={[
									{
										label: '男',
										value: 'man'
									},
									{
										label: '女',
										value: 'woman'
									}
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: 'large',
									prefix: <LockOutlined className={'prefixIcon'} />
								}}
								placeholder={'请输入密码'}
								rules={[
									{
										required: true,
										message: '密码需要输入6到12位，需出现字母和数字两种符号',
										pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
									}
								]}
							/>
						</>
					}
					<div>
						<a
							style={{
								float: 'right',
								marginBottom: '15px'
							}}
						>
							<Link to="/login">已有账号？去登录</Link>
						</a>
					</div>
				</LoginForm>
			</div>
		</ProConfigProvider>
	)
}
export default Index
