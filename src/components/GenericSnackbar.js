import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

export default class SnackbarExampleSimple extends React.Component {
	static propTypes = {
		btnLabel: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleTouchTap = () => {
		this.setState({
			open: true
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		return (
			<div>
				<Snackbar
					open={this.state.open}
					message={message}
					autoHideDuration={this.props.durarion || 4000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
	}
}
