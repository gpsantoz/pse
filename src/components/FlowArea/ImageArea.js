import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ConnectorModal from './ConnectorModal';

const areaTarget = {
    drop(props) {
        return { name: props.id };
    },
};

const style = {
    height: '3rem',
    width: '100%',
    marginRight: '1.5rem',
    marginBottom: '1.5rem'
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
        canDrop: PropTypes.bool.isRequired,
    };

    renderConnectors({ imageAreas, id }) {
        const connectors = _.filter(imageAreas, con => {
            return con.target === id;
        });
        return _.map(connectors, img => <ConnectorModal key={img.id} {...img} />)
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

        //console.log(this.props.imageAreas);
        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                {this.renderConnectors(this.props)}
                <h3>{}</h3>
            </div>
        );
    }
}

function mapStateToProps({ imageAreas }) {
    return { imageAreas };
}

export default connect(mapStateToProps)(DropTarget('draggableButton', areaTarget, collect)(ImageArea));