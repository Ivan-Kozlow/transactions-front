import { toast } from 'react-toastify'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'

import { useAppDispatch } from '../store/hooks'
import { useAuth } from '../hooks/useAuth'

import { userActions } from '../store/user/userSlice'

const Header: React.FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(userActions.logout())
		localStorage.removeItem('token')
		toast.success('Logout successful')
		navigate('/')
	}

	const isActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-white' : 'text-white/70')

	return (
		<header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={20} />
			</Link>

			{isAuth && (
				<nav className='ml-auto mr-10'>
					<ul className='flex items-center gap-5'>
						<li>
							<NavLink to={'/'} className={isActiveClass}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to={'/transactions'} className={isActiveClass}>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink to={'/categories'} className={isActiveClass}>
								Categories
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{isAuth ? (
				<button className='btn btn-red' onClick={logoutHandler}>
					<span>Logout</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link className='ml-auto py-2 text-white/50 hover:text-white' to={'/auth'}>
					Log in / Sign up
				</Link>
			)}
		</header>
	)
}

export default Header
