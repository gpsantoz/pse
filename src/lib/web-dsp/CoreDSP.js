import _ from 'lodash';

export default class CoreDSP {
  constructor() {
    this.mag = 127;
    this.mult = 2;
    this.adj = 4;
    this.grayscale = grayscale;
    this.brighten = brighten;
    this.invert = invert;
    this.noise = noise;
    this.multi_filter = multiFilter;
    this.sunset = sunset;
    this.analog = analog;
    this.emboss = emboss;
    this.sobel = sobel;
    this.conv_filter = convFilter;
    this.blur = blur;
    this.sharpen = sharpen;
    this.strong_sharpen = strongSharpen;
    this.urple = urple;
    this.forest = forest;
    this.romance = romance;
    this.hippo = hippo;
    this.longhorn = longhorn;
    this.underground = underground;
    this.rooster = rooster;
    this.mist = mist;
    this.histogramEqualization = histogramEqualization;
    this.tingle = tingle;
    this.kaleidoscope = tingle;
    this.bacteria = bacteria;
    this.clarity = clarity;
    this.good_morning = goodMorning;
    this.acid = acid;
    this.dewdrops = dewdrops;
    this.destruction = destruction;
    this.hulk = hulk;
    this.ghost = ghost;
    this.twisted = twisted;
    this.sCoreDSPp = twisted;
    this.security = security;
    this.robbery = security;
    this.getHistograms = getHistograms;
    this.erosion = erosion
    this.dilation = dilation
    this.threshold = threshold
    this.interpolation = interpolation
  }
}

let Img = require('image-js');

function getNewHistogramArray() {
  return _.chain(_.range(0, 256, 1))
    .map(elem => {
      return { nivel: `Nível: ${elem}`, Quantidade: 0 };
    })
    .value();
}

function getHistograms(data) {
  const histogram = {
    redArray: getNewHistogramArray(),
    greenArray: getNewHistogramArray(),
    blueArray: getNewHistogramArray(),
  };

  for (let i = 4; i < data.length; i += 4) {
    histogram.redArray[data[i]].Quantidade++;
    histogram.greenArray[data[i + 1]].Quantidade++;
    histogram.blueArray[data[i + 2]].Quantidade++;
  }

  return histogram;
}

//FILTERS

function threshold (pixels,  width, height, threshold){
	let d = pixels;
	for (let i = 0; i < d.length; i += 4) {
		let r = d[i];
		let g = d[i + 1];
		let b = d[i + 2];
		let v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
		d[i] = d[i + 1] = d[i + 2] = v;
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(d)
	return resultImage;
};

function interpolation (data, width, height, parameters){
   const srcImg = new ImageData(width, height)
   srcImg.data.set(data)

   var algorithm = parameters.algorithm == '1' ? 'nearestNeighbor' : 'bilinear'
   let destImg;
   let imagem = new Img.Image(width, height, data);
   console.log('method')
   console.log(parameters)
   console.log(algorithm)
   destImg = imagem.resize({width: width*parseInt(parameters.scale), interpolation: algorithm});
   return destImg;
};

function histogramEqualization (pixels, width, height) {
  var newImageData = new ImageData(pixels, width, height)

  var countR = new Array(),
      countG = new Array(),
      countB = new Array();
  for (var i = 0; i < 256; i++) {
      countR[i] = 0;
      countG[i] = 0;
      countB[i] = 0;
  }
  for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
          var a = ((y*width)+x)*4;
          countR[pixels[a]]++;
          countG[pixels[a+1]]++;
          countB[pixels[a+2]]++;
      }
  }
  var minR = 256,
      minG = 256,
      minB = 256;
  for (var i = 1; i < 256; i++) {
      countR[i] += countR[i-1];
      countG[i] += countG[i-1];
      countB[i] += countB[i-1];

      minR = ((countR[i] != 0) && (countR[i] < minR)) ? countR[i] : minR;
      minG = ((countG[i] != 0) && (countG[i] < minG)) ? countG[i] : minG;
      minB = ((countB[i] != 0) && (countB[i] < minB)) ? countB[i] : minB;
  }
  for (var i = 0; i < 256; i++) {
      countR[i] = ((countR[i]-minR)/((width*height)-minR))*255;
      countG[i] = ((countG[i]-minG)/((width*height)-minG))*255;
      countB[i] = ((countB[i]-minB)/((width*height)-minB))*255;
  }

  for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
          var a = ((y*width)+x)*4;
          newImageData.data[a] = countR[pixels[a]];
          newImageData.data[a+1] = countG[pixels[a+1]];
          newImageData.data[a+2] = countB[pixels[a+2]];
          newImageData.data[a+3] = pixels[a+3];
      }
  }

  return newImageData;
}

function grayscale(data, width, height) {
  for (let i = 0; i < data.length; i += 4) {
    let red = data[i];
    let a = data[i + 3];
    // let brightness = (r*.21+g*.72+b*.07);

    data[i] = red;
    data[i + 1] = red;
    data[i + 2] = red;
    data[i + 3] = a;
  }
  
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
}
function brighten(data, brightness = 25, width, height) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] + brightness > 255 ? 255 : data[i] + brightness;
    data[i + 1] =
      data[i + 1] + brightness > 255 ? 255 : data[i + 1] + brightness;
    data[i + 2] =
      data[i + 2] + brightness > 255 ? 255 : data[i + 2] + brightness;
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
}
function invert(data, width, height) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; //r
    data[i + 1] = 255 - data[i + 1]; //g
    data[i + 2] = 255 - data[i + 2]; //b
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
}

function erosion(data, width, height, parameters) {
  let result;
  let imagem = new Img.Image(width, height, data);
  imagem = imagem.grey();
  result = imagem.erode({kernel: parameters.kernel, iterations: parameters.iterations});
  result = result.rgba8();
  return result
}

function dilation(data, width, height, parameters) {
  let result;
  let imagem = new Img.Image(width, height, data);
  imagem = imagem.grey();
  result = imagem.dilate({kernel: parameters.kernel, iterations: parameters.iterations});
  result = result.rgba8();
  return result;
}

function noise(data, width, height) {
  let random;
  for (let i = 0; i < data.length; i += 4) {
    random = (Math.random() - 0.5) * 70;
    data[i] = data[i] + random; //r
    data[i + 1] = data[i + 1] + random; //g
    data[i + 2] = data[i + 2] + random; //b
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
}
function multiFilter(data, width, height, filterType, mag, mult, adj) {
  for (let i = 0; i < data.length; i += filterType) {
    if (i % 4 !== 3) {
      data[i] = mag + mult * data[i] - data[i + adj] - data[i + width * 4];
    }
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
} // output needs to be clamped to match C++ filters

//to bind arguments in the right order
function bindLastArgs(func, ...boundArgs) {
  return function(...baseArgs) {
    return func(...baseArgs, ...boundArgs);
  };
}

const sunset = bindLastArgs(multiFilter, 4, 127, 2, 4);
const analog = bindLastArgs(multiFilter, 7, 127, 2, 4);
const emboss = bindLastArgs(multiFilter, 1, 127, 2, 4);
const urple = bindLastArgs(multiFilter, 2, 127, 2, 4);
const forest = bindLastArgs(multiFilter, 5, 127, 3, 1);
const romance = bindLastArgs(multiFilter, 8, 127, 3, 2);
const hippo = bindLastArgs(multiFilter, 2, 80, 3, 2);
const longhorn = bindLastArgs(multiFilter, 2, 27, 3, 2);
const underground = bindLastArgs(multiFilter, 8, 127, 1, 4);
const rooster = bindLastArgs(multiFilter, 8, 60, 1, 4);
const mist = bindLastArgs(multiFilter, 1, 127, 1, 1);
const tingle = bindLastArgs(multiFilter, 1, 124, 4, 3);
const bacteria = bindLastArgs(multiFilter, 4, 0, 2, 4);
const hulk = bindLastArgs(multiFilter, 2, 10, 2, 4);
const ghost = bindLastArgs(multiFilter, 1, 5, 2, 4);
const twisted = bindLastArgs(multiFilter, 1, 40, 2, 3);
const security = bindLastArgs(multiFilter, 1, 120, 1, 0);

const convFilter = (
  data,
  width,
  height,
  kernel,
  divisor,
  bias = 0,
  count = 1
) => {
  const w = kernel[0].length;
  const h = kernel.length;
  const half = Math.floor(h / 2);
  for (let i = 0; i < count; i += 1) {
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const px = (y * width + x) * 4; // pixel index
        let r = 0,
          g = 0,
          b = 0;

        for (let cy = 0; cy < h; ++cy) {
          for (let cx = 0; cx < w; ++cx) {
            const cpx = ((y + (cy - half)) * width + (x + (cx - half))) * 4;
            r += data[cpx + 0] * kernel[cy][cx];
            g += data[cpx + 1] * kernel[cy][cx];
            b += data[cpx + 2] * kernel[cy][cx];
          }
        }

        data[px + 0] = 1 / divisor * r + bias;
        data[px + 1] = 1 / divisor * g + bias;
        data[px + 2] = 1 / divisor * b + bias;
      }
    }
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
};
const blur = bindLastArgs(
  convFilter,
  [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  9,
  0,
  3
);
const sharpen = bindLastArgs(
  convFilter,
  [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
  2
);
const strongSharpen = bindLastArgs(
  convFilter,
  [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
  1
);
const clarity = bindLastArgs(
  convFilter,
  [[1, -1, -1], [-1, 8, -1], [-1, -1, 1]],
  3
);
const goodMorning = bindLastArgs(
  convFilter,
  [[-1, -1, 1], [-1, 14, -1], [1, -1, -1]],
  3
);
const acid = bindLastArgs(
  convFilter,
  [[4, -1, -1], [-1, 4, -1], [0, -1, 4]],
  3
);
const dewdrops = bindLastArgs(
  convFilter,
  [[0, 0, -1], [-1, 12, -1], [0, -1, -1]],
  2
);
const destruction = bindLastArgs(
  convFilter,
  [[-1, -1, 4], [-1, 9, -1], [0, -1, 0]],
  2
);
const sobel = (data, width, height, invert = false) => {
  let wid = width;
  let hei = height;
  let grayData = new Int32Array(wid * hei);

  function getPixel(x, y) {
    if (x < 0 || y < 0) {
      return 0;
    }
    if (x >= wid || y >= hei) {
      return 0;
    }
    return grayData[wid * y + x];
  }
  //Grayscale
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let goffset = (wid * y + x) << 2; //multiply by 4
      let r = data[goffset];
      let g = data[goffset + 1];
      let b = data[goffset + 2];
      let avg = (r >> 2) + (g >> 1) + (b >> 3);
      grayData[wid * y + x] = avg;
      let doffset = (wid * y + x) << 2;
      data[doffset] = avg;
      data[doffset + 1] = avg;
      data[doffset + 2] = avg;
      data[doffset + 3] = 255;
    }
  }
  //Sobel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let newX;
      let newY;
      if (x >= width - 1 || y >= height - 1) {
        newX = 0;
        newY = 0;
      } else {
        //sobel Filter use surrounding pixels and matrix multiply by sobel
        newX =
          -1 * getPixel(x - 1, y - 1) +
          getPixel(x + 1, y - 1) +
          -1 * (getPixel(x - 1, y) << 1) +
          (getPixel(x + 1, y) << 1) +
          -1 * getPixel(x - 1, y + 1) +
          getPixel(x + 1, y + 1);
        newY =
          -1 * getPixel(x - 1, y - 1) +
          -1 * (getPixel(x, y - 1) << 1) +
          -1 * getPixel(x + 1, y - 1) +
          getPixel(x - 1, y + 1) +
          (getPixel(x, y + 1) << 1) +
          getPixel(x + 1, y + 1);
        let mag = Math.floor(Math.sqrt(newX * newX + newY * newY) >>> 0);
        if (mag > 255) {
          mag = 255;
        }
        if (invert) {
          mag = 255 - mag;
        }
        data[(wid * y + x) * 4] = mag;
        data[(wid * y + x) * 4 + 1] = mag;
        data[(wid * y + x) * 4 + 2] = mag;
        data[(wid * y + x) * 4 + 3] = 255;
      }
    }
  }
  const resultImage = new ImageData(width, height)
  resultImage.data.set(data)
	return resultImage;
};
