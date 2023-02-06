export namespace User {
	interface SignUpParams {
		name: string
		password: string
		gender: string
		phone: string
		email: string
		nationality: string
		username: string
	}

	interface LoginParams {
		username: string
		password: string
	}
}
