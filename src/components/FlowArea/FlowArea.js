import React from 'react';
import ImageArea from './ImageArea';

class FlowArea extends React.Component {
	render() {
		return (
			<div>
				<ImageArea id="area_1" target="area_1" />
				<ImageArea id="area_2" target="area_2" />
			</div>
		);
	}
}

export default FlowArea;
