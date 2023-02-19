import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface AirportProps {
	label: string
	value: number
}

export interface AirCraftProps {
	aircraft_id: number
	manufacturer: string
	model: string
	number_of_seat: number
}

export interface FlightState {
	aircraftInfo: AirCraftProps[]
	airportInfo: AirportProps[]
	departure_airport: string
	destination_airport: string
}

const initialState: FlightState = {
	aircraftInfo: [],
	airportInfo: [],
	departure_airport: '',
	destination_airport: ''
}

export const flightSlice = createSlice({
	name: 'flight',
	initialState,
	reducers: {
		SET_AIRPORT_INFO: (state, action) => {
			state.airportInfo = action.payload
		},
		SET_DEPARTURE_AIRPORT: (state, action) => {
			state.departure_airport = action.payload
		},
		SET_DESTINATION_AIRPORT: (state, action) => {
			state.destination_airport = action.payload
		},
		SET_AIRCRAFT_INFO: (state, action) => {
			state.aircraftInfo = action.payload
		}
	}
})

export const {
	SET_AIRPORT_INFO,
	SET_DEPARTURE_AIRPORT,
	SET_DESTINATION_AIRPORT,
	SET_AIRCRAFT_INFO
} = flightSlice.actions
export default flightSlice.reducer
