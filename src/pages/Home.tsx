import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const Home: React.FC = () => {
	const isAuth = useAuth()
	return (
		<div>
			<div className='text-lg uppercase text-center mt-4 underline'>
				{isAuth ? (
					<>
						Go to create your <Link to={'/transactions'}>transaction</Link>
					</>
				) : (
					<>
						Go to <Link to={'/auth'}>login</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default Home
