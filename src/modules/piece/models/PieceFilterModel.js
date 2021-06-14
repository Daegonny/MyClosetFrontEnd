export default class PieceFilterModel {
	constructor(){
        this.name = null
		this.purchaseDateMin = null
		this.purchaseDateMax = null
		this.priceMin = null,
		this.priceMax = null,
		this.tagNames = []
		this.mustHaveAllTagNames = false
	}

	queryString = function (){
		let stringRequest = ''

		if(this.name)
			stringRequest += `&name=${this.name}`

		if(this.purchaseDateMin)
			stringRequest += `&purchaseDateMin=${this.purchaseDateMin}`

		if(this.purchaseDateMax)
			stringRequest += `&purchaseDateMax=${this.purchaseDateMax}`

		if(this.priceMin)
			stringRequest += `&priceMin=${this.priceMin}`

		if(this.priceMax)
			stringRequest += `&priceMax=${this.priceMax}`

		if(this.tagNames && this.tagNames.length)
			for (const tagName of this.tagNames) {
				stringRequest += `&tagNames=${tagName}`
			}

		return `${stringRequest}&mustHaveAllTagNames=${this.mustHaveAllTagNames}`
	}
}