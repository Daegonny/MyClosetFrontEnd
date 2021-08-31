import { Requester } from '@/http/requester.js'

const accountRequester = new Requester('SecretCode')
export default {
	async checkAvailability(_, {code, type}){
		return await accountRequester.Get("CheckAvailability", `?code=${code}&type=&${type}`)
	}
}