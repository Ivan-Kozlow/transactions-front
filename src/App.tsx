import { ToastContainer } from 'react-toastify'
import { useCallback, useEffect } from 'react'

import { getTokenFromLocalStorage } from './utils/localStorageUtils'
import { useAppDispatch } from './store/hooks'
import { authService } from './services/auth.service'

import { userActions } from './store/user/userSlice'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = useCallback(async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await authService.getMe()
				data ? dispatch(userActions.login({ ...data, password: '', token })) : dispatch(userActions.logout())
			}
		} catch (error) {
			console.log(error)
		}
	}, [dispatch])

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	return (
		<>
			<ToastContainer position='bottom-right' autoClose={3000} />
		</>
	)
}

export default App
