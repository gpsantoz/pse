import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';

class ConnectorModal extends React.Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleRemove = () => {
        this.props.removeProcessingBlock(this.props.id);
        this.setState({ modalOpen: false });
    }

    render() {
        const { type } = this.props;
        return (
            <Modal
                trigger={<Button secondary onClick={this.handleOpen} >{type}</Button>}
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
            </Modal >
        )
    }
}

export default connect(null, actions)(ConnectorModal);