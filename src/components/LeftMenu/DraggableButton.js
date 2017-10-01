import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const buttonSource = {
    beginDrag(props) {
        return {
            name: _.snakeCase(props.label),
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            props.addProcessingBlock(_.snakeCase(item.name), _.snakeCase(dropResult.name));
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class DraggableButton extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    };

    render() {
        const { isDragging, connectDragSource } = this.props;
        const { color, label } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return (
            connectDragSource(
                <div>
                    <Button basic color={color} style={{ width: 200, opacity }}>{label}</Button>
                </div>
            )
        );
    }
}

//export default DragSource('draggableButton', buttonSource, collect)(connect(null, actions)(DraggableButton));
export default connect(null, actions)(DragSource('draggableButton', buttonSource, collect)(DraggableButton));