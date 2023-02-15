import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface AirportState {
	label: string
	value: string
}

const initialState: AirportState[] = []

export const airportSlice = createSlice({
	name: 'airport',
	initialState,
	reducers: {
		SET_AIRPORT_INFO: (state, action: PayloadAction) => {
			// state = action.payload
		}
	}
})

export const { SET_AIRPORT_INFO } = airportSlice.actions
