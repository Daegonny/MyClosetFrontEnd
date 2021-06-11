import getters from './getters'
import mutations from './mutations'

export default{
	state: () => ({
		messages : []
	}),
	getters,
	mutations
}