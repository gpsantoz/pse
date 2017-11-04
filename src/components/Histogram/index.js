import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Label, Divider, Message } from 'semantic-ui-react';
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import CoreDSP from '../../lib/web-dsp/CoreDSP';
import { AREA_1, AREA_2 } from '../../actions/types';

const coreDSP = new CoreDSP();

const style = {
	container: {
		marginTop: '20px'
	}
};

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
			<Grid divided centered style={{ marginTop: '10px' }}>
				<h1>{title}</h1>
				<Grid.Row columns={3}>
					<Grid.Column>
						<Label as="a" color="red" ribbon>
							Vermelho
						</Label>
						{this.renderBarChart(histograms.redArray)}
					</Grid.Column>
					<Grid.Column>
						<Label as="a" color="green" ribbon>
							Verde
						</Label>
						{this.renderBarChart(histograms.greenArray)}
					</Grid.Column>
					<Grid.Column>
						<Label as="a" color="blue" ribbon>
							Azul
						</Label>
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

	renderNavigation() {
		return (
			<Grid centered style={{ marginTop: '10px' }}>
				<Grid.Row>
					{this.renderNavigationButton('red', 'Voltar', () =>
						this.props.history.push('/')
					)}
				</Grid.Row>
			</Grid>
		);
	}

	render() {
		if (!this.props.images[AREA_1] && !this.props.images[AREA_1])
			return (
				<div>
					<Message negative style={style.container}>
						<Message.Header>
							Nenhuma imagem carregada!!!
						</Message.Header>
						<p>
							Favor realizar o upload de pelo menos uma imagem no
							fluxo de blocos.
						</p>
					</Message>
					{this.renderNavigation()}
				</div>
			);
		return (
			<div style={style.container}>
				{this.renderHistograms(AREA_1, 'Histograma Imagem 1')}
				<Divider />
				{this.renderHistograms(AREA_2, 'Histograma Imagem 2')}
				{this.renderNavigation()}
			</div>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, null)(withRouter(Histogram));
