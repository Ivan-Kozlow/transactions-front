import { createBrowserRouter } from 'react-router-dom'

import Transactions from '../pages/Transactions/Transactions'
import { transactionAction, transactionLoader } from '../pages/Transactions/routerHelpers'
import Layout from '../pages/Layout'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import { categoriesAction, categoryLoader } from '../pages/Categories/routerHelpers'
import Categories from '../pages/Categories/Categories'
import Auth from '../pages/Auth'
import ProtectedAuthRoute from '../components/ProtectedAuthRoute'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				action: transactionAction,
				loader: transactionLoader,
				element: (
					<ProtectedAuthRoute>
						<Transactions />
					</ProtectedAuthRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: (
					<ProtectedAuthRoute>
						<Categories />
					</ProtectedAuthRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
