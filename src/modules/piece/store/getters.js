export default {
	getPieces: state => state.pieces,
	getSelectedPieces: state => state.pieces.filter(p => p.isSelected),
	getPiecesFilteredRowCount: state => state.piecesFilteredRowCount,
	getPieceFilter: state => state.pieceFilter,
	getShowPieceFilterModal: state => state.showPieceFilterModal,
	getIsFilterApplied: state => state.isFilterApplied
}
