import getters from './getters'
import mutations from './mutations'

export default{
	state: () => ({
		messages : [],
		showTopbar: false
	}),
	getters,
	mutations
}