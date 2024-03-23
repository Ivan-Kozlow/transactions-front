import { Outlet } from 'react-router-dom'

import Header from '../components/Header'

const Layout: React.FC = () => {
	return (
		<div>
			<div className='min-h-screen bg-slate-900 pb-20 font-roboto text-white'>
				<Header />
				<div className='container pt-6'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout
