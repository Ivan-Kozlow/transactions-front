import axios from '../../api/axios'
import { toast } from 'react-toastify'

import { printError } from '../../utils/printError'

import { IResponseCategory, ITransaction } from '../../types'

export type ITransactionLoader = {
	categories: IResponseCategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}

export const transactionLoader = async () => {
	try {
		const catagories = await axios.get<IResponseCategory[]>('/categories')
		const transactions = await axios.get<ITransaction[]>('/transactions')
		const totalIncome = await axios.get<number>('/transactions/income/find')
		const totalExpense = await axios.get<number>('/transactions/expense/find')
		return {
			categories: catagories.data,
			transactions: transactions.data,
			totalIncome: totalIncome.data,
			totalExpense: totalExpense.data,
		}
	} catch (error) {
		return {
			categories: [],
			transactions: [],
			totalIncome: 0,
			totalExpense: 0,
		}
	}
}
export const transactionAction = async ({ request }: { request: Request }) => {
	if (request.method.toLocaleLowerCase() === 'post') {
		try {
			const formData = await request.formData()
			const newCategory = {
				title: formData.get('title'),
				type: formData.get('type'),
				amount: Number(formData.get('amount')),
				category: formData.get('category'),
			}
			await axios.post('/transactions', newCategory)
			toast.success('Transaction added successfully')
			return null
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			printError(err)
			return null
		}
	}

	if (request.method.toLocaleLowerCase() === 'delete') {
		try {
			const formData = await request.formData()
			const id = formData.get('id')
			await axios.delete(`/transactions/transaction/${id}`)
			toast.success(`Transaction deleted successfully`)
			return null
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			printError(err)
			return null
		}
	}
}
