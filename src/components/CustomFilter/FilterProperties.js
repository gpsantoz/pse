import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { Grid, Checkbox, Form } from 'semantic-ui-react';
//import Jimp from 'jimp';
/* global Jimp */

class FilterProperties extends React.Component {
	state = {
		conv: {
			selected: false,
			size: 0,
			mask: []
		}
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

	renderCheckbox(label, filter, ...params) {
		return (
			<Checkbox
				toggle
				label={label}
				onClick={() => this.applyJimpFilter(filter, ...params)}
			/>
		);
	}

	handleChangeMatrixRadio = (e, { value }) => {
		let matrix;
		switch (value) {
			case 3:
				matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
				break;
			case 5:
				matrix = [
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0]
				];
				break;
			case 7:
				matrix = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]
				];
				break;
			default:
				break;
		}
		this.setState({
			...this.state,
			conv: {
				selected: true,
				size: value,
				mask: matrix
			}
		});
	};

	renderConvolutionInputs = () => {
		let ret = [];

		for (var x = 0; x < this.state.conv.size; x++) {
			ret.push(<Form.Group />);
			debugger;
			ret[x].push(<Form.Group inline />);
			for (var y = 0; y < this.state.conv.size; y++) {
				ret[x].push(<Form.Input value={this.state.conv.mask[x][y]} />);
			}
		}

		return ret;
	};

	render() {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Form.Field>Matrix de Convolução</Form.Field>
							<Form.Group inline>
								<label>Tamanho:</label>
								<Form.Radio
									label="3x3"
									value={3}
									checked={this.state.conv.size === 3}
									onChange={this.handleChangeMatrixRadio}
								/>
								<Form.Radio
									label="5x5"
									value={5}
									checked={this.state.conv.size === 5}
									onChange={this.handleChangeMatrixRadio}
								/>
								<Form.Radio
									label="7x7"
									value={7}
									checked={this.state.conv.size === 7}
									onChange={this.handleChangeMatrixRadio}
								/>
							</Form.Group>
							{this.renderConvolutionInputs()}
						</Form>
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
