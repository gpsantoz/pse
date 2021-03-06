import CoreDSP from '../../lib/web-dsp/CoreDSP';
const coreDSP = new CoreDSP();

export const handleFilter = (filter, pixels) => {
  console.log(filter);
  const { width, height, data } = pixels;
  let result;
  switch (filter.type) {
    case 'yolo':
      result = coreDSP.yolo(data, width, height, filter.parameters );
    break;
    case 'erosion':
      result = coreDSP.erosion(data, width, height, filter.parameters );
      break;
    case 'dilation':
      result = coreDSP.dilation(data, width, height, filter.parameters );
      break;
    case 'threshold':
      result = coreDSP.threshold(data,  width, height, filter.parameters.t );
      break;
    case 'grayscale':
      result = coreDSP.grayscale(pixels.data,  width, height);
      break;
    case 'interpolation':
      result = coreDSP.interpolation(pixels.data, width, height, filter.parameters)
      break;
    case 'median':
      result = coreDSP.median(pixels.data, width, height, filter.parameters)
      break;
    case 'gaussian':
      result = coreDSP.gaussian(pixels.data, width, height, filter.parameters)
      break;
    case 'substract_image':
        const srcImg = new ImageData(width, height)
      srcImg.data.set(data)
      result = srcImg
      break;
    case 'brighten':
      result = coreDSP.brighten(pixels.data, 25, width, height);
      break;
    case 'histogram_equalization':
      result = coreDSP.histogramEqualization(pixels.data, width, height);
      break;
    case 'invert':
        result = coreDSP.invert(pixels.data,  width, height);
      break;
    case 'noise':
        result = coreDSP.noise(pixels.data,  width, height);
      break;
    case 'sunset':
        result = coreDSP.sunset(pixels.data, width, height);
      break;
    case 'analog':
        result = coreDSP.analog(pixels.data, width, height);
      break;
    case 'emboss':
        result = coreDSP.emboss(pixels.data, width, height);
      break;
    case 'sobel':
        result = coreDSP.sobel(pixels.data, width, height);
      break;
    case 'sobel_invertido':
        result = coreDSP.sobel(pixels.data, width, height, true);
      break;
    case 'gaussian_blur':
        result = coreDSP.blur(pixels.data, width, height);
      break;
    case 'sharpen':
        result = coreDSP.sharpen(pixels.data, width, height);
      break;
    case 'uber_sharpen':
        result = coreDSP.strong_sharpen(pixels.data, width, height);
      break;
    case 'clarity':
        result = coreDSP.clarity(pixels.data, width, height);
      break;
    case 'good_morning':
        result = coreDSP.good_morning(pixels.data, width, height);
      break;
    case 'acid':
        result = coreDSP.acid(pixels.data, width, height);
      break;
    case 'urple':
        result = coreDSP.urple(pixels.data,  width, height);
      break;
    case 'forest':
        result = coreDSP.forest(pixels.data,  width, height);
      break;
    case 'romance':
        result = coreDSP.romance(pixels.data,  width, height);
      break;
    case 'hippo':
        result = coreDSP.hippo(pixels.data,  width, height);
      break;
    case 'longhorn':
        result = coreDSP.longhorn(pixels.data,  width, height);
      break;
    case 'underground':
        result = coreDSP.underground(pixels.data,  width, height);
      break;
    case 'rooster':
        result = coreDSP.rooster(pixels.data, width, height);
      break;
    case 'mist':
        result = coreDSP.mist(pixels.data, width, height);
      break;
    case 'kaleidoscope':
        result = coreDSP.kaleidoscope(pixels.data, width, height);
      break;
    case 'bacteria':
        result = coreDSP.bacteria(pixels.data, width, height);
      break;
    case 'dewdrops':
        result = coreDSP.dewdrops(pixels.data, width, height);
      break;
    case 'color_destruction':
        result = coreDSP.destruction(pixels.data, width, height);
      break;
    case 'hulk_edge':
        result = coreDSP.hulk(pixels.data, width, height);
      break;
    case 'ghost':
        result = coreDSP.ghost(pixels.data, width, height);
      break;
    case 'twisted':
        result = coreDSP.twisted(pixels.data, width, height);
      break;
    case 'security':
        result = coreDSP.security(pixels.data, width, height);
      break;
    default:
      break;
  }

  const imgResult = new ImageData(result.width || width, result.height || height)
  imgResult.data.set(result.data)
  return imgResult
};
