import router from '@/router'
import jwt_decode from 'jwt-decode'
import { Requester } from '@/http/requester.js'
import { AvailableRoutes } from '@/router/availableRoutes.js'

const accountRequester = new Requester('Auth')

export class Auth {

	async login (email, password) {
		return await accountRequester.Post('Login', { email , password })
		.then(response => {
			this.saveToken(response.data)
		})
	}

	saveToken (token) {
		localStorage.setItem('token', token)
	}

	logout () {
		this.removeToken()
		if (router.currentRoute.path !== AvailableRoutes.Login) {
			router.push(AvailableRoutes.Login)
		}
	}

	removeToken () {
		localStorage.removeItem('token')
	}

	getToken() {
		return localStorage.getItem('token')
	}

	getAccount () {
		const token = this.getToken()
		return token ? jwt_decode(token) : null
	}

	isUserLogged() {
		try {
			return this.getAccount() != null
		} catch {
			return false
		}
	}
}