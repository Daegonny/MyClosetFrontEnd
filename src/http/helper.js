import axios from 'axios'
import { AuthService } from '@/auth'

const baseURL = process.env.VUE_APP_BASE_API_URL

const createRequest = () => axios.create({
	baseURL: `${baseURL}`,
	headers: {
		Authorization: `Bearer ${AuthService.getToken()}`
	}
})

const createUploadRequest = () => axios.create({
	baseURL: `${baseURL}`,
	headers: {
		Authorization: `Bearer ${AuthService.getToken()}`,
		'Content-Type': 'multipart/form-data'
	}
})

export {baseURL, createRequest, createUploadRequest};