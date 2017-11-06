import React from 'react';
import { Message } from 'semantic-ui-react';
import ImageArea from './ImageArea';
import { AREA_1, AREA_2 } from '../../actions/types';

const style = {
	container: {
		marginTop: '20px'
	}
};

class FlowArea extends React.Component {
	render() {
		return (
			<div>
				<Message floating style={style.container}>
					<Message.Header>Fluxos de edição</Message.Header>
					<p>
						Arraste um dos blocos ao lado e solte em um dos fluxos abaixo.
						<br />Cada fluxo necessita de um bloco de abrir a imagem para que
						outros blocos sejam adicionados.
					</p>
				</Message>
				<ImageArea id={AREA_1} target={AREA_1} />
				<ImageArea id={AREA_2} target={AREA_2} />
			</div>
		);
	}
}

export default FlowArea;
