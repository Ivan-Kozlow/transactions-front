import { useLoaderData } from 'react-router-dom'

import { formatToUsd } from '../../utils/formatToUsd'

import { ITransactionLoader } from './routerHelpers'
import TransactionTable from '../../components/TransactionTable'
import TransactionForm from '../../components/TransactionForm'
import Chart from '../../components/Chart'

const Transaction: React.FC = () => {
	const { totalIncome, totalExpense } = useLoaderData() as ITransactionLoader

	return (
		<>
			<div className='mt-4 grid grid-cols-6 items-start gap-4'>
				<div className='col-span-4 grid'>
					<TransactionForm />
				</div>
				<div className='col-span-2 rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-md text-center font-bold uppercase'>Total Income:</p>
							<p className='text-center p-1 bg-green-600 mt-2 rounded-sm'>{formatToUsd(totalIncome)}</p>
						</div>
						<div>
							<p className='text-md text-center font-bold uppercase'>Total Expense:</p>
							<p className='text-center p-1 bg-red-600 mt-2 rounded-sm'>{formatToUsd(totalExpense)}</p>
						</div>
					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>

			<h1 className='my-5'>
				<TransactionTable limit={5} />
			</h1>
		</>
	)
}

export default Transaction
