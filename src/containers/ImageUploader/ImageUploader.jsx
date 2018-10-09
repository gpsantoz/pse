import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Grid, Message } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import './style.css';

const style = {
  canvasColumn: {
  },
  inputButton: {
    marginTop: '10px',
  },
  navigationButton: {
    minWidth: '120px',
  },
  container: {
    
  },
};

class ImageUploader extends React.Component {
  state = {
    image: {
      hasImage: false,
      visibility: 'hidden',
    },
  };

  componentDidMount() {
    const canvas = document.getElementById('image-canvas');
    const { images } = this.props;
    const target = 'fluxo_1';
    if (images[target] && !!canvas) {
      const { pixels } = images[target];
      canvas.width = pixels.width;
      canvas.height = pixels.height;
      writeImageData(canvas, pixels.data, pixels.width, pixels.height);

      this.setState({
        image: {
          hasImage: true,
          visibility: 'inherit',
        },
      });
    }
  }

  handleFileUpload(e) {
    if (!e || !e.target || !e.target.files.length) {
      return;
    }
    const image = new Image();
    const fr = new FileReader();
    fr.onload = createImage.bind(this);
    fr.readAsDataURL(e.target.files[0]);
    function createImage() {
      image.onload = imageLoaded.bind(this);
      image.src = fr.result;
    }
    function imageLoaded() {
      const canvas = document.getElementById('image-canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      this.handleSave();
    }
    this.setState({
      image: {
        hasImage: true,
        visibility: 'inherit',
      },
    });
  }

  renderInput() {
    return (
      <Grid.Column>
        <div class=""
          class={`ui placeholder ${this.props.images["fluxo_1"] ? 'hidden' : 'image-not-found'}`}>
          <div class="ui icon header image-not-found">
            <i class="image file outline icon" />
            Nenhuma imagem encontrada.
          </div>
        </div>
        <div className="ui primary button">
            <input
              id="image-input"
              type="file"
              className="file-input"
              style={style.input}
              onChange={this.handleFileUpload.bind(this)}
            />
            <label htmlFor="image-input">Enviar Imagem</label>
          </div>
      </Grid.Column>
    );
  }

  renderCanvas() {
    return (
      <Grid.Column style={style.canvasColumn}>
        <canvas
          id="image-canvas"
          style={{
            visibility: this.state.image.visibility,
            maxWidth: '100%',
            maxHeight: '300px',
          }}
        />
      </Grid.Column>
    );
  }

  savePixels() {
    if (!this.state.image.hasImage) {
      return;
    }
    const canvas = document.getElementById('image-canvas');
    const pixels = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    this.props.addPixelData(pixels, 'fluxo_1');
  }

  handleSave() {
    this.savePixels.apply(this);
  }

  renderNavigationButton(color, label, handleClick, disabled = false) {
    return (
      <Grid.Column>
        <Button
          inverted
          color={color}
          onClick={handleClick}
          style={style.navigationButton}
          disabled={disabled}
        >
          {label}
        </Button>
      </Grid.Column>
    );
  }

  renderHistograms() {
    this.savePixels.apply(this);
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Message style={style.container}>
            <Message.Header>Abrir imagem</Message.Header>
            <p>
              Clique em "Escolher arquivo", selecione uma imagem do seu
              computador e clique em salvar. <br />Você também pode clicar em
              Histogramas para visualizar os histogramas das imagens
              selecionadas ou clicar em voltar.
            </p>
          </Message>
        </Grid.Row>
        <Grid.Row columns={1}>{this.renderCanvas.apply(this)}</Grid.Row>
        <Grid.Row>{this.renderInput.apply(this)}</Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps({ images }) {
  return { images };
}

export default connect(mapStateToProps, actions)(ImageUploader);
