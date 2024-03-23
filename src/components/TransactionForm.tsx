import { toast } from 'react-toastify'
import { Form, useLoaderData } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'

import CategoryModal from './CategoryModal'
import { ITransactionLoader } from '../pages/Transactions/routerHelpers'

const TransactionForm: React.FC = () => {
	const [visibleModal, setVisibleModal] = useState({ edit: false, create: false })
	const { categories } = useLoaderData() as ITransactionLoader

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const formElements = e.currentTarget.elements as HTMLFormControlsCollection
		const title = formElements.namedItem('title') as HTMLInputElement
		const amount = formElements.namedItem('amount') as HTMLInputElement

		if (!title.value) {
			toast.warning('Title is required')
			e.preventDefault()
		}
		if (!amount.value) {
			toast.warning('Amount is required')
			e.preventDefault()
		}
	}

	return (
		<div className='rounded-md bg-slate-800 p-4'>
			<Form className='grid gap-2' method='post' action='/transactions' onSubmit={handleSubmit}>
				<label className='grid'>
					<span>Title</span>
					<input
						type='text'
						className='input border-slate-700'
						name='title'
						placeholder='Title...'
						aria-required
					/>
				</label>
				<label className='grid'>
					<span>Amount</span>
					<input
						type='number'
						className='input border-slate-700'
						name='amount'
						placeholder='Amount...'
						aria-required
					/>
				</label>

				{categories.length ? (
					<label className='grid'>
						Category
						<select name='category' className='input border-slate-700 bg-slate-800'>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className='mt-1 text-red-300'>You need to create a category first!</h1>
				)}

				<button
					className='flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
					onClick={() => setVisibleModal({ edit: false, create: true })}
					type='button'
				>
					<FaPlus /> Create a new category
				</button>

				<div className='flex items-center gap-4'>
					<label className='flex cursor-pointer items-center gap-2'>
						<input type='radio' name='type' value='income' className='form-radio text-blue-600' defaultChecked />{' '}
						Income
					</label>
					<label className='flex cursor-pointer items-center gap-2'>
						<input type='radio' name='type' value='expense' className='form-radio text-blue-600' /> Expense
					</label>
				</div>

				<button className='btn btn-green mt-2 max-w-fit'>Submit</button>
			</Form>

			{visibleModal.create && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}
		</div>
	)
}

export default TransactionForm
