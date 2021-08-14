import PieceModel from '../models/PieceModel'
import { Requester } from '@/http/requester.js'

const pieceRequester = new Requester('Piece')

export default {
	saveFromFiles({commit}, {files, quantity}){
		return pieceRequester.Upload("SaveFromFiles", files)
		.then(response => {
			commit("ADD_OK_MESSAGE", `${quantity} ${response.data}`)
		})
		.catch( error => {
			commit("ADD_ERROR_MESSAGE", error.response.data.message)
		})
	},

	fetchPiecesFiltered({commit},{queryFilter, start, quantity}){
		return pieceRequester.Get("Filtered",`?start=${start}&quantity=${quantity}${queryFilter.queryString()}`)
			.then(response => {
				commit('ADD_PIECES', response.data.map(r => new PieceModel(r)))
			})
	},

	fetchPiecesFilteredRowCount({commit},{queryFilter}){
		return pieceRequester.Get("Filtered/RowCount",`?${queryFilter.queryString()}`)
			.then(response => {
				commit('SET_PIECES_FILTERED_ROW_COUNT', response.data)
			})
			
	},

	saveCurrentPiece({state, commit}){
		return pieceRequester.Put("", state.currentPiece)
			.then(response => {
				commit("ADD_OK_MESSAGE", response.data)
			})
			.catch( error => {
				commit("ADD_ERROR_MESSAGE", error.response.data.message)
			})
	},

	removePieces({commit, state, getters, dispatch}, pieceIds){
		return pieceRequester.Delete("Multiple", {data: pieceIds})
			.then(async response => {
				for (const pieceId of pieceIds)
					removePiece({commit, state}, pieceId)
	
				await handleLastPage({getters, commit, dispatch}, pieceIds)
				await dispatch("fetchPiecesFilteredRowCount", {queryFilter: getters.getPieceFilter})
				commit("ADD_OK_MESSAGE", `${pieceIds.length} ${response.data}`)
			})
			.catch(error => {
				commit("ADD_ERROR_MESSAGE", error.response.data.message)
			})
	}
}

function removePiece({commit, state}, pieceId){
	if(state.currentPiece.id == pieceId)
		handleRemoveCurrentPiece({commit, state})
	state.selectedPieces.removeIf(s => s.id == pieceId)
	state.pieces.removeIf(s => s.id == pieceId)
}

function handleRemoveCurrentPiece({commit, state}){
	if(state.selectedPieces.length > 1)
		commit("ITERATE_SELECTED_PIECE_INDEX", 1)
	else
		commit("SET_SHOW_PIECE_EDIT_MODAL", false)
}

async function handleLastPage({getters, commit, dispatch}, pieceIds){
	if(getters.getIsLastPage)
		await handleRemoveLastPage({commit, dispatch, getters})
	else
		await dispatch("fetchPiecesFiltered", {
			queryFilter: getters.getPieceFilter, 
			start: getters.getFirstPageResult + getters.getResultsPerPage - pieceIds.length, 
			quantity: pieceIds.length
		})
}

async function handleRemoveLastPage({commit, dispatch, getters}){
	if(getters.getPieces.length == 0){
		commit("SET_CURRENT_PAGE", getters.getCurrentPage - 1)
		commit("SET_FIRST_PAGE_RESULT", ((getters.getCurrentPage - 1) * getters.getResultsPerPage))
		await dispatch("fetchPiecesFiltered", {
			queryFilter: getters.getPieceFilter, 
			start: getters.getFirstPageResult, 
			quantity: getters.getResultsPerPage
		})
	}
}