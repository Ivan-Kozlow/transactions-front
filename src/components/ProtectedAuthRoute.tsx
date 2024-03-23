import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const ProtectedAuthRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const isAuth = useAuth()

	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className='mt-20 flex flex-col items-center justify-center gap-10'>
					<h2 className='text-2xl'>
						To view this page you need to{' '}
						<Link to='/auth' className='underline'>
							login
						</Link>
					</h2>
				</div>
			)}
		</>
	)
}

export default ProtectedAuthRoute
