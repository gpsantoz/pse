import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import ButtonBlock from './ButtonBlock';
import { writeImageData } from '../../lib/web-dsp/WebDSP';

class OpenImageModal extends React.Component {
	state = {
		modalOpen: false,
		image: {
			visibility: 'hidden'
		}
	};

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	handleRemove = () => {
		//this.props.removeProcessingBlock(this.props.id);
		this.setState({ modalOpen: false });
	};

	renderTriggerButton = type => {
		return <ButtonBlock content={type} onClick={this.handleOpen} />;
	};

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
			const canvas = document.getElementById('image-canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			const pixels = ctx.getImageData(0, 0, image.width, image.height);
			this.props.addPixelData(pixels, this.props.target);
		}
		// let pixels = ctx.getImageData(0, 0, img.width, img.height);
		// pixels.data.set(coreDSP[filter](pixels.data));
		// writeImageData(canvas, pixels.data, pixels.width, pixels.height);

		// addPixelData = (pixels, target)

		this.setState({
			...this.state,
			image: {
				...this.state.image,
				visibility: 'inherit'
			}
		});
	}

	renderCanvas() {
		debugger;
		const canvas = document.getElementById('image-canvas');
		const { images, target } = this.props;
		if (images[target] && !!canvas) {
			const { pixels } = images[target];

			canvas.width = pixels.width;
			canvas.height = pixels.height;

			writeImageData(canvas, pixels.data, pixels.width, pixels.height);
		}
	}

	renderImage() {
		return (
			<div>
				<canvas
					id="image-canvas"
					style={{
						visibility: this.state.image.visibility,
						maxWidth: '400px'
					}}
				/>
				<img
					id="original-image"
					srcSet={this.state.src}
					key="test"
					alt="test"
					style={{
						maxWidth: '600px',
						display: 'none'
					}}
				/>
			</div>
		);
	}

	render() {
		const { type } = this.props;
		return (
			<Modal
				trigger={this.renderTriggerButton(type)}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				basic
				size="small"
				onOpen={this.renderCanvas.bind(this)}
			>
				<Header icon="pencil" content="Open Image" />
				<Modal.Content>
					<Button
						color="green"
						inverted
						style={{ marginBottom: '20px' }}
					>
						<input
							type="file"
							onChange={this.handleFileUpload.bind(this)}
						/>
					</Button>

					{this.renderImage()}
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" onClick={this.handleClose} inverted>
						<Icon name="checkmark" /> Salvar
					</Button>
					<Button
						color="green"
						onClick={this.handleRemove.bind(this)}
						inverted
					>
						<Icon name="trash" /> Remove
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, actions)(OpenImageModal);
