import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { IResponseCategory } from '../../types'

export const categoriesAction = async ({ request }: { request: Request }) => {
	if (request.method.toLowerCase() === 'post') {
		const formData = await request.formData()
		const title = formData.get('title')
		if (!title) {
			toast.warning('Category title is required')
			return null
		}
		await axios.post('/categories', { title })
		return null
	}
	if (request.method.toLowerCase() === 'delete') {
		const formData = await request.formData()
		const id = formData.get('id')
		await axios.delete(`/categories/category/${id}`)
		return null
	}
	if (request.method.toLowerCase() === 'patch') {
		const formData = await request.formData()
		const id = formData.get('id')
		const title = formData.get('title')
		if (!title) {
			toast.warning('Category title is required')
			return null
		}
		if (!id) {
			toast.warning('Some thing went wrong')
			return null
		}
		await axios.patch(`/categories/category/${id}`, { title })
		return null
	}
	return null
}

export const categoryLoader = async () => {
	try {
		return (await axios.get<IResponseCategory[]>('/categories')).data
	} catch (error) {
		return []
	}
}
