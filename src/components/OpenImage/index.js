import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Grid, Message } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';

const style = {
	canvasColumn: {
		height: '300px'
	},
	inputButton: {
		marginTop: '10px'
	},
	input: {
		maxWidth: '300px'
	},
	navigationButton: {
		minWidth: '120px'
	},
	container: {
		width: '100%'
	}
};

class OpenImage extends React.Component {
	state = {
		image: {
			hasImage: false,
			visibility: 'hidden'
		}
	};

	componentDidMount() {
		const canvas = document.getElementById('image-canvas');
		const { images, match: { params: { target } } } = this.props;
		if (images[target] && !!canvas) {
			const { pixels } = images[target];
			canvas.width = pixels.width;
			canvas.height = pixels.height;
			writeImageData(canvas, pixels.data, pixels.width, pixels.height);

			this.setState({
				image: {
					hasImage: true,
					visibility: 'inherit'
				}
			});
		}
	}

	handleFileUpload(e) {
		if (!e || !e.target || !e.target.files.length) return;
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
		}
		this.setState({
			image: {
				hasImage: true,
				visibility: 'inherit'
			}
		});
	}

	renderInput() {
		return (
			<Grid.Column>
				<Button basic color="blue" style={style.inputButton}>
					<input
						id="image-input"
						type="file"
						style={style.input}
						onChange={this.handleFileUpload.bind(this)}
					/>
				</Button>
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
						maxHeight: '300px'
					}}
				/>
			</Grid.Column>
		);
	}

	savePixels() {
		if (!this.state.image.hasImage) return;
		const canvas = document.getElementById('image-canvas');
		const pixels = canvas
			.getContext('2d')
			.getImageData(0, 0, canvas.width, canvas.height);
		this.props.addPixelData(pixels, this.props.match.params.target);
	}

	handleSave() {
		this.savePixels.apply(this);
		this.props.history.push('/');
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
		this.props.history.push('/histogram');
	}

	render() {
		return (
			<Grid>
				<Grid.Row>
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
				<Grid.Row>{this.renderInput.apply(this)}</Grid.Row>
				<Grid.Row columns={1}>{this.renderCanvas.apply(this)}</Grid.Row>
				<Grid.Row columns={6}>
					{this.renderNavigationButton('red', 'Voltar', () =>
						this.props.history.push('/')
					)}
					{this.renderNavigationButton(
						'green',
						'Salvar',
						this.handleSave.bind(this),
						!this.state.image.hasImage
					)}
					{this.renderNavigationButton(
						'green',
						'Histogramas',
						this.renderHistograms.bind(this)
					)}
				</Grid.Row>
			</Grid>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, actions)(OpenImage);
