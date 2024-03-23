import axios from 'axios'

import { getTokenFromLocalStorage } from '../utils/localStorageUtils'

const instance = axios.create({
	baseURL: 'http://localhost:3000/api/',
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage()}`,
	},
})

export default instance
