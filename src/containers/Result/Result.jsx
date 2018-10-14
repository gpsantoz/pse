import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { handleFilter } from '../../components/shared/handleFilter';
import NavigationButtons from '../../components/shared/NavigationButtons';
import { nearest, bicubic, bilinear } from '../../components/shared/handleScaling';
import {
  NEAREST_NEIGHBOR_INT,
  BICUBIC_INT,
  BILIENEAR_NEIGHBOR_INT,
} from '../../actions/types';

import { Histogram } from '../'

const style = {
  container: {
    marginTop: '20px'
  },
  canvas: {
    maxWidth: '100%',
    maxHeight: '500px',
    width: 'auto',
    height: 'auto',
  },
};

class Result extends React.Component {
  state = {
    isLoading: true,
  };
  renderNavigationButton(color, label, handleClick) {
    return (
      <Grid.Column>
        <Button
          inverted
          color={color}
          onClick={handleClick}
          style={style.navigationButton}
        >
          {label}
        </Button>
      </Grid.Column>
    );
  }

  handleLoading = isLoading => {
    this.setState({ isLoading });
  };

  handleScaling = (type, loadCanvas, pixels) => {
    // setup source image
    const sourceImage = new ImageData(pixels.width, pixels.height);

    sourceImage.data.set(pixels.data);

    loadCanvas.width = sourceImage.width;
    loadCanvas.height = sourceImage.height;

    // setup dest image
    let scale = 5.0;
    let newWidth = Math.ceil(sourceImage.width * scale);
    let newHeight = Math.ceil(sourceImage.height * scale);

    const destImage = new ImageData(newWidth, newHeight);

    if (type) {
      switch (type) {
        case _.snakeCase(NEAREST_NEIGHBOR_INT):
          nearest(sourceImage, destImage, scale);
          break;
        case _.snakeCase(BICUBIC_INT):
          bicubic(sourceImage, destImage, scale);
          break;
        case _.snakeCase(BILIENEAR_NEIGHBOR_INT):
          bilinear(sourceImage, destImage, scale);
          break;
        default:
          return pixels;
      }
    }

    return destImage;
  };

  componentDidMount() {
    const canvas = document.getElementById('image-canvas');
    const { images, imageActions } = this.props;
    const target = 'fluxo_1';
    const { id } = this.props.match.params;
    const actions = imageActions[target];
    const { blocks } = imageActions;

    //ver imagem
      const { pixels } = images[target];
      var filterPixels = pixels;

      _.forEach(blocks, block => {
        handleFilter(block, filterPixels);
        filterPixels = this.handleScaling(block, canvas, filterPixels);
      });

      canvas.width = filterPixels.width;
      canvas.height = filterPixels.height;

      writeImageData(
        canvas,
        filterPixels.data,
        filterPixels.width,
        filterPixels.height
      );

      this.handleLoading(false);
  }

  render() {
    return (
      <div style={style.container}>
        <Grid>
          
          <Grid.Row centered>
            <Message style={style.container}>
              <Message.Header>Imagem Processada</Message.Header>
            </Message>
          </Grid.Row>
          
          <Grid.Row centered>
            <Dimmer active={this.state.isLoading}>
              <Loader />
            </Dimmer>
            <canvas id="image-canvas" style={style.canvas} />
          </Grid.Row>

           <Grid.Row centered>
            <Message style={style.container}>
              <Message.Header>Histograma da Imagem Processada</Message.Header>
            </Message>
          </Grid.Row>

            <Grid.Row centered>
            <Histogram />
          </Grid.Row>


          {/* <NavigationButtons
            target='AREA_1'
            id={this.props.match.params.id}
          /> */}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ images, imageActions }) {
  return { images, imageActions };
}

export default connect(mapStateToProps)(withRouter(Result));
