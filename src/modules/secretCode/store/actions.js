import { Requester } from '@/http/requester.js'

const secretCodeRequester = new Requester('SecretCode')
export default {
	async checkSecretCodeAvailability(_, {code, type}){
		return await secretCodeRequester.Get("CheckAvailability", `?code=${code}&type=${type}`)
	}
}