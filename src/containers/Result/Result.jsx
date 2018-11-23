import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { ORIGINAL_IMAGE } from '../../constants/imageTypes'

import { Histogram } from '../../components'
import './style.css'

import CoreDSP from '../../lib/web-dsp/CoreDSP';
const coreDSP = new CoreDSP();

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

let processedImage = null

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

  componentDidMount() {
    const resultCanvas = document.getElementById('image-result-canvas');
    const originalCanvas = document.getElementById('image-original-canvas');
    const { images, filters } = this.props;
    const target = ORIGINAL_IMAGE;
    const originalPixels = images[target].pixels;
    const resultPixels = images[filters.blocks.length].pixels;

    writeImageData(
      resultCanvas,
      resultPixels.data,
      resultPixels.width,
      resultPixels.height
    );

    writeImageData(
      originalCanvas,
      originalPixels.data,
      originalPixels.width,
      originalPixels.height
    );

    this.handleLoading(false);
  }

  render() {
    const { images, filters } = this.props;
    const target = ORIGINAL_IMAGE;
    const { pixels } = images[target];
    processedImage = images[filters.blocks.length].pixels
    return (
      <div style={style.container}>
        <Grid>
        <Grid.Row centered className="images-columns">
        <Grid.Column width={8}  >
            <Message style={style.container}>
              <Message.Header className="centered-text">Imagem Original</Message.Header>
            </Message>
            <Dimmer active={this.state.isLoading}>
              <Loader />
            </Dimmer>
            <canvas id="image-original-canvas" style={style.canvas} />
        </Grid.Column>

        <Grid.Column width={8}>
            <Message style={style.container}>
              <Message.Header className="centered-text">Imagem Processada</Message.Header>
            </Message>
            <Dimmer active={this.state.isLoading}>
              <Loader />
            </Dimmer>
            <canvas id="image-result-canvas" style={style.canvas} />
        </Grid.Column>

        </Grid.Row>

          <Grid.Row centered>
            <Message style={style.container}>
              <Message.Header>Histograma da Imagem Original</Message.Header>
            </Message>
          </Grid.Row>
            <Grid.Row centered className="histogram-container">
            <Histogram pixels={processedImage}/>
            </Grid.Row>
            <Grid.Row centered>
            <Message style={style.container}>
              <Message.Header>Histograma da Imagem Processada</Message.Header>
            </Message>
          </Grid.Row>
            <Grid.Row centered className="histogram-container">
            <Histogram pixels={pixels}/>
            </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ images, filters }) {
  return { images, filters };
}

export default connect(mapStateToProps)(withRouter(Result));
