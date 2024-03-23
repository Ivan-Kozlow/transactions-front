import { Link } from 'react-router-dom'

import img from '/pageNotFound.webp'

const ErrorPage: React.FC = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white'>
			<img src={img} className='w-80' alt='Not Found Page' />
			<Link to={'/'} className='rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600'>
				Go home
			</Link>
		</div>
	)
}

export default ErrorPage
