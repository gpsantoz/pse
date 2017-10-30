import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ConnectorModal from './ConnectorModal';
import { OPEN_IMAGE } from '../../actions/types';

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
		const actions = _.filter(imageActions[id], action => {
			if (!action) return;
			return !!action.id || action.id === 0;
		});

		const openFileConnector = !!imageActions[id][OPEN_IMAGE] ? (
			<ConnectorModal key={OPEN_IMAGE} type={OPEN_IMAGE} />
		) : (
			''
		);

		// const writeFileConnector = !!imageActions[id][WRITE_FILE] ? (<ConnectorModal key={WRITE_FILE} type={WRITE_FILE} />) : ('');

		const ret = [
			openFileConnector,
			..._.map(actions, action => (
				<ConnectorModal key={action.id} {...action} actions={actions} />
			))
		];

		return ret;
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
