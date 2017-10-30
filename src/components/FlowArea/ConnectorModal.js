import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import ButtonBlock from './ButtonBlock';

class ConnectorModal extends React.Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleRemove = () => {
        this.props.removeProcessingBlock(this.props.id);
        this.setState({ modalOpen: false });
    }

    renderTriggerButton = (type) => {
        return (
            <ButtonBlock content={type} onClick={this.handleOpen}></ButtonBlock>
        )
    }

    render() {
        const { type } = this.props;
        return (
            <Modal
                trigger={this.renderTriggerButton(type)}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Header icon='pencil' content='Propriedades' />
                <Modal.Content>
                    <h3>Edite as propriedades desse conector.</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Salvar
                    </Button>
                    <Button color='green' onClick={this.handleRemove.bind(this)} inverted>
                        <Icon name='trash' /> Remove
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default connect(null, actions)(ConnectorModal);