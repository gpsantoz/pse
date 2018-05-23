import _ from 'lodash';
import {
  NEAREST_NEIGHBOR_INT,
  BICUBIC_INT,
  BILIENEAR_NEIGHBOR_INT,
} from '../../actions/types';
import CoreDSP from '../../lib/web-dsp/CoreDSP';
const coreDSP = new CoreDSP();

export const handleFilter = (filter, pixels) => {
  const { width, height } = pixels;
  switch (filter) {
    case _.snakeCase(NEAREST_NEIGHBOR_INT):
      pixels.data.set(coreDSP.nearestNeighborInt(pixels.data));
      break;
    case _.snakeCase(BICUBIC_INT):
      pixels.data.set(coreDSP.bicubicInt(pixels.data));
      break;
    case _.snakeCase(BILIENEAR_NEIGHBOR_INT):
      pixels.data.set(coreDSP.bilinearInt(pixels.data));
      break;
    case 'grayscale':
      pixels.data.set(coreDSP.grayscale(pixels.data));
      break;
    case 'brighten':
      pixels.data.set(coreDSP.brighten(pixels.data));
      break;
    case 'invert':
      pixels.data.set(coreDSP.invert(pixels.data));
      break;
    case 'noise':
      pixels.data.set(coreDSP.noise(pixels.data));
      break;
    case 'sunset':
      pixels.data.set(coreDSP.sunset(pixels.data, width));
      break;
    case 'analog':
      pixels.data.set(coreDSP.analog(pixels.data, width));
      break;
    case 'emboss':
      pixels.data.set(coreDSP.emboss(pixels.data, width));
      break;
    case 'sobel':
      pixels.data.set(coreDSP.sobel(pixels.data, width, height));
      break;
    case 'sobel_invertido':
      pixels.data.set(coreDSP.sobel(pixels.data, width, height, true));
      break;
    case 'gaussian_blur':
      pixels.data.set(coreDSP.blur(pixels.data, width, height));
      break;
    case 'sharpen':
      pixels.data.set(coreDSP.sharpen(pixels.data, width, height));
      break;
    case 'uber_sharpen':
      pixels.data.set(coreDSP.strong_sharpen(pixels.data, width, height));
      break;
    case 'clarity':
      pixels.data.set(coreDSP.clarity(pixels.data, width, height));
      break;
    case 'good_morning':
      pixels.data.set(coreDSP.good_morning(pixels.data, width, height));
      break;
    case 'acid':
      pixels.data.set(coreDSP.acid(pixels.data, width, height));
      break;
    case 'urple':
      pixels.data.set(coreDSP.urple(pixels.data, width));
      break;
    case 'forest':
      pixels.data.set(coreDSP.forest(pixels.data, width));
      break;
    case 'romance':
      pixels.data.set(coreDSP.romance(pixels.data, width));
      break;
    case 'hippo':
      pixels.data.set(coreDSP.hippo(pixels.data, width));
      break;
    case 'longhorn':
      pixels.data.set(coreDSP.longhorn(pixels.data, width));
      break;
    case 'underground':
      pixels.data.set(coreDSP.underground(pixels.data, width));
      break;
    case 'rooster':
      pixels.data.set(coreDSP.rooster(pixels.data, width));
      break;
    case 'mist':
      pixels.data.set(coreDSP.mist(pixels.data, width));
      break;
    case 'kaleidoscope':
      pixels.data.set(coreDSP.kaleidoscope(pixels.data, width));
      break;
    case 'bacteria':
      pixels.data.set(coreDSP.bacteria(pixels.data, width));
      break;
    case 'dewdrops':
      pixels.data.set(coreDSP.dewdrops(pixels.data, width, height));
      break;
    case 'color_destruction':
      pixels.data.set(coreDSP.destruction(pixels.data, width, height));
      break;
    case 'hulk_edge':
      pixels.data.set(coreDSP.hulk(pixels.data, width));
      break;
    case 'ghost':
      pixels.data.set(coreDSP.ghost(pixels.data, width));
      break;
    case 'twisted':
      pixels.data.set(coreDSP.twisted(pixels.data, width));
      break;
    case 'security':
      pixels.data.set(coreDSP.security(pixels.data, width));
      break;
    default:
      break;
  }
};
