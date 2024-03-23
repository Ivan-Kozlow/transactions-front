import axios from '../api/axios'
import { Form, useLoaderData } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import { formatToUsd } from '../utils/formatToUsd'
import { parseAndFormatDate } from '../utils/dateParser'

import { ITransaction } from '../types'
import { ITransactionLoader } from '../pages/Transactions/routerHelpers'

interface IProps {
	limit?: number
}

const TransactionTable: React.FC<IProps> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as ITransactionLoader
	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPage, setTotalPage] = useState(1)

	useEffect(() => {
		const fetchTransactionsForPage = async () => {
			const response = (
				await axios.get<ITransaction[]>(`/transactions/pagination?page=${currentPage}&limit=${limit}`)
			).data
			setData(response)
			setTotalPage(Math.ceil(transactions.length / limit) || 1)
		}
		fetchTransactionsForPage()
	}, [currentPage, limit, transactions])

	return (
		<>
			<ReactPaginate
				className='mt-4 flex items-center justify-end gap-3'
				activeClassName='bg-blue-600 rounded-sm'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
				previousClassName='text-white bg-slate-800 text-xs py-1 px-2 rounded-sm'
				nextClassName='text-white bg-slate-800 text-xs py-1 px-2 rounded-sm'
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed'
				pageCount={totalPage}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={({ selected }) => setCurrentPage(selected + 1)}
			/>
			<div className='mt-4 rounded-md bg-slate-800 px-4 py-3'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount, $</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='font-bold'>Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, index) => (
							<tr key={transaction.id}>
								<td>{index + 1}</td>
								<td>{transaction.title}</td>
								<td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
									{transaction.type === 'income'
										? `+ ${formatToUsd(transaction.amount)}`
										: `- ${formatToUsd(transaction.amount)}`}
								</td>
								<td>{transaction.category?.title || 'No category'}</td>
								<td>{parseAndFormatDate(transaction.createdAt)}</td>
								<td>
									<Form action={`/transactions`} method='delete'>
										<input type='hidden' name='id' value={transaction.id} />
										<button className='btn hover:btn-red'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
