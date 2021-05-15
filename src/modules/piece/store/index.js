import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import PieceFilterModel from '@/modules/piece/models/PieceFilterModel'

export default {
	state: () => ({
		pieces: [],
		piecesFilteredRowCount: 0,
		pieceFilter: new PieceFilterModel(),
		showPieceSearchModal: false,
		isFilterApplied: false
	}),
	getters,
	mutations,
	actions
}
