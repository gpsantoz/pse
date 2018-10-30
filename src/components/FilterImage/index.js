import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { handleFilter } from '../shared/handleFilter';
import NavigationButtons from '../shared/NavigationButtons';
import { nearest, bicubic, bilinear } from '../shared/handleScaling';
import {
  NEAREST_NEIGHBOR_INT,
  BICUBIC_INT,
  BILIENEAR_NEIGHBOR_INT,
} from '../../constants/actionTypes';

const style = {
  container: {
    marginTop: '20px',
    width: '100%',
  },
  canvas: {
    maxWidth: '100%',
    maxHeight: '500px',
    width: 'auto',
    height: 'auto',
  },
};

class FilterImage extends React.Component {
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
    const { images, filters } = this.props;
    const { target, id } = this.props.match.params;
    const actions = filters[target];
    const { blocks } = filters;

    if (
      images[target] &&
      !!canvas &&
      !!actions &&
      actions[id].type == 'ver_imagem'
    ) {
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
    }

    this.handleLoading(false);
  }

  render() {
    console.log(this.props)
    return (
      <div style={style.container}>
        <Grid>
          <Grid.Row>
            <Message style={style.container}>
              <Message.Header>Filtros</Message.Header>
              <p>
                Essa imagem possui todos os filtros, anteriores ao clicado,
                aplicados. <br />
                Caso deseje, você pode voltar, excluir o filtro ou realizar o
                download da imagem. <br />
                O botão "Histograma" irá exibir os Histogramas R, G e B da
                imagem filtrada e da imagem original.
              </p>
            </Message>
          </Grid.Row>
          <NavigationButtons
            target={this.props.match.params.target}
            id={this.props.match.params.id}
          />
          <Grid.Row>
            <Dimmer active={this.state.isLoading}>
              <Loader />
            </Dimmer>
            <canvas id="image-canvas" style={style.canvas} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ images, filters }) {
  return { images, filters };
}

export default connect(mapStateToProps)(withRouter(FilterImage));
