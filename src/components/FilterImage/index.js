import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { Button, Grid } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import CoreDSP from '../../lib/web-dsp/CoreDSP';

const coreDSP = new CoreDSP();

const style = {
	container: {
		marginTop: '20px'
	},
	canvas: {
		maxWidth: '100%'
	},
	navigationButton: {
		minWidth: '120px'
	}
};

class FilterImage extends React.Component {
	handleFileUpload(e) {
		if (!e || !e.target) return;
		const image = new Image();
		const fr = new FileReader();
		fr.onload = createImage.bind(this);
		fr.readAsDataURL(e.target.files[0]);

		function createImage() {
			image.onload = imageLoaded.bind(this);
			image.src = fr.result;
		}

		function imageLoaded() {
			debugger;
			const canvas = document.getElementById('image-canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			const pixels = ctx.getImageData(0, 0, image.width, image.height);
			this.props.addPixelData(pixels, this.props.match.params.target);
		}
	}

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

	handleFilter(filter, pixels) {
		const { width, height } = pixels;
		switch (filter) {
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
				pixels.data.set(
					coreDSP.sobel(pixels.data, width, height, true)
				);
				break;
			case 'gaussian_blur':
				pixels.data.set(coreDSP.blur(pixels.data, width, height));
				break;
			case 'sharpen':
				pixels.data.set(coreDSP.sharpen(pixels.data, width, height));
				break;
			case 'uber_sharpen':
				pixels.data.set(
					coreDSP.strong_sharpen(pixels.data, width, height)
				);
				break;
			case 'clarity':
				pixels.data.set(coreDSP.clarity(pixels.data, width, height));
				break;
			case 'good_morning':
				pixels.data.set(
					coreDSP.good_morning(pixels.data, width, height)
				);
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
				pixels.data.set(
					coreDSP.destruction(pixels.data, width, height)
				);
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
	}

	componentDidMount() {
		const canvas = document.getElementById('image-canvas');
		const { images, imageActions } = this.props;
		const { target, id } = this.props.match.params;
		const actions = imageActions[target];

		if (images[target] && !!canvas && !!actions) {
			const { pixels } = images[target];
			const filterPixels = new ImageData(pixels.width, pixels.height);
			filterPixels.data.set(pixels.data);

			_.forEach(actions, action => {
				if (!action || !action.type) return;
				if (action.id <= id) {
					debugger;
					this.handleFilter(action.type, filterPixels);
				}
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
	}

	removeBlock() {
		const { target, id } = this.props.match.params;
		this.props.removeProcessingBlock(id, target);
		this.props.history.push('/');
	}

	downloadImage() {
		debugger;
		const link = document.getElementById('download');
		link.href = document.getElementById('image-canvas').toDataURL();
		link.download = 'download.png';
	}

	render() {
		return (
			<div style={style.container}>
				<Grid>
					<Grid.Row columns={6}>
						<Grid.Column>
							{this.renderNavigationButton('red', 'Voltar', () =>
								this.props.history.push('/')
							)}
						</Grid.Column>
						<Grid.Column>
							{this.renderNavigationButton(
								'red',
								'Excluir',
								this.removeBlock.bind(this)
							)}
						</Grid.Column>
						<Grid.Column>
							<Button
								inverted
								color="blue"
								onClick={this.downloadImage}
								style={style.navigationButton}
								as="a"
								id="download"
							>
								Download
							</Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
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

export default connect(mapStateToProps, actions)(withRouter(FilterImage));
