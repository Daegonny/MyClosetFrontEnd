export default {
	getPieces: state => state.pieces,
	getSelectedPieceIndexes: state => state.selectedPieceIndexes,
	getSelectedPieces: state => state.selectedPieces,
	getCurrentPiece: state => state.currentPiece,
	getPiecesFilteredRowCount: state => state.piecesFilteredRowCount,
	getPieceFilter: state => state.pieceFilter,
	getShowPieceFilterModal: state => state.showPieceFilterModal,
	getShowPieceUploadModal: state => state.showPieceUploadModal,
	getShowPieceEditModal: state => state.showPieceEditModal,
	getIsFilterApplied: state => state.isFilterApplied
}
