import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
	token: string
}

const initialState: UserState = {
	token: ''
}

export const userSlice = createSlice({
	name: 'flight',
	initialState,
	reducers: {
		SET_TOKEN: (state, action) => {
			state.token = action.payload
		}
	}
})
export const { SET_TOKEN } = userSlice.actions

export default userSlice.reducer
