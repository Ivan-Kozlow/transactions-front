import { Form } from 'react-router-dom'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'

import { IResponseCategory } from '../types'

interface IProps {
	category: IResponseCategory
	setIsVisibleModal: ({ create, edit }: { create: boolean; edit: boolean }) => void
	setCategoryId: React.Dispatch<React.SetStateAction<number>>
}

const CategoryItem: React.FC<IProps> = ({ category, setIsVisibleModal, setCategoryId }) => {
	return (
		<div
			key={category.id}
			className='group relative flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-blue-600 min-w-16'
		>
			{category.title}
			<div className='absolute bottom-0 right-0 left-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex'>
				<button
					onClick={() => {
						setIsVisibleModal({ edit: true, create: false })
						setCategoryId(category.id)
					}}
				>
					<AiFillEdit />
				</button>
				<Form className='flex' method='delete' action='/categories'>
					<input type='hidden' name='id' value={category.id} />
					<button type='submit'>
						<AiFillCloseCircle />
					</button>
				</Form>
			</div>
		</div>
	)
}

export default CategoryItem
