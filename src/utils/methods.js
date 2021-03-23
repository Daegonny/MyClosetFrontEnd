import {baseURL} from '@/utils/http.js'

const charCleaner = {
	' ':'',
    'a':'a',
	'á':'a',
	'à':'a',
	'â':'a',
	'ã':'a',
	'ä':'a',
	'b':'b',
	'c':'c',
	'ç':'c',
	'd':'d',
	'e':'e',
	'é':'e',
	'è':'e',
	'ê':'e',
	'ë':'e',
	'f':'f',
	'g':'g',
	'h':'h',
	'i':'i',
	'í':'i',
	'ì':'i',
	'î':'i',
	'ï':'i',
	'j':'j',
	'k':'k',
	'l':'l',
	'm':'m',
	'n':'n',
	'ñ':'n',
	'o':'o',
	'ó':'o',
	'ò':'o',
	'ô':'o',
	'õ':'o',
	'ö':'o',
	'p':'p',
	'q':'q',
	'r':'r',
	's':'s',
	't':'t',
	'u':'u',
	'ú':'u',
	'ù':'u',
	'û':'u',
	'ü':'u',
	'v':'v',
	'w':'w',
	'x':'x',
	'y':'y',
	'z':'z',
	'0':'0',
	'1':'1',
	'2':'2',
	'3':'3',
	'4':'4',
	'5':'5',
	'6':'6',
	'7':'7',
	'8':'8',
	'9':'9'
}
Array.prototype.removeIf = function(callback) {
    let index = 0;
    while (index < this.length) {
        if (callback(this[index], index)) {
            this.splice(index, 1);
        }
        else {
            ++index;
        }
    }
}

function getFilePath(fullFilePath){
    return `${baseURL}File/${fullFilePath}`;
}

function dateTimeToDateString(dateTime){
	return dateTime != null && dateTime != undefined 
		? dateTime.substring(0, 10)
		: null;
}

function fromBRMoneyToNumber (value){
	value = (''+value).replace("R$ ", "");

	while(value.indexOf(".") >= 0)
		value = value.replace(".", "");

	value = value.replace(",", ".")

	return +value;
}

function getPieceQueryFilterString(queryFilter){ //TODO: Mover para classe de filtros
	let stringRequest = ''

	if(queryFilter.name)
		stringRequest += `&name=${queryFilter.name}`

	if(queryFilter.purchaseDateMin)
		stringRequest += `&purchaseDateMin=${queryFilter.purchaseDateMin}`

	if(queryFilter.purchaseDateMax)
		stringRequest += `&purchaseDateMax=${queryFilter.purchaseDateMax}`

	if(queryFilter.priceMin)
		stringRequest += `&priceMin=${queryFilter.priceMin}`

	if(queryFilter.priceMax)
		stringRequest += `&priceMax=${queryFilter.priceMax}`

	if(queryFilter.tagNames && queryFilter.tagNames.length)
		for (const tagName of queryFilter.tagNames) {
			stringRequest += `&tagNames=${tagName}`
		}

	return `${stringRequest}&mustHaveAllTagNames=${queryFilter.mustHaveAllTagNames}`
}

String.prototype.clear = function () {
	let newValue = ""
	const currentValue = this.toLowerCase().trim()
	for (let i = 0; i < currentValue.length; i++) {
		if(currentValue[i] in charCleaner && currentValue[i] != ' ')
			newValue += charCleaner[currentValue[i]]
	}
	return newValue
}

export {
    getFilePath,
    getPieceQueryFilterString,
    dateTimeToDateString,
    fromBRMoneyToNumber
};