import _ from 'lodash';
import CIM from '../lib/CIM';
import React from 'react';
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { writeImageData } from '../lib/web-dsp/WebDSP';
import CoreDSP from '../lib/web-dsp/CoreDSP';

const coreDSP = new CoreDSP();

const cim = new CIM('figure-area', 'test-canvas');

const buttons = [
	{ name: 'grayscale', func: cim.runGrayscale },
	{ name: 'invert', func: cim.runInvert },
	{ name: 'brightness', func: cim.runBrightness },
	{ name: 'threshold', func: cim.runThreshold },
	{ name: 'sharpen', func: cim.runSharpen },
	{ name: 'blurC', func: cim.runBlurC },
	{ name: 'sobel', func: cim.runSobel }
];

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redArray: [],
			greenArray: [],
			blueArray: []
		};
	}

	renderFilterButtons() {
		return _.map(buttons, button => {
			return (
				<button
					key={button.name}
					id={`${button.name}-btn`}
					className="waves-effect waves-light btn"
					onClick={button.func}
				>
					{button.name}
				</button>
			);
		});
	}

	processImageTest(filter) {
		return () => {
			const img = document.getElementById('orig');
			const canvas = document.getElementById('test-canvas');
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			let pixels = ctx.getImageData(0, 0, img.width, img.height);
			pixels.data.set(coreDSP[filter](pixels.data));
			writeImageData(canvas, pixels.data, pixels.width, pixels.height);
		};
	}

	componentDidMount() {}

	render() {
		return (
			<div className="container">
				<figure id="figure-area">
					<canvas id="test-canvas" />
					<img
						onLoad={() => {
							const img = document.getElementById('orig');
							const canvas = document.getElementById(
								'test-canvas'
							);
							canvas.width = img.width;
							canvas.height = img.height;
							canvas.getContext('2d').drawImage(img, 0, 0);
							cim.runPipelineFilter();
							this.setState(cim.getHistogram());
						}}
						id="orig"
						src="demo_small.png"
						alt="canvas area"
						style={{ display: 'none' }}
					/>
				</figure>

				<div className="divider" />

				<button onClick={this.processImageTest('grayScale')}>
					grayScale
				</button>
				<button onClick={this.processImageTest('brighten')}>
					brighten
				</button>
				<button onClick={this.processImageTest('invert')}>
					invert
				</button>

				<div className="divider" />

				<div className="divider" />

				<div className="section">{this.renderFilterButtons()}</div>

				<div className="divider" />

				<div className="row">
					<div className="col s12 m6">
						<BarChart
							width={400}
							height={200}
							data={this.state.redArray}
						>
							<XAxis dataKey="nivel" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Bar dataKey="Quantidade" fill="#8884d8" />
						</BarChart>
					</div>

					<div className="col s12 m6">
						<BarChart
							width={400}
							height={200}
							data={this.state.greenArray}
						>
							<XAxis dataKey="nivel" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Bar dataKey="Quantidade" fill="#8884d8" />
						</BarChart>
					</div>

					<div className="col s12 offset-m3 m6">
						<BarChart
							width={400}
							height={200}
							data={this.state.blueArray}
						>
							<XAxis dataKey="nivel" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Bar dataKey="Quantidade" fill="#8884d8" />
						</BarChart>
					</div>
				</div>
			</div>
		);
	}
}

export default Test;
