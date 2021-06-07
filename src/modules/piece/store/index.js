import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import PieceFilterModel from '@/modules/piece/models/PieceFilterModel'

export default {
	state: () => ({
		pieces: [],
		selectedPieces: [],
		currentPiece: undefined,
		piecesFilteredRowCount: 0,
		pieceFilter: new PieceFilterModel(),
		showPieceFilterModal: false,
		showPieceUploadModal: false,
		showPieceEditModal: false,
		isFilterApplied: false
	}),
	getters,
	mutations,
	actions
}
