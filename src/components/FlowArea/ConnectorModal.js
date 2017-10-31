import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import ButtonBlock from './ButtonBlock';
import OpenImageModal from './OpenImageModal';
import { OPEN_IMAGE } from '../../actions/types';

class ConnectorModal extends React.Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		actions: PropTypes.array.isRequired
	};

	state = { modalOpen: false };

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	handleRemove = () => {
		this.props.removeProcessingBlock(this.props.id);
		this.setState({ modalOpen: false });
	};

	renderTriggerButton = type => {
		return <ButtonBlock content={type} onClick={this.handleOpen} />;
	};

	render() {
		const { type } = this.props;

		if (type === OPEN_IMAGE) return <OpenImageModal type={type} />;

		return (
			<Modal
				trigger={this.renderTriggerButton(type)}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				basic
				size="small"
			>
				<Header icon="pencil" content="Propriedades" />
				<Modal.Content>
					<h3>Edite as propriedades desse conector.</h3>
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

export default connect(null, actions)(ConnectorModal);
