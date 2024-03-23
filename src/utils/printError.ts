import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const printError = (err: AxiosError<{ message: string[] | string }>): void => {
	if (!err.response?.data.message) {
		toast.warning('Something went wrong')
		return
	}
	if (typeof err.response.data.message === 'string') {
		toast.error(err.response.data.message)
		return
	}
	const errors = err.response.data.message
	errors.forEach((error: string) => {
		toast.error(error.toString())
	})
}
