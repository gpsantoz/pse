import _ from 'lodash';

const tmpCtx = document.createElement('canvas').getContext('2d');

const getPixels = img => {
	let c, ctx;
	if (img.getContext) {
		c = img;
		try {
			ctx = c.getContext('2d');
		} catch (e) {}
	}
	if (!ctx) {
		c = getCanvas(img.width, img.height);
		ctx = c.getContext('2d');
		ctx.drawImage(img, 0, 0);
	}
	return ctx.getImageData(0, 0, c.width, c.height);
};

const getCanvas = (w, h) => {
	let c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	return c;
};

const createImageData = (w, h) => {
	return tmpCtx.createImageData(w, h);
};

const createCanvas = filterName => {
	let figureArea = document.getElementById(_figureAreaId);
	let canvas = document.createElement('CANVAS');
	canvas.id = filterName;
	canvas.style.display = 'none';
	figureArea.appendChild(canvas);
	return canvas;
};

const deleteCanvas = filterName => {
	let figureArea = document.getElementById(_figureAreaId);
	let canvas = document.getElementById(filterName);
	figureArea.removeChild(canvas);
};

const runFilter = (id, filter, arg1, arg2, arg3) => {
	let img = document.getElementById(_originalImageId);
	let c = document.getElementById(id);
	if (!c) c = createCanvas(id);
	let s = c.previousSibling.style;
	let b = document.getElementById(`${id}-btn`);
	if (b.originalText == null) {
		b.originalText = b.textContent;
	}
	if (s.display === 'none') {
		s.display = 'inline';
		deleteCanvas(id);
		b.textContent = b.originalText;
	} else {
		let idata = filterImage(filter, img, arg1, arg2, arg3);
		c.width = idata.width;
		c.height = idata.height;
		let ctx = c.getContext('2d');
		ctx.putImageData(idata, 0, 0);
		s.display = 'none';
		c.style.display = 'inline';
		b.textContent = 'Desfazer';
	}
};

const filterImage = (filter, image, ...var_args) => {
	let args = [getPixels(image), ...var_args];
	return filter(...args);
};

const getIntensity = (r, g, b) => {
	// CIE luminance for the RGB
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const grayscale = pixels => {
	let d = pixels.data;
	for (let i = 0; i < d.length; i += 4) {
		let r = d[i];
		let g = d[i + 1];
		let b = d[i + 2];
		d[i] = d[i + 1] = d[i + 2] = getIntensity(r, g, b);
	}
	return pixels;
};

const brightness = (pixels, adjustment) => {
	let d = pixels.data;
	for (let i = 0; i < d.length; i += 4) {
		d[i] += adjustment;
		d[i + 1] += adjustment;
		d[i + 2] += adjustment;
	}
	return pixels;
};

const invert = pixels => {
	let d = pixels.data;
	for (let i = 0; i < d.length; i += 4) {
		d[i] = 255 - d[i];
		d[i + 1] = 255 - d[i + 1];
		d[i + 2] = 255 - d[i + 2];
	}
	return pixels;
};

const threshold = (pixels, threshold) => {
	let d = pixels.data;
	for (let i = 0; i < d.length; i += 4) {
		let r = d[i];
		let g = d[i + 1];
		let b = d[i + 2];
		let v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
		d[i] = d[i + 1] = d[i + 2] = v;
	}
	return pixels;
};

const convolute = (pixels, weights, opaque) => {
	var side = Math.round(Math.sqrt(weights.length));
	var halfSide = Math.floor(side / 2);

	var src = pixels.data;
	var sw = pixels.width;
	var sh = pixels.height;

	var w = sw;
	var h = sh;
	var output = createImageData(w, h);
	var dst = output.data;

	var alphaFac = opaque ? 1 : 0;

	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			var sy = y;
			var sx = x;
			var dstOff = (y * w + x) * 4;
			var r = 0,
				g = 0,
				b = 0,
				a = 0;
			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {
					var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
					var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
					var srcOff = (scy * sw + scx) * 4;
					var wt = weights[cy * side + cx];
					r += src[srcOff] * wt;
					g += src[srcOff + 1] * wt;
					b += src[srcOff + 2] * wt;
					a += src[srcOff + 3] * wt;
				}
			}
			dst[dstOff] = r;
			dst[dstOff + 1] = g;
			dst[dstOff + 2] = b;
			dst[dstOff + 3] = a + alphaFac * (255 - a);
		}
	}
	return output;
};

const convoluteFloat32 = (pixels, weights, opaque) => {
	var side = Math.round(Math.sqrt(weights.length));
	var halfSide = Math.floor(side / 2);

	var src = pixels.data;
	var sw = pixels.width;
	var sh = pixels.height;

	var w = sw;
	var h = sh;
	var output = {
		width: w,
		height: h,
		data: new Float32Array(w * h * 4)
	};
	var dst = output.data;

	var alphaFac = opaque ? 1 : 0;

	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			var sy = y;
			var sx = x;
			var dstOff = (y * w + x) * 4;
			var r = 0,
				g = 0,
				b = 0,
				a = 0;
			for (var cy = 0; cy < side; cy++) {
				for (var cx = 0; cx < side; cx++) {
					var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
					var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
					var srcOff = (scy * sw + scx) * 4;
					var wt = weights[cy * side + cx];
					r += src[srcOff] * wt;
					g += src[srcOff + 1] * wt;
					b += src[srcOff + 2] * wt;
					a += src[srcOff + 3] * wt;
				}
			}
			dst[dstOff] = r;
			dst[dstOff + 1] = g;
			dst[dstOff + 2] = b;
			dst[dstOff + 3] = a + alphaFac * (255 - a);
		}
	}
	return output;
};

const getNewHistogramArray = () => {
	return _.chain(_.range(0, 256, 1))
		.map(elem => {
			return { nivel: `Nível: ${elem}`, Quantidade: 0 };
		})
		.value();
};

let _figureAreaId;
let _originalImageId;

class CIM {
	constructor(figureAreaId, originalImageId) {
		//eslint-disable-next-line
		if (!window.Float32Array) Float32Array = Array;
		_figureAreaId = figureAreaId;
		_originalImageId = originalImageId;
	}

	runPipelineFilter() {
		let canvas = document.getElementById('test-canvas');
		// eslint-disable-next-line
		const ctx = canvas.getContext('2d');
		//ctx.putImageData(grayscale(getPixels(canvas)), 0, 0);
		//ctx.putImageData(invert(getPixels(canvas)), 0, 0);
		//ctx.putImageData(brightness(getPixels(canvas), 40), 0, 0);
	}

	getHistogram() {
		const pixels = getPixels(document.getElementById('test-canvas'));
		let d = pixels.data;

		let redArray = getNewHistogramArray();
		let greenArray = getNewHistogramArray();
		let blueArray = getNewHistogramArray();

		for (let i = 4; i < d.length; i += 4) {
			redArray[d[i]].Quantidade++;
			greenArray[d[i + 1]].Quantidade++;
			blueArray[d[i + 2]].Quantidade++;
		}
		return { redArray, greenArray, blueArray };
	}

	runGrayscale() {
		runFilter('grayscale', grayscale);
	}

	runInvert() {
		runFilter('invert', invert);
	}

	runBrightness() {
		runFilter('brightness', brightness, 40);
	}

	runThreshold() {
		runFilter('threshold', threshold, 128);
	}

	runSharpen() {
		runFilter('sharpen', convolute, [0, -1, 0, -1, 5, -1, 0, -1, 0]);
	}

	runBlurC() {
		runFilter('blurC', convolute, [
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9,
			1 / 9
		]);
	}

	runSobel() {
		runFilter('sobel', function(px) {
			px = grayscale(px);
			var vertical = convoluteFloat32(px, [-1, -2, -1, 0, 0, 0, 1, 2, 1]);
			var horizontal = convoluteFloat32(px, [
				-1,
				0,
				1,
				-2,
				0,
				2,
				-1,
				0,
				1
			]);
			var id = createImageData(vertical.width, vertical.height);
			for (var i = 0; i < id.data.length; i += 4) {
				var v = Math.abs(vertical.data[i]);
				id.data[i] = v;
				var h = Math.abs(horizontal.data[i]);
				id.data[i + 1] = h;
				id.data[i + 2] = (v + h) / 4;
				id.data[i + 3] = 255;
			}
			return id;
		});
	}
}

export default CIM;
