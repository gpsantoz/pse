import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { readImageData } from '../../lib/web-dsp/WebDSP';
import CoreDSP from '../../lib/web-dsp/CoreDSP';

const coreDSP = new CoreDSP();

class Histogram extends React.Component {
	state = {
		redArray: [],
		greenArray: [],
		blueArray: []
	};

	renderBarChart(histogramData) {
		return (
			<BarChart width={300} height={150} data={histogramData}>
				<XAxis dataKey="nivel" />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Bar dataKey="Quantidade" fill="#8884d8" />
			</BarChart>
		);
	}
	renderHistograms(target, title) {
		if (!this.props.images || !this.props.images[target]) return;
		const { pixels } = this.props.images[target];
		const histograms = coreDSP.getHistograms(pixels.data);
		return (
			<Grid centered style={{ marginTop: '10px' }}>
				<h1>{title}</h1>
				<Grid.Row columns={3}>
					<Grid.Column>
						<h1 style={{ textAlign: 'center' }}>Vermelho</h1>
						{this.renderBarChart(histograms.redArray)}
					</Grid.Column>
					<Grid.Column>
						<h1 style={{ textAlign: 'center' }}>Verde</h1>
						{this.renderBarChart(histograms.greenArray)}
					</Grid.Column>
					<Grid.Column>
						<h1 style={{ textAlign: 'center' }}>Azul</h1>
						{this.renderBarChart(histograms.blueArray)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	renderNavigationButton(color, label, handleClick, disabled = false) {
		return (
			<Grid.Column>
				<Button
					inverted
					color={color}
					onClick={handleClick}
					style={{ minWidth: '120px' }}
					disabled={disabled}
				>
					{label}
				</Button>
			</Grid.Column>
		);
	}

	render() {
		return (
			<div>
				{this.renderHistograms('area_1', 'Imagem 1')}
				{this.renderHistograms('area_2', 'Imagem 2')}
				<Grid centered style={{ marginTop: '10px' }}>
					<Grid.Row>
						{this.renderNavigationButton('red', 'Voltar', () =>
							this.props.history.push('/')
						)}
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, null)(withRouter(Histogram));
