import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';

const style = {
	navigationButton: {
		minWidth: '120px'
	}
};

class NavigationButtons extends React.Component {
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

	renderHistogram() {
		const canvas = document.getElementById('image-canvas');
		const ctx = canvas.getContext('2d');
		const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const location = {
			pathname: '/histogram',
			state: {
				pixels,
				target: this.props.target
			}
		};

		this.props.history.push(location);
	}

	removeBlock() {
		const { target, id } = this.props;
		this.props.removeProcessingBlock(id, target);
		this.props.history.push('/');
	}

	canvasToBlobPromisify = canvas => {
		return new Promise((resolve, reject) => {
			canvas.toBlob(
				async blob => {
					const url = URL.createObjectURL(blob);
					const link = { href: url, download: 'download.png' };
					resolve(link);
					//URL.revokeObjectURL(url);
				},
				'image/png',
				1
			);
		});
	};

	downloadImage = async () => {
		const link = document.getElementById('download');
		const canvas = document.getElementById('image-canvas');
		const newLink = await this.canvasToBlobPromisify(canvas);
		debugger;
		link.href = newLink.href;
		link.download = newLink.download;
	};

	render() {
		return (
			<Grid.Row columns={6}>
				<Grid.Column>
					{this.renderNavigationButton('red', 'Voltar', () =>
						this.props.history.push('/')
					)}
				</Grid.Column>
				<Grid.Column>
					{this.renderNavigationButton(
						'red',
						'Excluir',
						this.removeBlock.bind(this)
					)}
				</Grid.Column>
				<Grid.Column>
					<Button
						inverted
						color="blue"
						onClick={this.downloadImage}
						style={style.navigationButton}
						as="a"
						id="download"
					>
						Download
					</Button>
				</Grid.Column>
				<Grid.Column>
					{this.renderNavigationButton(
						'blue',
						'Histograma',
						this.renderHistogram.bind(this)
					)}
				</Grid.Column>
			</Grid.Row>
		);
	}
}

export default connect(null, actions)(withRouter(NavigationButtons));
