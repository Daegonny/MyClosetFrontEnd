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
		sessionStorage.setItem('token', token)
	}

	logout () {
		this.removeToken()
		if (router.currentRoute.path !== AvailableRoutes.Login) {
			router.push(AvailableRoutes.Login)
		}
	}

	removeToken () {
		sessionStorage.removeItem('token')
	}

	getToken() {
		return sessionStorage.getItem('token')
	}

	getAccount () {
		const token = this.getToken()
		return token ? jwt_decode(token) : null
	}

	isUserLogged() {
		return this.getAccount() != null
	}
}