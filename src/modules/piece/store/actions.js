import {http} from '@/utils/http.js'
import {getPieceQueryFilterString} from "@/utils/methods.js"

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
			http.get(`/Piece/Filtered?start=${start}&quantity=${quantity}${getPieceQueryFilterString(queryFilter)}`)
				.then(response => {
					commit('SET_PIECES', response.data)
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	fetchPiecesFilteredRowCount({commit},{queryFilter}){
		return new Promise((resolve, reject) => {
			http.get(`/Piece/Filtered/RowCount?${getPieceQueryFilterString(queryFilter)}`)
				.then(response => {
					commit('SET_PIECES_FILTERED_ROW_COUNT', response.data)
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	removePiece({commit, state}, {pieceId}){
		return new Promise((resolve, reject) => {
			http.delete(`/Piece/${pieceId}`)
				.then(response => {
					const newPieces = state.pieces
					newPieces.removeIf( i => i.id == pieceId);
					commit('SET_PIECES', newPieces)
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		});
	},

	savePiece({commit, state}, {pieceModel, removeAfterSave}){
		return new Promise((resolve, reject) => {
			http.put(`/Piece`, pieceModel)
				.then(response => {
					
					if(removeAfterSave){
						const newPieces = state.pieces
						newPieces.removeIf( i => i.id == pieceModel.id)
						commit('SET_PIECES', newPieces)
					}
					
					resolve(response.data)
				})
				.catch(err => {
					reject(err)
				})
		});
	},

	removePieces({commit}, pieceIds){
		return new Promise((resolve, reject) => {
			http.delete('/Piece/Multiple', {data: pieceIds})
				.then(response => {
					commit('SET_PIECES', [])
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
