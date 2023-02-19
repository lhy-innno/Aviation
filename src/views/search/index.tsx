import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, DatePicker, Select, Table, Space, Tag, DatePickerProps } from 'antd'
import { SearchParams } from './index.d'
import React, { useState } from 'react'
import './style.less'
import type { ColumnsType } from 'antd/es/table'
import api from '@/api'
import { SET_DESTINATION_AIRPORT, SET_DEPARTURE_AIRPORT } from '@/store/flightSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

const Index: React.FC = () => {
	const dispatch = useAppDispatch()
	const [data, setData] = useState<SearchParams.FlightType[]>([])
	const columns: ColumnsType<SearchParams.FlightType> = [
		{
			title: '航班号',
			dataIndex: 'flight_id',
			key: 'flight_id'
		},
		{
			title: '飞机型号',
			dataIndex: 'model',
			key: 'model',
			render: (_, record) => {
				let context: string = ''
				for (let item of aircraftOption) {
					if (item.aircraft_id === +record.model) {
						context = item.manufacturer + item.model
					}
				}
				return <Space size="middle">{context}</Space>
			}
		},
		{
			title: '出发机场',
			dataIndex: 'departure_airport',
			key: 'departure_airport',
			render: (_, record) => {
				let departure_airport_name: string = ''
				for (let item of cityOptions) {
					if (item.value === record.departure_airport) {
						departure_airport_name = item.label
					}
				}
				return (
					<Space size="middle">
						<a>{departure_airport_name}</a>
					</Space>
				)
			}
		},
		{
			title: '到达机场',
			dataIndex: 'destination_airport',
			key: 'destination_airport',
			render: (_, record) => {
				let destination_airport_name: string = ''
				for (let item of cityOptions) {
					if (item.value === record.destination_airport) {
						destination_airport_name = item.label
					}
				}
				return (
					<Space size="middle">
						<a>{destination_airport_name}</a>
					</Space>
				)
			}
		},
		{
			title: '出发日期',
			dataIndex: 'departure_date',
			key: 'departure_date'
		},
		{
			title: '出发时间',
			dataIndex: 'departure_time',
			key: 'departure_time'
		},
		{
			title: '抵达日期',
			dataIndex: 'arrival_date',
			key: 'arrival_date'
		},
		{
			title: '抵达时间',
			dataIndex: 'arrival_time',
			key: 'arrival_time'
		},
		{
			title: '剩余座位',
			dataIndex: 'seat',
			key: 'seat'
		},
		{
			title: '价格',
			dataIndex: 'charge',
			key: 'charge'
		},
		{
			title: '操作',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button type={'primary'}>预定</Button>
				</Space>
			)
		}
	]
	const [cityOptions] = useState<SearchParams.CityOptionType[]>(
		useAppSelector((state) => state.flight.airportInfo)
	)
	const [aircraftOption] = useState<SearchParams.AircraftOptionType[]>(
		useAppSelector((state) => state.flight.aircraftInfo)
	)
	let [departureId, setDepartureId] = useState(
		useAppSelector((state) => state.flight.departure_airport)
	)
	let [destinationId, setDestinationId] = useState(
		useAppSelector((state) => state.flight.destination_airport)
	)
	let flightTime = ''
	function departureChange(value: string) {
		setDepartureId(value)
		dispatch(SET_DEPARTURE_AIRPORT(value))
	}
	function departureClear() {
		setDepartureId('')
		dispatch(SET_DEPARTURE_AIRPORT(''))
	}
	function destinationChange(value: string) {
		setDestinationId(value)
		dispatch(SET_DESTINATION_AIRPORT(value))
	}
	function destinationClear() {
		setDestinationId('')
		dispatch(SET_DESTINATION_AIRPORT(''))
	}
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		flightTime = dateString
		console.log(date, dateString)
	}
	let temp: SearchParams.FlightType[] = []
	function searchFlight() {
		api.airport
			.searchAirport({
				departure: departureId,
				destination: destinationId,
				date: flightTime
			})
			.then((res) => {
				res.forEach((item) => {
					return temp.push({
						flight_id: item.flight_id,
						model: item.aircraft_aircraft_id,
						departure_airport: item.departure_airport_airport_id,
						destination_airport: item.destination_airport_airport_id,
						departure_date: item.departure_date,
						departure_time: item.departure_time,
						arrival_date: item.arrival_date,
						arrival_time: item.arrival_time,
						charge: item.flight_charge,
						seat: item.flight_number
					})
				})
			})
			.then(() => {
				setData(temp)
			})
	}
	return (
		<div style={{ width: '90%', margin: 'auto' }}>
			<div className={'flightSelector'}>
				<Select
					value={departureId === '' ? undefined : departureId}
					allowClear
					style={{ width: 200 }}
					size={'large'}
					showSearch
					onSelect={departureChange}
					onClear={departureClear}
					placeholder="出发城市"
					optionFilterProp="children"
					options={cityOptions}
					filterOption={(input, option) =>
						(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
					}
				/>
				<Select
					value={destinationId === '' ? undefined : destinationId}
					allowClear
					style={{ width: 200 }}
					size={'large'}
					showSearch
					onSelect={destinationChange}
					onClear={destinationClear}
					placeholder="到达城市"
					optionFilterProp="children"
					options={cityOptions}
				/>
				<DatePicker placeholder="出发日期" onChange={onChange} />
				<Button type="primary" size={'large'} onClick={searchFlight}>
					查询
				</Button>
			</div>
			<Table rowKey={(record) => record.flight_id} columns={columns} dataSource={data}></Table>
		</div>
	)
}

export default Index
