import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { printError } from '../utils/printError'
import { setTokenToLocalStorage } from '../utils/localStorageUtils'
import { useAppDispatch } from '../store/hooks'
import { authService } from '../services/auth.service'

import { userActions } from '../store/user/userSlice'

const Auth: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLogin, setIsLogin] = useState(true)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await authService.registration({ email, password })
			if (data) {
				toast.success('Account created successfully')
				setTokenToLocalStorage(data.token)
				dispatch(userActions.login(data))
				navigate('/transactions')
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			printError(err)
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await authService.login({ email, password })
			if (data) {
				toast.success('Login successful')
				setTokenToLocalStorage(data.token)
				dispatch(userActions.login(data))
				navigate('/')
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			printError(err)
		}
	}

	return (
		<div className='mt-40 flex flex-col items-center bg-slate-900 text-white'>
			<h1 className='mb-10 text-center text-xl'>{isLogin ? 'Login' : 'Register'}</h1>

			<form className='mx-auto flex flex-col gap-5 w-1/3' onSubmit={isLogin ? loginHandler : registrationHandler}>
				<input type='text' className='input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
				<input
					type='password'
					className='input'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className='btn btn-green mx-auto'>Submit</button>
			</form>

			<div className='flex justify-center mt-5'>
				{isLogin ? (
					<button className='text-slate-300 hover:text-white' onClick={() => setIsLogin(!isLogin)}>
						You don`t have an account?
					</button>
				) : (
					<button className='text-slate-300 hover:text-white' onClick={() => setIsLogin(!isLogin)}>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
