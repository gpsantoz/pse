import React from 'react';
import { Message, Grid, Image } from 'semantic-ui-react';
import ImageArea from './ImageArea';
import { AREA_1, AREA_2 } from '../../actions/types';

class FlowArea extends React.Component {
	render() {
		return (
			<Grid>

				<Grid.Row>
					<Grid.Column>
						<Message floating>
							<Message.Header>Fluxos de edição</Message.Header>
							<p>
								Arraste um dos blocos ao lado e solte em um dos fluxos abaixo.
								<br />
							</p>
						</Message>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<ImageArea id={AREA_1} target={AREA_1} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default FlowArea;
