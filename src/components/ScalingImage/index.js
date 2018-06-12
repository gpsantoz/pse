import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';
import NavigationButtons from '../shared/NavigationButtons';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { bicubic, bilinear } from '../shared/handleScaling';

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

class ScalingImage extends React.Component {
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
    const canvas = document.getElementById('image-canvas');
    const { images } = this.props;
    const { target } = this.props.match.params;
    const { pixels } = images[target];
    const image = new ImageData(pixels.width, pixels.height);

    image.data.set(pixels.data);

    canvas.width = image.width;
    canvas.height = image.height;

    writeImageData(canvas, image.data, image.width, image.height);

    this.handleLoading(false);
  }

  render() {
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

function mapStateToProps({ images, imageActions }) {
  return { images, imageActions };
}

export default connect(mapStateToProps)(withRouter(ScalingImage));
