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
		let matrix = new Array(value);

		for (var index = 0; index < value; index++) {
			matrix[index] = new Array(value);
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

	setInput(e, { value }, x, y) {
		let matrix = this.state.conv.mask;
		matrix[x][y] = value;
		this.setState({
			...this.state,
			conv: {
				selected: true,
				size: this.state.conv.size,
				mask: matrix
			}
		});
	}

	renderConvolutionInputs = () => {
		let ret = [];
		for (let x = 0; x < this.state.conv.size; x++) {
			let column = [];
			for (let y = 0; y < this.state.conv.size; y++) {
				column.push(
					<Form.Input
						key={`input${x + y}`}
						type="number"
						style={{ width: '3.5em' }}
						value={this.state.conv.mask[x][y]}
						onChange={(e, data) => this.setInput(e, data, x, y)}
					/>
				);
			}
			ret.push(
				<Form.Group key={`form_group_${x}`}>
					<Form.Group inline key={`form_group_inline${x}`} />
					{column}
				</Form.Group>
			);
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
