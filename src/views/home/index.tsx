import React, { useState, useEffect } from 'react'
import {
	Layout,
	Card,
	theme,
	Radio,
	Form,
	Input,
	Button,
	DatePicker,
	Col,
	Row,
	Divider,
	Tabs,
	Select
} from 'antd'
import type { DatePickerProps } from 'antd'
import './style.less'
import api from '@/api'
const { Meta } = Card
import { FaPlane, FaTag, FaBusinessTime, FaPlaneDeparture } from 'react-icons/fa'
import MainPoster from '@/assets/image/main.webp'
const { Content } = Layout
type LayoutType = Parameters<typeof Form>[0]['layout']
const Home: React.FC = () => {
	const [formLayout] = useState<LayoutType>('inline')
	const formItemLayout =
		formLayout === 'inline'
			? {
					wrapperCol: { span: 30 }
			  }
			: null
	const buttonItemLayout =
		formLayout === 'inline'
			? {
					wrapperCol: { span: 10, offset: 10 }
			  }
			: null
	let [cityOptions, setCityOptions] = useState<object[]>([])
	let options: object[] = []
	useEffect(() => {
		api.airport
			.getAirport()
			.then((res) => {
				for (let i = 0; i < res.list.length; i++) {
					options.push({
						value: res.list[i].airport_id,
						label: res.list[i].airport_name
					})
				}
			})
			.then(() => {
				return setCityOptions(options)
			})
	}, [])
	let departureId = ''
	let destinationId = ''
	let flightTime = ''
	function departureChange(value: string) {
		departureId = value
		console.log(departureId)
	}
	function destinationChange(value: string) {
		destinationId = value
	}
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		flightTime = dateString
		console.log(date, dateString)
	}
	function searchFlight() {
		api.airport
			.searchAirport({
				departure: departureId,
				destination: destinationId,
				date: flightTime
			})
			.then((res) => {
				console.log(res)
			})
	}
	return (
		<section className="home-main">
			<Layout style={{ width: '100%' }}>
				<div className="container">
					<div className="cover"></div>
					<img className="poster" src={MainPoster} alt="海报" />
				</div>
				<Content className="site-layout" style={{ padding: '0 50px', minHeight: '600px' }}>
					<div className="card-container">
						<Tabs
							centered
							className="tab-card"
							type="card"
							size="large"
							tabBarStyle={{ minWidth: '800px' }}
							items={[
								{
									label: '搜索航班',
									key: 'search',
									children: (
										<Form
											size="large"
											{...formItemLayout}
											layout={formLayout}
											initialValues={{ layout: formLayout }}
										>
											<Form.Item>
												<Select
													size="large"
													showSearch
													onSelect={departureChange}
													style={{ width: 200 }}
													placeholder="出发城市"
													optionFilterProp="children"
													options={cityOptions}
												/>
											</Form.Item>
											<Form.Item>
												<Select
													size="large"
													showSearch
													onSelect={destinationChange}
													style={{ width: 200 }}
													placeholder="抵达城市"
													optionFilterProp="children"
													options={cityOptions}
												/>
											</Form.Item>
											<Form.Item name="date-picker">
												<DatePicker placeholder="选择日期" onChange={onChange} />
											</Form.Item>
											<Form.Item {...buttonItemLayout}>
												<Button type="primary" onClick={searchFlight}>
													Submit
												</Button>
											</Form.Item>
										</Form>
									)
								},
								{
									label: '管理预定',
									key: 'manage',
									children: '112'
								},
								{
									label: '航班状态',
									key: 'status',
									children: '112'
								},
								{
									label: '值机',
									key: 'flight',
									children: '112'
								}
							]}
						/>
					</div>
					<section className="recommend-card-group">
						<Divider orientation="center" style={{ margin: '100px 0 100px 0' }} plain>
							<h2>探索</h2>
						</Divider>
						<Row gutter={[16, 24]}>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://c.ekstatic.net/shared/images/destination/v1/airports/BCN/810x270.jpg"
										/>
									}
								>
									<Meta title="巴塞罗那" description="西班牙" style={{ textAlign: 'center' }} />
								</Card>
							</Col>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://c.ekstatic.net/shared/images/destination/v1/airports/LON/810x270.jpg"
										/>
									}
								>
									<Meta title="伦敦" description="英国" style={{ textAlign: 'center' }} />
								</Card>
							</Col>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://cdn.ek.aero/shared/images/destination/v1/airports/DUB/810x270.jpg"
										/>
									}
								>
									<Meta title="都柏林" description="爱尔兰" style={{ textAlign: 'center' }} />
								</Card>
							</Col>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://cdn.ek.aero/shared/images/destination/v1/airports/DXB/810x270.jpg"
										/>
									}
								>
									<Meta
										title="迪拜"
										description="阿拉伯联合酋长国"
										style={{ textAlign: 'center' }}
									/>
								</Card>
							</Col>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://c.ekstatic.net/shared/images/destination/v1/airports/IST/810x270.jpg"
										/>
									}
								>
									<Meta title="伊斯坦布尔" description="土耳其" style={{ textAlign: 'center' }} />
								</Card>
							</Col>
							<Col className="gutter-row" span={8}>
								<Card
									className="recommend-card"
									hoverable
									cover={
										<img
											alt="example"
											src="https://c.ekstatic.net/shared/images/destination/v1/airports/TLV/810x270.jpg"
										/>
									}
								>
									<Meta title="特拉维夫" description="以色列" style={{ textAlign: 'center' }} />
								</Card>
							</Col>
						</Row>
					</section>
				</Content>
			</Layout>
		</section>
	)
}

export default Home
