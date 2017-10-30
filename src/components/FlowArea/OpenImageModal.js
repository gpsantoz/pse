import React from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import ButtonBlock from './ButtonBlock';

class OpenImageModal extends React.Component {
	state = { modalOpen: false };

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	handleRemove = () => {
		//this.props.removeProcessingBlock(this.props.id);
		this.setState({ modalOpen: false });
	};

	renderTriggerButton = type => {
		return <ButtonBlock content={type} onClick={this.handleOpen} />;
	};

	render() {
		const { type } = this.props;
		return (
			<Modal
				trigger={this.renderTriggerButton(type)}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				basic
				size="small"
			>
				<Header icon="pencil" content="Open Image" />
				<Modal.Content>
					<h3>Conteúdo</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" onClick={this.handleClose} inverted>
						<Icon name="checkmark" /> Salvar
					</Button>
					<Button
						color="green"
						onClick={this.handleRemove.bind(this)}
						inverted
					>
						<Icon name="trash" /> Remove
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default OpenImageModal;
