export default {
    SET_PIECES(state, pieces) {
		state.pieces = pieces
	},

	SET_PIECES_FILTERED_ROW_COUNT(state, piecesFilteredRowCount) {
		state.piecesFilteredRowCount = piecesFilteredRowCount
	},

	SET_PIECE_FILTER(state, pieceFilter) {
		state.pieceFilter = pieceFilter
	},

	SET_SHOW_PIECE_SEARCH_MODAL(state, showPieceFilterModal) {
		state.showPieceFilterModal = showPieceFilterModal
	},

	SET_IS_FILTER_APPLIED(state, isFilterApplied) {
		state.isFilterApplied = isFilterApplied
	}
}
