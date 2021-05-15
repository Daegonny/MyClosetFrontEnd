export default class PieceModel {
	constructor(piece){
		this.id = piece.id;
		this.name = piece.name;
		this.price = this.isPriceValid(piece.price) ? parseFloat(piece.price) : null;
		this.purchase = piece.purchase;
		this.tagNames = piece.tags
		this.fullFilePath = piece.fullFilePath
		this.isSelected = false
	}

	isPriceValid = function (priece){
		return priece != undefined && priece != null
	}
}