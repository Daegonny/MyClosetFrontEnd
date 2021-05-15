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
