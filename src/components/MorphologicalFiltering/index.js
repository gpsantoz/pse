import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  Message } from 'semantic-ui-react';
import elem1 from '../../assets/images/elemento_estruturante_1.png';
import elem2 from '../../assets/images/elemento_estruturante_2.png';
import './style.css';


class MorphologicalFiltering extends React.Component {
	state = {
		image :null,
		checkbox1: true,
		checkbox2: false,
		size: 3,
	};

	componentDidMount() {
		// const canvas = document.getElementById('image-morp-canvas')
		// const { id, target } = this.props.match.params;
		// const { pixels } = images[target];
		// const filterPixels = new ImageData(pixels.width, pixels.height);
		// filterPixels.data.set(pixels.data);
		// writeImageData(
		// 	canvas,
		// 	filterPixels.data,
		// 	filterPixels.width,
		// 	filterPixels.height
		// );
	}


	applyFilter = () => {
		const { width, height, data } = this.props.images.fluxo_1.pixels;
		// let morph = new Morph(height, width, data);
		// morph.erodeWithElement();
		// console.log(morph);
	}

	toogleCheckbox = (index) => {
		if (index === 1) {
			this.setState({ checkbox1: true,  checkbox2: false});
		} else {
			this.setState({ checkbox1: false,  checkbox2: true});
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
							/>
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
				</Message>
			</div>
		);
	}
}

function mapStateToProps({ images, imageActions }) {
	return { images, imageActions };
}

export default connect(mapStateToProps, null)(withRouter(MorphologicalFiltering));
