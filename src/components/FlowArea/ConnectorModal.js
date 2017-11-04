import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import ButtonBlock from './ButtonBlock';
import { OPEN_IMAGE } from '../../actions/types';

class ConnectorModal extends React.Component {
	static propTypes = {
		id: PropTypes.number,
		type: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		history: PropTypes.object.isRequired
	};

	state = { modalOpen: false };

	handleOpenImage() {
		const { history, target } = this.props;
		history.push(`/open/${target}`);
	}

	handleFilter() {
		const { history, target, id } = this.props;
		history.push(`/filter/${target}/${id}`);
	}

	handleRemove() {
		this.props.removeProcessingBlock(this.props.id);
	}

	render() {
		const { type } = this.props;

		if (type === OPEN_IMAGE)
			return (
				<ButtonBlock
					content={type}
					onClick={this.handleOpenImage.bind(this)}
				/>
			);

		return (
			<ButtonBlock
				content={type}
				onClick={this.handleFilter.bind(this)}
			/>
		);
	}
}

export default connect(null, actions)(withRouter(ConnectorModal));
