import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  Message } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import elem1 from '../../assets/images/elemento_estruturante_1.png';
import elem2 from '../../assets/images/elemento_estruturante_2.png';
import './style.css';

const M_3x3_CROSS = [[0, 1, 0],
								[1, 1, 1],
								[0, 1, 0]];

const M_3x3_FULL = [[1, 1, 1],
								[1, 1, 1],
								[1, 1, 1]];


class MorphologicalFiltering extends React.Component {
	state = {
		image :null,
		checkbox1: true,
		checkbox2: false,
		checkbox3: true,
		checkbox4: false,
		size: 3,
	};



	applyFilter = () => {
    let Img = require('image-js')
		let result;
    const { width, height, data } = this.props.images.fluxo_1.pixels;

    let imagem = new Img.Image(width, height, data)
    imagem = imagem.grey()

    let iterations = 1

		if (this.state.checkbox1 && this.state.checkbox3) {
			result = imagem.erode({kernel: M_3x3_CROSS, iterations: iterations})
		} else if (this.state.checkbox2 && this.state.checkbox3) {
			result = imagem.erode({kernel: M_3x3_FULL, iterations: iterations})
		} else if (this.state.checkbox1 && this.state.checkbox4) {
			result = imagem.dilate({kernel: M_3x3_CROSS, iterations: iterations})
		} else if (this.state.checkbox2 && this.state.checkbox4) {
			result = imagem.dilate({kernel: M_3x3_FULL, iterations: iterations})
    }

    result = result.rgba8()

    const canvas = document.getElementById('image-morp-canvas');
		const filterPixels = new ImageData(result.width, result.height);
		filterPixels.data.set(result.data);
		writeImageData(
			canvas,
			filterPixels.data,
			filterPixels.width,
			filterPixels.height
		);
	}

	erosao = (el, sizeEl, width, height, data) => {
		const result = [];
		let i = height * width;
		while (i > 0) {
			result.push(0);
			i--;
		}
		for (let x = 1; x < width - 1; x++) {
			for (let y = 1; y < height - 1; y++) {
				const i = y * width + x;
				const mat = this.constructMatrixForIndex(i, el, sizeEl, height, data);
				result[i] = this.erodeOp(mat, data);
			}
		}
		return result;
	}

	dilatacao = (el, sizeEl, width, height, data) => {
		const result = new Array(width * height).fill(0);
		for (let x = 1; x < width - 1; x++) {
			for (let y = 1; y < height - 1; y++) {
				const ind = x * height + y;
				const mat = this.constructMatrixForIndex(ind, el, sizeEl, height, data);
				//result[ind] = this.dilateOp(el, data);
				result[ind] = this.dilateOp(el, mat);
			}
		}
		return result;
	}

	constructMatrixForIndex = function(ind, el, d, height, data) {
		if (!d) {
			d = 3;
		}
		let mat = el;
		const halfDim = Math.floor(d / 2);
		const upperLeft = ((ind - (height * halfDim))) - 1;

		let count = 0;
		for (let x = 0; x < d * d; x++) {
			const j = upperLeft + (x % d) + height * Math.floor(x / d);
			if (j < data.length && j >= 0) {
				mat[count] = data[j];
			}
			count++;
		}
		return mat;
	}

	erodeOp = (el, data) => {
		for (let i = 0; i < 9; i++) {
			if (el[i] == -1) {
				continue;
			}
			if (el[i] != data[i] && el[i] != 1) {
				return 0;
			}
		}
		return 1;
	}

	dilateOp = (el, data) => {
		for (let j = 0; j < 9; j++) {
			if (el[j] == -1) {
				continue;
			}
			if (el[j] == 1 && data[j] == 1) {
				return 1;
			}
		}
		return 0;
	}

	toogleCheckbox = (index) => {
		if (index === 1) {
			this.setState({ checkbox1: true,  checkbox2: false});
		} else if (index === 2) {
			this.setState({ checkbox1: false,  checkbox2: true});
		}

		if (index === 3) {
			this.setState({ checkbox3: true,  checkbox4: false});
		} else if (index === 4) {
			this.setState({ checkbox3: false,  checkbox4: true});
		}
	}

	handleSize = (valor) => {
		console.log(valor);
		this.setState({ size: valor.target.value});
	}
	renderOpcoes = () => {
		const { width, height } = this.props.images.fluxo_1.pixels;
		const tamanho = width > height ?
		`tamanho menor que ${height}` : `tamanho < ${width}`;
		return (
			<div className="ui equal width grid">
				<div className="column">
					<div className="row">
						<div className="column">
							<img className="imagem" src={elem1} />
						</div>
					</div>
					<div className="row">
						<div className="column">
						<label>Imagem 1</label>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="row">
						<div className="column">
							<img className="imagem" src={elem2} />
						</div>
					</div>
					<div className="row">
						<div className="column">
						<label>Imagem 2</label>
						</div>
					</div>
				</div>
				<div className="column">
					<div class="ui form">
						<div class="grouped fields">
							<label for="fruit">Selecione o elemento estruturante:</label>
							<div class="field">
								<div class="ui radio checkbox">
									<input
										type="radio"
										name="elem1"
										checked={this.state.checkbox1}
										tabindex="0"
										onClick={() => this.toogleCheckbox(1)}
									/>
									<label>Imagem 1</label>
								</div>
							</div>
							<div class="field">
								<div class="ui radio checkbox">
									<input
										type="radio"
										name="elem2"
										checked={this.state.checkbox2}
										tabindex="0"
										onClick={() => this.toogleCheckbox(2)}/>
									<label>Imagem 2</label>
								</div>
							</div>
							<div class="field">
								<input
									type="number"
									placeholder={tamanho}
									onChange={this.handleSize}
									value={this.state.size}
									disabled
								/>
							</div>
							<label for="fruit">Selecione a operação:</label>
							<div class="field">
								<div class="ui radio checkbox">
									<input
										type="radio"
										name="elem3"
										checked={this.state.checkbox3}
										tabindex="0"
										onClick={() => this.toogleCheckbox(3)}
									/>
									<label>Erosão</label>
								</div>
							</div>
							<div class="field">
								<div class="ui radio checkbox">
									<input
										type="radio"
										name="elem4"
										checked={this.state.checkbox4}
										tabindex="0"
										onClick={() => this.toogleCheckbox(4)}/>
									<label>Dilatação</label>
								</div>
							</div>
							<div class="field">
								<button
									onClick={() => this.applyFilter()}
								>
								OK
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}



	render() {
		return (
			<div>
				<Message floating className="container" >
					<Message.Header className="headerMain">
						Filtros Morfológicos
					</Message.Header>
					{this.renderOpcoes()}
					<canvas id="image-morp-canvas" style={{ resizeMode: 'contain', maxWidth: 500, maxHeight: 500 }} />
				</Message>
			</div>
		);
	}
}

function mapStateToProps({ images, imageActions }) {
	return { images, imageActions };
}

export default connect(mapStateToProps, null)(withRouter(MorphologicalFiltering));
