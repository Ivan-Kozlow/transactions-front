import { Form } from 'react-router-dom'
import { useState } from 'react'

interface IProps {
	id?: number
	type: 'post' | 'patch'
	setVisibleModal: ({ create, edit }: { create: boolean; edit: boolean }) => void
}

const CategoryModal: React.FC<IProps> = ({ type, id, setVisibleModal }) => {
	const [inputVal, setInputValue] = useState('')

	return (
		<div className='fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center bg-black/50'>
			<Form
				method={type}
				action='/categories'
				className='grid w-[300px] gap-2 rounded-md p-5 bg-slate-900'
				onSubmit={() => inputVal && setVisibleModal({ create: false, edit: false })}
			>
				<label>
					<span className='text-lg'>Category Title</span>
					<input
						className='input w-full mt-2 mb-4'
						type='text'
						name='title'
						placeholder='Title...'
						autoFocus
						onChange={(e) => setInputValue(e.target.value)}
					/>
					{id && <input type='hidden' name='id' value={id} />}
				</label>

				<div className='flex items-center gap-2'>
					<button className='btn btn-green' type='submit' disabled={!inputVal}>
						{type === 'patch' ? 'Update' : 'Create'}
					</button>
					<button className='btn btn-red' onClick={() => setVisibleModal({ create: false, edit: false })}>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
