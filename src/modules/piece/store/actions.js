import {http} from '@/utils/http.js'
import PieceModel from '../models/PieceModel'

export default {
	saveFromFiles(_, files){
		return new Promise((resolve, reject) => {
			http.post('Piece/SaveFromFiles', files, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}})
				.then(response => {
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	fetchPiecesFiltered({commit},{queryFilter, start, quantity}){
		return new Promise((resolve, reject) => {
			http.get(`/Piece/Filtered?start=${start}&quantity=${quantity}${queryFilter.queryString()}`)
				.then(response => {
					commit('ADD_PIECES', response.data.map(r => new PieceModel(r)))
					commit('CLEAN_SELECTED_PIECES')
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	fetchPiecesFilteredRowCount({commit},{queryFilter}){
		return new Promise((resolve, reject) => {
			http.get(`/Piece/Filtered/RowCount?${queryFilter.queryString()}`)
				.then(response => {
					commit('SET_PIECES_FILTERED_ROW_COUNT', response.data)
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	saveCurrentPiece({state}){
		return new Promise((resolve, reject) => {
			http.put(`/Piece`, state.currentPiece)
				.then(response => {
					resolve(response.data)
				})
				.catch(err => {
					reject.error(err.data)
				})
		})
	},

	removePieces({commit, state, getters, dispatch}, pieceIds){
		return new Promise((resolve, reject) => {
			http.delete('/Piece/Multiple', {data: pieceIds})
				.then(async response => {
					for (const pieceId of pieceIds)
						removePiece({commit, state}, pieceId)

					if(!getters.getIsLastPage)
						await fetchPiecesMissing({dispatch, getters}, pieceIds)

					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		});
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

async function fetchPiecesMissing({dispatch, getters}, pieceIds){
	await dispatch("fetchPiecesFiltered", {
		queryFilter: getters.getPieceFilter, 
		start: getters.getFirstPageResult + getters.getResultsPerPage - pieceIds.length, 
		quantity: pieceIds.length
	})
	await dispatch("fetchPiecesFilteredRowCount", {queryFilter: getters.getPieceFilter})
}