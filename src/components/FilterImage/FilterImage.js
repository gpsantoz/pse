import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';

class FilterImage extends React.Component {
	state = {
		image: {
			visibility: 'hidden'
		}
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
			debugger;
			const canvas = document.getElementById('image-canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			const pixels = ctx.getImageData(0, 0, image.width, image.height);
			this.props.addPixelData(pixels, this.props.match.params.target);
		}

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

	render() {
		return (
			<div>
				<canvas
					id="image-canvas"
					style={{
						visibility: this.state.image.visibility,
						maxWidth: '400px'
					}}
				/>
				<input
					type="file"
					onChange={this.handleFileUpload.bind(this)}
				/>
			</div>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, actions)(FilterImage);
