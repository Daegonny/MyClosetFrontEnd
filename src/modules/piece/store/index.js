import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
	state: () => ({
		pieces: [],
		piecesFilteredRowCount: 0,
	}),
	getters,
	mutations,
	actions
}
