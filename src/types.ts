export interface IUser {
	email: string
	password: string
}

export interface ITransaction {
	amount: number
	category: ICategory
	createdAt: string
	id: number
	title: string
	type: 'income' | 'expense'
	updatedAt: string
}

export interface ICategory {
	id: number
	title: string
	createdAt: string
	updatedAt: string
}

export interface IResponseUser extends IUser {
	id: string
	email: string
	token: string
}
export interface IResponseRegisterUser extends IResponseUser {
	createdAt: string
	updatedAt: string
}
export interface IResponseTransaction extends ITransaction {
	user: { id: number }
}
export interface IResponseCategory extends ICategory {
	transactions: ITransaction[]
}
