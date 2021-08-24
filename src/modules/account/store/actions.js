import { Requester } from '@/http/requester.js'

const accountRequester = new Requester('Account')
export default {
	async createAccount(_, account){
		return await accountRequester.Post("", account)
	},
	async updateAccount(_, account){
		return await accountRequester.Put("", account)
	}
}
