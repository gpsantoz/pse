import React from 'react';

const style = {
	node: {
		display: 'flex',
		fontSize: '16px',
		margin: '2px 0',
		borderLeft: '2px solid #d3d3d3'
	},
	arrowRight: {
		width: 0,
		height: 0,
		borderTop: '1em solid transparent',
		borderLeft: '1em solid #00897b',
		borderBottom: '1em solid transparent'
	},
	nodeContent: {
		height: '32px',
		fontSize: '13px',
		fontFamily: 'Roboto,sans-serif',
		fontWeight: '500',
		color: '#e0f2f1',
		lineHeight: '32px',
		padding: ' 0 12px',
		backgroundColor: '#00897b',
		cursor: 'pointer'
	}
};

class ButtonBlock extends React.Component {
	render() {
		const { content, onClick } = this.props;
		return (
			<div style={style.node}>
				<div style={style.nodeContent} onClick={onClick}>
					{content}
				</div>
			</div>
		);
	}
}

export default ButtonBlock;
