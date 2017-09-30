import _ from 'lodash';
import CIM from '../lib/CIM'
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const cim = new CIM('figure-area', 'orig');
const buttons = [
	{ name: 'grayscale', func: cim.runGrayscale },
	{ name: 'invert', func: cim.runInvert },
	{ name: 'brightness', func: cim.runBrightness },
	{ name: 'threshold', func: cim.runThreshold },
	{ name: 'blurc', func: cim.runBlurC },
	{ name: 'sobel', func: cim.runSobel }
];

class Test extends React.Component {
	constructor(props) {
		super(props);
	}

	renderFilterButtons() {
		return (
			_.map(buttons, button => {
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
			})
		);
	}

	render() {
		return (
			<div className="container">
				<figure id="figure-area">
					<img
						className="responsive-img"
						id="orig"
						src="demo_small.png"
						alt="image"
					/>
				</figure>

				<div className="divider" />

				<div className="section">
					{this.renderFilterButtons()}
				</div>
			</div>
		);
	}
}

export default Test;
