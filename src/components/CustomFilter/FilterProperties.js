import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { promisify } from 'util';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { handleFilter } from '../shared/handleFilter';
import {
	Grid,
	Checkbox,
	Form,
	Button,
	Input,
	Label,
	Popup
} from 'semantic-ui-react';
//import Jimp from 'jimp';
/* global Jimp */

const style = {
	filters: {
		marginBottom: '20px'
	}
};

class FilterProperties extends React.Component {
	state = {
		conv: {
			selected: false,
			size: 0,
			mask: [],
			filtered: false
		}
	};

	loadImage(url) {
		return new Promise(resolve => {
			let i = new Image();
			i.onload = () => {
				resolve(i);
			};
			i.src = url;
		});
	}

	loadImageToCanvasTest = async () => {
		const canvas = document.getElementById('image-canvas');
		canvas.width = 1280;
		canvas.height = 960;
		const ctx = canvas.getContext('2d');
		let img = await this.loadImage('http://localhost:3000/eu.jpg');
		ctx.drawImage(img, 0, 0);
		const pixels = canvas
			.getContext('2d')
			.getImageData(0, 0, canvas.width, canvas.height);
		this.props.addPixelData(pixels, this.props.match.params.target);
	};

	loadImageToCanvas = () => {
		const canvas = document.getElementById('image-canvas');
		const { images, imageActions } = this.props;
		const { id, target } = this.props.match.params;
		const actions = imageActions[target];

		if (images[target] && !!canvas && !!actions) {
			const { pixels } = images[target];
			const filterPixels = new ImageData(pixels.width, pixels.height);
			filterPixels.data.set(pixels.data);
			_.forEach(actions, action => {
				if (!action || !action.type) return;
				if (action.id <= id) {
					handleFilter(action.type, filterPixels);
				}
			});
			writeImageData(
				canvas,
				filterPixels.data,
				filterPixels.width,
				filterPixels.height
			);
		}
	};

	async componentDidMount() {
		const { imageActions } = this.props;
		const { id, target } = this.props.match.params;
		const actions = imageActions[target];
		if (
			!!actions[id] &&
			!!actions.customState &&
			(!!actions.customState.selected || _.size(actions.customState) > 1)
		) {
			await this.setState({ ...actions.customState });
			this.applySelectedFilters();
		}
		this.loadImageToCanvas();
	}

	applySelectedFilters = () => {
		this.props.handleLoading(true);
		this.undoSelectedFilters.call(this);
		const canvas = document.getElementById('image-canvas');

		canvas.toBlob(
			async blob => {
				const url = URL.createObjectURL(blob);
				const image = await Jimp.read(url);

				_.map(this.state, filter => {
					if (!filter || !filter.filter) return;
					image[filter.filter](...filter.params);
				});

				writeImageData(
					canvas,
					image.bitmap.data,
					image.bitmap.width,
					image.bitmap.height
				);
				URL.revokeObjectURL(url);

				this.props.handleLoading(false);
			},
			'image/png',
			1
		);

		this.setState(
			{
				...this.state,
				conv: {
					...this.state.conv,
					filtered: true
				}
			},
			() => {
				const { id, target } = this.props.match.params;
				this.props.setCustomFilterState(id, target, this.state, ['conv']);
			}
		);
	};

	undoSelectedFilters = () => {
		_.map(this.filters, filter => {
			if (!filter || !filter.checked) return;
			filter.checked = false;
		});
		this.loadImageToCanvas();

		this.setState({
			...this.state,
			conv: {
				...this.state.conv,
				filtered: false
			}
		});
	};

	renderCheckbox = (label, filter, ...params) => {
		const stateCheck = this.state[filter] ? this.state[filter].checked : false;
		return (
			<div style={style.filters}>
				<Checkbox
					toggle
					label={label}
					checked={stateCheck}
					disabled={filter === 'convolution' && !this.state.conv.selected}
					onClick={(event, { checked }) => {
						const selectedFilter = checked
							? { label, filter, params, checked }
							: null;
						this.setState({ ...this.state, [filter]: selectedFilter });
					}}
				/>
			</div>
		);
	};

	renderInput = (label, filter, popup) => {
		const stateValue = this.state[filter] ? this.state[filter].value : false;
		return (
			<div style={style.filters}>
				<Input
					labelPosition="right"
					type="number"
					value={stateValue}
					onChange={(event, { value }) => {
						const selectedFilter = !!value
							? {
									label,
									filter,
									params: [Number(value) / 100],
									value: Number(value)
								}
							: null;
						this.setState({ ...this.state, [filter]: selectedFilter });
					}}
				>
					<Label basic>{label}</Label>
					<input />
					<Popup trigger={<Label>?</Label>}>{popup}</Popup>
				</Input>
			</div>
		);
	};

	handleChangeMatrixRadio = (e, { value }) => {
		let matrix = new Array(value);

		for (var index = 0; index < value; index++) {
			matrix[index] = new Array(value);
			matrix[index].fill(0);
		}

		this.setState({
			...this.state,
			conv: {
				...this.state.conv,
				selected: true,
				size: value,
				mask: matrix
			}
		});
	};

	setInput = (e, { value }, x, y) => {
		let matrix = this.state.conv.mask;
		matrix[x][y] = value;
		this.setState({
			...this.state,
			conv: {
				...this.state.conv,
				selected: true,
				size: this.state.conv.size,
				mask: matrix
			}
		});
	};

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
				<Grid.Row columns={2}>
					<Grid.Column>
						<Form>
							<Form.Field style={{ fontWeight: 700 }}>
								Matrix de Convolução
							</Form.Field>
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
					<Grid.Column>
						<div style={style.filters}>
							<h4>Selecione os filtros</h4>
						</div>
						{this.renderCheckbox(
							'Convolução',
							'convolution',
							this.state.conv.mask
						)}
						{this.renderCheckbox('Sepia', 'sepia')}
						{this.renderCheckbox('Normaliza', 'normalize')}
						{this.renderCheckbox('Dither', 'dither565')}
						{this.renderCheckbox('Inverter cor', 'invert')}
						{this.renderCheckbox('Flip', 'flip', true, false)}
						{this.renderInput(
							'Opacidade',
							'opacity',
							'Entre com valores entre 0 e 100, onde 100 é não opaca e 0 é completamente opaca'
						)}
						{this.renderInput(
							'Brilho',
							'brightness',
							'Entre com valores entre -100 e 100, onde -100 é a ausência de brilho e 100 é o brilho máximo'
						)}
						{this.renderInput(
							'Contraste',
							'contrast',
							'Entre com valores entre -100 e 100, onde -100 é a ausência de contraste e 100 é o contraste máximo'
						)}
						<div style={style.filters}>
							<Button
								basic
								color="green"
								disabled={this.state.conv.filtered}
								onClick={this.applySelectedFilters.bind(this)}
							>
								Aplicar
							</Button>
							<Button
								basic
								color="red"
								disabled={!this.state.conv.filtered}
								onClick={this.undoSelectedFilters.bind(this)}
							>
								Desfazer
							</Button>
						</div>
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
