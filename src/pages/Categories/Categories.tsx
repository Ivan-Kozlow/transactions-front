import { useLoaderData } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'

import { IResponseCategory } from '../../types'
import CategoryModal from '../../components/CategoryModal'
import CategoryItem from '../../components/CategoryItem'

const Categories: React.FC = () => {
	const categories = useLoaderData() as IResponseCategory[]
	const [isVisibleModal, setIsVisibleModal] = useState({ edit: false, create: false })
	const [categoryId, setCategoryId] = useState(0)

	return (
		<>
			<div className='mt-10 rounded-md p-4 bg-slate-800'>
				<h1>Your Categories</h1>
				<div className='mt-2 flex flex-wrap items-center gap-2'>
					{categories.map((category) => (
						<CategoryItem
							category={category}
							key={category.id}
							setIsVisibleModal={setIsVisibleModal}
							setCategoryId={setCategoryId}
						/>
					))}
				</div>
				<button
					className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
					onClick={() => setIsVisibleModal({ edit: false, create: true })}
				>
					<FaPlus /> Create a new category
				</button>
			</div>

			{isVisibleModal.create && <CategoryModal setVisibleModal={setIsVisibleModal} type='post' />}
			{isVisibleModal.edit && <CategoryModal id={categoryId} setVisibleModal={setIsVisibleModal} type='patch' />}
		</>
	)
}

export default Categories
