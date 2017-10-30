import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ConnectorModal from './ConnectorModal';

const areaTarget = {
    drop(props) {
        return { name: props.id };
    }
};

const style = {
    fontSize: '36px',
    width: '100%',
    minHeight: '1em',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center'
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class ImageArea extends React.Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
    };

    renderConnectors({ imageActions, id }) {
        const actions = imageActions[id];

        const last = _.findLast(actions);
        if (last)
            switch (last.type) {
                case 'abrir_imagem':
                    if (actions[0].type !== 'abrir_imagem') {
                        console.log('Não existe um abrir imagem');
                        return;
                    }
                    if (last.id !== 0) {
                        console.log('Já existe um abrir imagem');
                        return;
                    }
                    break;
                default:
                    break;
            }

        return _.map(actions.conectores, action => (
            <ConnectorModal key={action.id} {...action} />
        ));
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#F2F2F2';
        if (isActive) {
            backgroundColor = 'lightGray';
        } else if (canDrop) {
            backgroundColor = '#F2F2F2';
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                {this.renderConnectors(this.props)}
                <h3>{}</h3>
            </div>
        );
    }
}

function mapStateToProps({ imageActions }) {
    return { imageActions };
}

export default connect(mapStateToProps)(
    DropTarget('draggableButton', areaTarget, collect)(ImageArea)
);
