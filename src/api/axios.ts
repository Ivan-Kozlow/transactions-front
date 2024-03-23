import axios from 'axios'

import { getTokenFromLocalStorage } from '../utils/localStorageUtils'

const instance = axios.create({
	baseURL: import.meta.env.DB_URL,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage()}`,
	},
})

export default instance
