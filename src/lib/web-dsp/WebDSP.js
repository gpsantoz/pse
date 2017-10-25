export const isImageData = element => {
	return element instanceof ImageData;
};

export const isCanvasImageSource = element => {
	return (
		element instanceof HTMLCanvasElement ||
		element instanceof HTMLImageElement ||
		element instanceof HTMLVideoElement ||
		element instanceof ImageBitmap
	);
};

export const toCanvas = source => {
	console.assert(isCanvasImageSource(source));
	if (source instanceof HTMLCanvasElement) {
		return source;
	}
	var canvas = document.createElement('canvas'); // draw to a temp canvas
	canvas.width = source.videoWidth || source.naturalWidth || source.width;
	canvas.height = source.videoHeight || source.naturalHeight || source.height;
	canvas
		.getContext('2d')
		.drawImage(source, 0, 0, canvas.width, canvas.height);
	return canvas;
};

// Reads image data from ImageData or CanvasImageSource(HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap)
// TODO: maybe CanvasRenderingContext2D and Blob also?
export const readImageData = source => {
	console.assert(source);
	if (isImageData(source)) {
		return source;
	}
	var canvas = toCanvas(source);
	return canvas
		.getContext('2d')
		.getImageData(0, 0, canvas.width, canvas.height);
};

export const writeImageDataToCanvas = (canvas, data, width, height) => {
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');
	var imageData = context.createImageData(width, height);
	imageData.data.set(data);
	context.putImageData(imageData, 0, 0);
	return canvas;
};

// Writes image data into ImageData, HTMLCanvasElement, HTMLImageElement or creates a new canvas and appends it
export const writeImageData = (dest, data, width, height) => {
	console.assert(dest);

	if (typeof dest === 'function') {
		dest(data, width, height);
		return;
	}

	if (isImageData(dest)) {
		console.assert(dest.width === width, dest.height === height);
		dest.data.set(data);
		return;
	}

	console.assert(dest instanceof HTMLElement);
	console.assert(
		!(dest instanceof HTMLVideoElement),
		'Cannot write to video element'
	);
	var canvas =
		dest instanceof HTMLCanvasElement
			? dest
			: document.createElement('canvas');
	writeImageDataToCanvas(canvas, data, width, height);

	if (!(dest instanceof HTMLCanvasElement)) {
		if (dest instanceof HTMLImageElement) {
			dest.src = canvas.toDataURL();
		} else {
			dest.appendChild(canvas);
		}
	}
};

export const createFilter = filter => {
	return function(element, destination) {
		if (element instanceof HTMLCanvasElement) {
			const context = element.getContext('2d');
			const pixels = context.getImageData(
				0,
				0,
				element.width,
				element.height
			);
			pixels.data.set(filter(pixels.data));
			context.putImageData(pixels, 0, 0);
		}
	};
};
