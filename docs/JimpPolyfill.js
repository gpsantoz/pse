function isNodePattern(cb) {
	if (typeof cb === 'undefined') return false;
	if (typeof cb !== 'function') throw new Error('Callback must be a function');
	return true;
}

Jimp.prototype.convolution = function(kernel, edgeHandling, cb) {
	if (typeof edgeHandling === 'function' && typeof cb === 'undefined') {
		cb = edgeHandling;
		edgeHandling = null;
	}
	if (!edgeHandling) edgeHandling = Jimp.EDGE_EXTEND;
	var newData = new Buffer(this.bitmap.data);
	var weight, rSum, gSum, bSum, ri, gi, bi, xi, yi, idxi;
	var kRows = kernel.length;
	var kCols = kernel[0].length;
	var rowEnd = Math.floor(kRows / 2);
	var colEnd = Math.floor(kCols / 2);
	var rowIni = -rowEnd;
	var colIni = -colEnd;
	this.scan(0, 0, this.bitmap.width, this.bitmap.height, function(x, y, idx) {
		rSum = gSum = bSum = 0;
		for (var row = rowIni; row <= rowEnd; row++) {
			for (var col = colIni; col <= colEnd; col++) {
				xi = x + col;
				yi = y + row;
				weight = kernel[row + rowEnd][col + colEnd];
				idxi = this.getPixelIndex(xi, yi, edgeHandling);
				if (idxi === -1) ri = gi = bi = 0;
				else {
					ri = this.bitmap.data[idxi + 0];
					gi = this.bitmap.data[idxi + 1];
					bi = this.bitmap.data[idxi + 2];
				}
				rSum += weight * ri;
				gSum += weight * gi;
				bSum += weight * bi;
			}
		}
		if (rSum < 0) rSum = 0;
		if (gSum < 0) gSum = 0;
		if (bSum < 0) bSum = 0;
		if (rSum > 255) rSum = 255;
		if (gSum > 255) gSum = 255;
		if (bSum > 255) bSum = 255;
		newData[idx + 0] = rSum;
		newData[idx + 1] = gSum;
		newData[idx + 2] = bSum;
	});
	this.bitmap.data = newData;
	if (isNodePattern(cb)) return cb.call(this, null, this);
	else return this;
};
