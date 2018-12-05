import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ConnectorModal from './ConnectorModal';
import { OPEN_IMAGE } from '../../../constants/actionTypes';
import { ORIGINAL_IMAGE } from '../../../constants/imageTypes';

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
		canDrop: monitor.canDrop(),
	};
}

class ImageArea extends React.Component {
	static propTypes = {
		target: PropTypes.string.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	};

	renderConnectors({ filters, target }) {
		const actions = _.filter(filters[target], action => {
			if (!action) return;
			return !!action.id || action.id === 0;
		});

		const openFileConnector = !!filters[target][OPEN_IMAGE] ? (
			<ConnectorModal key={OPEN_IMAGE} type={OPEN_IMAGE} target={ORIGINAL_IMAGE} />
		) : (
				''
			);

		const ret = [
			openFileConnector,
			..._.map(actions, action => (
				<ConnectorModal
					key={action.id}
					{...action}
					target={ORIGINAL_IMAGE}
					actions={actions}
				/>
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

			<div>
				<h3>Fluxo</h3>
				<div style={{ ...style, backgroundColor }}>
					{this.renderConnectors(this.props)}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ filters }) {
	return { filters };
}

export default connect(mapStateToProps)(
	DropTarget('draggableButton', areaTarget, collect)(ImageArea)
);
