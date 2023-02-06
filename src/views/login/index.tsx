import {
	AlipayCircleOutlined,
	LockOutlined,
	MobileOutlined,
	TaobaoCircleOutlined,
	UserOutlined,
	WeiboCircleOutlined
} from '@ant-design/icons'
import {
	LoginForm,
	ProFormCaptcha,
	ProFormCheckbox,
	ProFormText,
	ProConfigProvider,
	ProFormInstance
} from '@ant-design/pro-components'
import { message, Space, Tabs } from 'antd'
import type { CSSProperties } from 'react'
import React, { useRef, useState } from 'react'
import './style.less'
import { useNavigate } from 'react-router-dom'
import api from '@/api'
type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer'
}

const Index: React.FC = () => {
	const [loginType, setLoginType] = useState<LoginType>('phone')
	const formRef = useRef<ProFormInstance>()
	const navigate = useNavigate()
	const onSubmit = () => {
		formRef.current
			?.validateFields(['name', 'username', 'password', 'email', 'nationality', 'gender', 'phone'])
			.then(() => {
				try {
					api.user.login({
						username: formRef?.current?.getFieldValue('username'),
						password: formRef?.current?.getFieldValue('password')
					})
					message.success('登录成功')
					navigate('/home')
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
						submitButtonProps: {
							onClick: onSubmit
						}
					}}
					formRef={formRef}
					logo="https://cdn.jsdelivr.net/gh/lhy-innno/Image-hosting-service/img/202301111720873.png"
					title="Listenbourg Airways"
					subTitle="全球最先进的航空公司"
					actions={
						<Space>
							其他登录方式
							<AlipayCircleOutlined style={iconStyles} />
							<TaobaoCircleOutlined style={iconStyles} />
							<WeiboCircleOutlined style={iconStyles} />
						</Space>
					}
				>
					<Tabs
						centered
						activeKey={loginType}
						onChange={(activeKey) => setLoginType(activeKey as LoginType)}
					>
						<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
						<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
					</Tabs>
					{loginType === 'account' && (
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
					)}
					{loginType === 'phone' && (
						<>
							<ProFormText
								fieldProps={{
									size: 'large',
									prefix: <MobileOutlined className={'prefixIcon'} />
								}}
								name="mobile"
								placeholder={'手机号'}
								rules={[
									{
										required: true,
										message: '请输入手机号！'
									},
									{
										pattern: /^1\d{10}$/,
										message: '手机号格式错误！'
									}
								]}
							/>
							<ProFormCaptcha
								fieldProps={{
									size: 'large',
									prefix: <LockOutlined className={'prefixIcon'} />
								}}
								captchaProps={{
									size: 'large'
								}}
								placeholder={'请输入验证码'}
								captchaTextRender={(timing, count) => {
									if (timing) {
										return `${count} ${'获取验证码'}`
									}
									return '获取验证码'
								}}
								name="captcha"
								rules={[
									{
										required: true,
										message: '请输入验证码！'
									}
								]}
								onGetCaptcha={async () => {
									message.success('获取验证码成功！验证码为：1234')
								}}
							/>
						</>
					)}
					<div
						style={{
							marginBlockEnd: 24
						}}
					>
						<ProFormCheckbox noStyle name="autoLogin">
							自动登录
						</ProFormCheckbox>
						<a
							style={{
								float: 'right'
							}}
						>
							忘记密码
						</a>
					</div>
				</LoginForm>
			</div>
		</ProConfigProvider>
	)
}
export default Index
