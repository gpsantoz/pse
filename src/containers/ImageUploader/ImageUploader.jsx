import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loading, image } from '../../actions';
import { Button, Grid, Message } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { ORIGINAL_IMAGE } from '../../constants/imageTypes';

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
    console.log("did mount")
    console.log(this)
    if (images[ORIGINAL_IMAGE] && !!canvas) {
      const { pixels } = images[ORIGINAL_IMAGE];
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
    const { addLoading } = this.props;
    addLoading()
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
        <div className={`ui placeholder ${this.props.images[ORIGINAL_IMAGE] ? 'hidden' : 'image-not-found'}`}>
          <div className="ui icon header image-not-found">
            <i className="image file outline icon" />
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
      <Grid.Column style={style.canvasColumn} className={` ${this.props.images[ORIGINAL_IMAGE] ? '' : 'hidden'}`}>
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
      this.props.removeLoading()
      return;
    }
    const canvas = document.getElementById('image-canvas');
    const pixels = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    this.props.addPixelData(pixels, ORIGINAL_IMAGE);
    this.props.removeLoading()
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
              Clique em "Enviar imagem" e selecione uma imagem do seu computador. <br />
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

const mapDispatchToProps = (dispatch) => ({
  addLoading: bindActionCreators(loading.addLoading, dispatch),
  removeLoading: bindActionCreators(loading.removeLoading, dispatch),
  addPixelData: bindActionCreators(image.addPixelData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
