import router from '@/router'
import { createRequest, createUploadRequest } from './helper.js'
import { ResponseCodes } from './responseCodes.js'
import { AvailableRoutes } from '@/router/availableRoutes.js'

export class Requester {
	
	constructor (controller) {
		this.controller = controller
	}

	async Get (route, query) {
		return this.handleResponse(createRequest().get(`${this.controller}/${route}${query}`))
	}

	async Post (route, body) {
		return this.handleResponse(createRequest().post(`${this.controller}/${route}`, body))
	}

	async Put (route, body) {
		return this.handleResponse(createRequest().put(`${this.controller}/${route}`, body))
	}

	async Delete (route, body) {
		return this.handleResponse(createRequest().delete(`${this.controller}/${route}`, body))
	}

	async Upload (route, files){
		return this.handleResponse(createUploadRequest().post(`${this.controller}/${route}`, files))
	}

	handleResponse (response) {
		return new Promise((resolve, reject) => {
			return response
				.then(c => resolve(c))
				.catch((error) => {
					this.redirectIfNeeded(error)
					reject(error)
				})
		})
	}

	redirectIfNeeded (error) {
		if (!!error && !!error.response && !!error.response.status) {
			this.redirectIfUnauthorized(error.response.status)
		}
	}

	redirectIfUnauthorized (status) {
		if (status === ResponseCodes.Unauthorized && router.currentRoute.path !== AvailableRoutes.Login) {
			router.push(AvailableRoutes.Login)
		}
	}
}