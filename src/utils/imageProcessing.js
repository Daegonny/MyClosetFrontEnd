
async function resize(input){
	const image = document.createElement("img");
	image.src = URL.createObjectURL(input);
	const {height, width} = await getImageDimensions(image)
	const MAX_WIDTH = 800; //TODO: RECEBER DO BACKEND
	const MAX_HEIGHT = 800;
	const blob = height > width
		? await compressImage(image, MAX_HEIGHT / height, width, height)
		: await compressImage(image, MAX_WIDTH / width, width, height);
	return blob
}

function compressImage(image, scale, initalWidth, initalHeight){
	return new Promise((resolve) => {
		const canvas = document.createElement("canvas");

		canvas.width = scale * initalWidth;
		canvas.height = scale * initalHeight;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		
		ctx.canvas.toBlob((blob) => {
			resolve(blob);
		}, "image/jpeg"); 
	}); 
}

function getImageDimensions(image){
	return new Promise((resolve) => {
		image.onload = function(){
			const width = this.width;
			const height = this.height;
			resolve({height, width});
		}
	});
}

export {
	resize
};