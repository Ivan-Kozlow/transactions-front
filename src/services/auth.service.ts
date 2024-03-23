import axios from '../api/axios'

import { IResponseRegisterUser, IResponseUser, IUser } from '../types'

export const authService = {
	async registration(userData: IUser) {
		return (await axios.post<IResponseRegisterUser>('user', userData)).data
	},
	async login(userData: IUser) {
		return (await axios.post<IResponseUser>('auth/login', userData)).data
	},
	async getMe() {
		return (await axios.get<Omit<IResponseUser, 'password' | 'token'>>('auth/profile')).data
	},
}
