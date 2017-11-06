import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { Grid, Checkbox } from 'semantic-ui-react';
//import Jimp from 'jimp';
/* global Jimp */

class FilterProperties extends React.Component {
	state = {
		jimp: {}
	};

	componentDidMount() {
		const canvas = document.getElementById('image-canvas');
		const { images, imageActions } = this.props;
		const { target } = this.props.match.params;
		const actions = imageActions[target];

		if (images[target] && !!canvas && !!actions) {
			const { pixels } = images[target];
			console.log(pixels);
			writeImageData(canvas, pixels.data, pixels.width, pixels.height);
		}
	}

	applyJimpFilter(filter, ...params) {
		const canvas = document.getElementById('image-canvas');

		canvas.toBlob(
			async blob => {
				const url = URL.createObjectURL(blob);
				const image = await Jimp.read(url);
				image[filter](...params);
				writeImageData(
					canvas,
					image.bitmap.data,
					image.bitmap.width,
					image.bitmap.height
				);
				URL.revokeObjectURL(url);
			},
			'image/png',
			1
		);
	}

	applyJimpConvolution(kernel) {
		const canvas = document.getElementById('image-canvas');

		canvas.toBlob(
			async blob => {
				const url = URL.createObjectURL(blob);
				const image = await Jimp.read(url);
				debugger;
				image.convolution(kernel);
				writeImageData(
					canvas,
					image.bitmap.data,
					image.bitmap.width,
					image.bitmap.height
				);
				URL.revokeObjectURL(url);
			},
			'image/png',
			1
		);
	}

	render() {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Checkbox
							toggle
							label="GreyScale"
							onClick={() => this.applyJimpFilter('greyscale')}
						/>
						<Checkbox
							toggle
							label="Dither 565"
							onClick={() => this.applyJimpFilter('dither565')}
						/>
						<Checkbox
							toggle
							label="Normalize"
							onClick={() => this.applyJimpFilter('normalize')}
						/>
						<Checkbox
							toggle
							label="Rotate"
							onClick={() => this.applyJimpFilter('rotate', 90)}
						/>
						<Checkbox
							toggle
							label="Resize"
							onClick={() => this.applyJimpFilter('resize', 100, 100)}
						/>
						<Checkbox
							toggle
							label="Convolute"
							onClick={() =>
								this.applyJimpConvolution([
									[1, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 1, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 1, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 1, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 1, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 1, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 1, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 1, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 1]
								])}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapStateToProps({ images, imageActions }) {
	return { images, imageActions };
}

export default connect(mapStateToProps, actions)(withRouter(FilterProperties));
