import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Message, Label, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import NavigationButtons from '../shared/NavigationButtons';
import { styles } from './styles';
import {
	ERRO_FORMATO_ARQUIVO_BMP,
	ERRO_IMAGEM_VAZIA,
} from './../../Constants';


class MorphologicalFiltering extends React.Component {
	state = {
		redArray: [],
		greenArray: [],
		blueArray: [],
		hasImage: false,
		imgSrc: null,
		erro: '',
		isLoading: true,
	};

	componentDidMount() {
		const { images } = this.props;
		if (images === {}) {
			this.setState({
				erro: ERRO_IMAGEM_VAZIA,
				hasImage: false,
				isLoading: false,
			});
		} else {
			const pertence = this.binaryImage();
			if (!pertence) {
				this.setState({
					erro: ERRO_FORMATO_ARQUIVO_BMP,
					hasImage: false,
					isLoading: false,
				});
			} else {
				const canvas = document.getElementById('image-canvas');
				this.setState({ hasImage: true, isLoading: false });
			}
		}
	}

	binaryImage = () => {
		const { target } = { ...this.props.match.params };
		if (this.props.images[`${target}`]) {
			const vet = this.props.images[`${target}`].pixels;
			for (let i = 0; i < vet.height * vet.width; i++) {
				if (vet.data[i] !== 0 && vet.data[i] !== 255) {
					return false;
				}
			}
			return true;
		} else {
			this.setState({
				erro: ERRO_IMAGEM_VAZIA,
				hasImage: false,
				isLoading: false,
			});
		}
		return false;
	}

	handleCarregarImagem = (e) => {
		if (!e || !e.target || !e.target.files.length) {
			return;
		}
		let image = new Image();
		let fr = new FileReader();
		fr.onload = createImage.bind(this);
		fr.readAsDataURL(e.target.files[0]);
		function createImage() {
			image.src = fr.result;
			if (image.src.indexOf('/bmp') !== -1) {
				this.setState({ hasImage: true, imgSrc: image.src, erro: '' });
			} else {
				this.setState({ hasImage: false, erro: ERRO_FORMATO_ARQUIVO_BMP });

			}
		}
	}

	renderErro = () =>
		<Grid.Row>
			<Grid.Column style={{ textAlign: 'center' }}>
				<Label style={{ width: '350px' }}>
					<Icon name="warning sign" color="red" /> {this.state.erro}
				</Label>
			</Grid.Column>
		</Grid.Row>;

	renderOpcoes = () =>
		<Grid.Row>
			<Grid.Column style={{ textAlign: 'center' }}>
				<figure id="figure-area">
					<img
						id="orig"
						src={this.state.imgSrc}
						alt="canvas area"
						style={styles.img}
					/>
				</figure>
			</Grid.Column>
		</Grid.Row>;


	render() {
		return (
			<div>
				<Message floating style={styles.container}>
					<Message.Header style={styles.header}>
						Filtros Morfológicos
					</Message.Header>
					<Grid centered style={styles.grid}>
						{this.state.erro ? this.renderErro() : null}
						<Grid.Row>
							<Grid.Column style={{ textAlign: 'center' }}>
								<Dimmer active={this.state.isLoading}>
									<Loader />
								</Dimmer>
								<canvas id="image-canvas" style={styles.img} />
							</Grid.Column>
						</Grid.Row>
						{
							this.state.hasImage ?
								<NavigationButtons
									target={this.props.match.params.target}
									id={this.props.match.params.id}
								/> : null
						}
					</Grid>
				</Message>
			</div>
		);
	}
}

function mapStateToProps({ images, imageActions }) {
	return { images, imageActions };
}

export default connect(mapStateToProps, null)(withRouter(MorphologicalFiltering));
