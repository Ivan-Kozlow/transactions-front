import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IResponseUser, IUser } from '../../types'

export type TypeUser = IUser & { token: NonNullable<IResponseUser['token']> }

interface IInitStateUser {
	user: TypeUser | null
	isAuth: boolean
}

const initialState: IInitStateUser = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<TypeUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: (state) => {
			state.user = null
			state.isAuth = false
		},
	},
})
export const { reducer: userReducer, actions: userActions } = userSlice
