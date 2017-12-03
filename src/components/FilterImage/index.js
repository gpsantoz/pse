import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';
import { writeImageData } from '../../lib/web-dsp/WebDSP';
import { handleFilter } from '../shared/handleFilter';
import NavigationButtons from '../shared/NavigationButtons';
/* global Jimp */

const style = {
	container: {
		marginTop: '20px',
		width: '100%'
	},
	canvas: {
		maxWidth: '100%',
		maxHeight: '500px',
		width: 'auto',
		height: 'auto'
	}
};

class FilterImage extends React.Component {
	state = {
		isLoading: true
	};
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

	handleLoading = isLoading => {
		this.setState({ isLoading });
	};

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
					handleFilter(action.type, filterPixels);
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

			canvas.toBlob(
				async blob => {
					const { images, imageActions } = this.props;
					const { target, id } = this.props.match.params;
					const actions = imageActions[target];

					const url = URL.createObjectURL(blob);
					const image = await Jimp.read(url);

					if (!!actions.customState)
						_.map(actions.customState, filter => {
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
					this.handleLoading(false);
				},
				'image/png',
				1
			);
		}
	}

	render() {
		return (
			<div style={style.container}>
				<Grid>
					<Grid.Row>
						<Message style={style.container}>
							<Message.Header>Filtros</Message.Header>
							<p>
								Essa imagem possui todos os filtros, anteriores ao clicado,
								aplicados. <br />
								Caso deseje, você pode voltar, excluir o filtro ou realizar o
								download da imagem. <br />
								O botão "Histograma" irá exibir os Histogramas R, G e B da
								imagem filtrada e da imagem original.
							</p>
						</Message>
					</Grid.Row>
					<NavigationButtons
						target={this.props.match.params.target}
						id={this.props.match.params.id}
					/>
					<Grid.Row>
						<Dimmer active={this.state.isLoading}>
							<Loader />
						</Dimmer>
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

export default connect(mapStateToProps)(withRouter(FilterImage));
