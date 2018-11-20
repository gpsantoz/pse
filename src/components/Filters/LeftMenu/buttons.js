import {
  CUSTOM_FILTER,
  NEAREST_NEIGHBOR_INT,
  BILIENEAR_NEIGHBOR_INT,
  MORPHOLOGICAL_FILTERING,
} from '../../../constants/actionTypes';

import {
  EROSION,
  DILATION,
  THRESHOLD,
  BICUBIC_INTERPOLATION
} from '../../../constants/filtersTypes';

export default [
  {
    label: 'Processamento',
    buttons: [
      {
        color: 'pink',
        label: MORPHOLOGICAL_FILTERING,
      },
      {
        color: 'pink',
        label: THRESHOLD,
        parameters: {
          t: 128
        }
      },
      {
        color: 'pink',
        label: EROSION,
        parameters: {
          kernel:  [[0, 1, 0],
                   [1, 1, 1],
                   [0, 1, 0]],
          iterations: 4
        }
      },
      {
        color: 'pink',
        label: DILATION,
        parameters: {
          kernel:  [[0, 1, 0],
                   [1, 1, 1],
                    [0, 1, 0]],
          iterations: 4
        }
      },
      {
        color: 'pink',
        label: BICUBIC_INTERPOLATION,
        parameters: {
          options: {
            width: 1024
          }
        }
      },
      {
        color: 'orange',
        label: 'Histogram Equalization'
      },
      // {
      //   color: 'orange',
      //   label: NEAREST_NEIGHBOR_INT,
      // },
      // {
      //   color: 'orange',
      //   label: BICUBIC_INT,
      // },
      // {
      //   color: 'orange',
      //   label: BILIENEAR_NEIGHBOR_INT,
      // },
      {
        color: 'yellow',
        label: 'Grayscale',
      },
      {
        color: 'yellow',
        label: 'Brighten',
      },
      {
        color: 'yellow',
        label: 'Invert',
      },
      {
        color: 'yellow',
        label: 'Noise',
      },
      {
        color: 'yellow',
        label: 'Sunset',
      },
      {
        color: 'yellow',
        label: 'Analog',
      },
      {
        color: 'yellow',
        label: 'Emboss',
      },
      {
        color: 'yellow',
        label: 'Sobel',
      },
      {
        color: 'yellow',
        label: 'Sobel Invertido',
      },
      {
        color: 'yellow',
        label: 'Gaussian Blur',
      },
      {
        color: 'yellow',
        label: 'Sharpen',
      },
      {
        color: 'yellow',
        label: 'Uber Sharpen',
      },
      {
        color: 'yellow',
        label: 'Urple',
      },
      {
        color: 'yellow',
        label: 'Forest',
      },
      {
        color: 'yellow',
        label: 'Romance',
      },
      {
        color: 'yellow',
        label: 'Hippo',
      },
      {
        color: 'yellow',
        label: 'Longhorn',
      },
      {
        color: 'yellow',
        label: 'Underground',
      },
      {
        color: 'yellow',
        label: 'Rooster',
      },
      {
        color: 'yellow',
        label: 'Mist',
      },
      {
        color: 'yellow',
        label: 'Kaleidoscope',
      },
      {
        color: 'yellow',
        label: 'Bacteria',
      },
      {
        color: 'yellow',
        label: 'Clarity',
      },
      {
        color: 'yellow',
        label: 'Good Morning',
      },
      {
        color: 'yellow',
        label: 'Acid',
      },
      {
        color: 'yellow',
        label: 'Dewdrops',
      },
      {
        color: 'yellow',
        label: 'Color Destruction',
      },
      {
        color: 'yellow',
        label: 'Hulk Edge',
      },
      {
        color: 'yellow',
        label: 'Ghost',
      },
      {
        color: 'yellow',
        label: 'Twisted',
      },
      {
        color: 'yellow',
        label: 'Security',
      },
    ],
  },
];
