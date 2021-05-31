import {http} from '@/utils/http.js'
import PieceModel from '../models/PieceModel'

export default {
	saveFromFiles({commit}, files){
		return new Promise((resolve, reject) => {
			http.post('Piece/SaveFromFiles', files, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}})
				.then(response => {
					commit('SET_PIECES', response.data)
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
					commit('SET_PIECES', response.data.map(r => new PieceModel(r)))
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

	// removePiece({commit, state}, {pieceId}){
	// 	return new Promise((resolve, reject) => {
	// 		http.delete(`/Piece/${pieceId}`)
	// 			.then(response => {
	// 				const newPieces = state.pieces
	// 				newPieces.removeIf( i => i.id == pieceId);
	// 				commit('SET_PIECES', newPieces)
	// 				commit('REMOVE_SELECTED_PIECE_INDEX', pieceId)
					
	// 				resolve(response.data)

	// 			})
	// 			.catch(err => {
	// 				reject(err)
	// 			})
	// 	});
	// },

	removeCurrentPiece({commit, state}){
		const currentPiece = state.currentPiece
		commit("ITERATE_SELECTED_PIECE_INDEX", 1)
		state.selectedPieces.removeIf(s => s.id == currentPiece.id)
		state.pieces.removeIf(p => p.id == currentPiece.id)
		if(state.selectedPieces.length == 0)
			commit("SET_SHOW_PIECE_EDIT_MODAL", false)		

		// return new Promise((resolve, reject) => {
		// 	http.delete(`/Piece/${pieceId}`)
		// 		.then(response => {
		// 			const newPieces = state.pieces
		// 			newPieces.removeIf( i => i.id == pieceId);
		// 			commit('SET_PIECES', newPieces)
		// 			commit('REMOVE_SELECTED_PIECE_INDEX', pieceId)
					
		// 			resolve(response.data)

		// 		})
		// 		.catch(err => {
		// 			reject(err)
		// 		})
		// });
	},

	saveCurrentPiece({state}){
		console.log(state.currentPiece)
		http.put(`/Piece`, state.currentPiece)
			.then(response => {
				console.info(response)
			})
			.catch(err => {
				console.error(err)
			})
	},

	removePieces({commit, state}, pieceIds){
		return new Promise((resolve, reject) => {
			http.delete('/Piece/Multiple', {data: pieceIds})
				.then(response => {
					const newPieces = state.pieces
					newPieces.removeIf( i => pieceIds.includes(i.id));
					commit('SET_PIECES', newPieces)
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		});
	},

	savePieces(_, pieces){
		return new Promise((resolve, reject) => {
			http.put('/Piece/Multiple', pieces)
				.then(response => {
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		});
	}
}
