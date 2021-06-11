export default {
	
	SET_RESULTS_PER_PAGE(state, resultsPerPage){
		state.resultsPerPage = resultsPerPage
	},

	SET_FIRST_PAGE_RESULT(state, firstPageResult){
		state.firstPageResult = firstPageResult
	},

	SET_CURRENT_PAGE(state, currentPage){
		state.currentPage = currentPage
	},

	ADD_PIECES(state, pieces) {
		state.pieces = state.pieces.concat(pieces)
	},

	CLEAN_PIECES(state) {
		state.pieces = []
	},

	CLEAN_SELECTED_PIECES(state) {
		state.selectedPieces = []
		state.currentPiece = undefined
	},

	ADD_SELECTED_PIECE(state, piece) {
		if(state.selectedPieces.length == 0)
			state.currentPiece = piece
		state.selectedPieces.push(piece)
	},

	REMOVE_SELECTED_PIECE(state, piece) {
		const index = state.selectedPieces.indexOf(state.currentPiece)
		const id = piece.id
		state.selectedPieces.removeIf(item => item.id === piece.id)
		
		if(state.selectedPieces.length == 0)
			state.currentPiece = piece = undefined
		else if (state.currentPiece.id == id)
			state.currentPiece =  state.selectedPieces[index % state.selectedPieces.length]
	},

	ITERATE_SELECTED_PIECE_INDEX(state, increment) {
		const index = state.selectedPieces.indexOf(state.currentPiece)
		state.currentPiece =  state.selectedPieces[(index + increment) % state.selectedPieces.length]
	},

	SET_PIECES_FILTERED_ROW_COUNT(state, piecesFilteredRowCount) {
		state.piecesFilteredRowCount = piecesFilteredRowCount
	},

	SET_PIECE_FILTER(state, pieceFilter) {
		state.pieceFilter = pieceFilter
	},

	SET_SHOW_PIECE_FILTER_MODAL(state, showPieceFilterModal) {
		state.showPieceFilterModal = showPieceFilterModal
	},

	SET_SHOW_PIECE_UPLOAD_MODAL(state, showPieceUploadModal) {
		state.showPieceUploadModal = showPieceUploadModal
	},

	SET_SHOW_PIECE_EDIT_MODAL(state, showPieceEditModal) {
		state.showPieceEditModal = showPieceEditModal
	},

	SET_IS_FILTER_APPLIED(state, isFilterApplied) {
		state.isFilterApplied = isFilterApplied
	}
}
