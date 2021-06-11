import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import PieceFilterModel from '@/modules/piece/models/PieceFilterModel'

export default {
	state: () => ({
		resultsPerPage: 12,
		firstPageResult: 0, 
		currentPage: 1,
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
