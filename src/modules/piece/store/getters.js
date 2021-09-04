export default {
	getResultsPerPage: state => state.resultsPerPage,
	getFirstPageResult: state => state.firstPageResult,
	getCurrentPage: state => state.currentPage,
	getTotalPages: state => Math.ceil(state.piecesFilteredRowCount/state.resultsPerPage),
	getIsLastPage: state => state.currentPage == Math.ceil(state.piecesFilteredRowCount/state.resultsPerPage),
	getPieces: state => state.pieces,
	getSelectedPieces: state => state.selectedPieces,
	getCurrentPiece: state => state.currentPiece,
	getPiecesFilteredRowCount: state => state.piecesFilteredRowCount,
	getPieceFilter: state => state.pieceFilter,
	getShowPieceFilterModal: state => state.showPieceFilterModal,
	getShowPieceUploadModal: state => state.showPieceUploadModal,
	getShowPieceEditModal: state => state.showPieceEditModal,
	getIsFilterApplied: state => state.isFilterApplied
}
