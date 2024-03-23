export const getTokenFromLocalStorage = (): string => {
	const data = localStorage.getItem('token') || ''
	return data ? JSON.parse(data) : ''
}

export const setTokenToLocalStorage = (token: string | undefined): void => {
	token && localStorage.setItem('token', JSON.stringify(token))
}

export const removeTokenFromLocalStorage = (): void => {
	localStorage.removeItem('token')
}
