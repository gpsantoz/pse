import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Label, Message } from 'semantic-ui-react';
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import psnr from 'psnr';
import mse from 'mse';
import ssim from 'ssim';
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

	renderHistogram(title, pixels) {
		const histograms = coreDSP.getHistograms(pixels.data);
		return (
			<Grid divided centered>
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

	renderHistograms(target, title) {
		if (
			!this.props.images ||
			!this.props.images[target] ||
			(this.props.location.state && this.props.location.state.target !== target)
		)
			return;
		const { pixels } = this.props.images[target];
		return this.renderHistogram(title, pixels);
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

	renderFilterHistogram() {
		if (!this.props.location.state) return '';
		return this.renderHistogram(
			'Imagem filtrada',
			this.props.location.state.pixels
		);
	}

	renderComparisonData() {
		let calcMSE;
		let calcPSNR;
		let calcSSIM;

		if (this.props.location.state) {
			const { target, pixels } = this.props.location.state;
			const originalImage = this.props.images[target].pixels;
			calcMSE = mse(originalImage.data, pixels.data);
			calcPSNR = psnr(originalImage.data, pixels.data);
			calcSSIM = ssim(originalImage.data, pixels.data);
		} else if (this.props.images[AREA_1] && this.props.images[AREA_2]) {
			const imageOne = this.props.images[AREA_1].pixels;
			const imageTwo = this.props.images[AREA_2].pixels;
			calcMSE = mse(imageOne.data, imageTwo.data);
			calcPSNR = psnr(imageOne.data, imageTwo.data);
			calcSSIM = ssim(imageOne.data, imageTwo.data);
		} else {
			return '';
		}

		return (
			<Message floating style={style.container}>
				<Message.Header>Cálculos das imagens</Message.Header>
				<Grid centered style={{ marginTop: '10px' }}>
					<Grid.Row columns={3}>
						<Grid.Column>
							<b>MSE:</b> {calcMSE ? parseFloat(calcMSE).toFixed(2) : '-'}
						</Grid.Column>
						<Grid.Column>
							<b>PSNR:</b> {calcPSNR ? parseFloat(calcPSNR).toFixed(2) : '-'}
						</Grid.Column>
						<Grid.Column>
							<b>SSIM:</b> {calcSSIM ? parseFloat(calcSSIM).toFixed(2) : '-'}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Message>
		);
	}

	render() {
		return (
			<div style={style.container}>
				{this.renderComparisonData()}
				{this.renderFilterHistogram.apply(this)}
				{this.renderHistograms(AREA_1, 'Histograma da Imagem')}
				{/* {this.renderNavigation()} */}
			</div>
		);
	}
}

function mapStateToProps({ images }) {
	return { images };
}

export default connect(mapStateToProps, null)(withRouter(Histogram));
