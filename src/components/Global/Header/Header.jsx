import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
	state = { activeItem: 'PSE Image' };

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	};

	render() {
		const { activeItem } = this.state;

		return (
			<div>
				<Menu pointing secondary>
					<Link to="/">
						<Menu.Item
							as="span"
							name="PSE Image"
							active={activeItem === 'PSE Image'}
							onClick={this.handleItemClick}
						/>
					</Link>
					<Link to="/yolo">
						<Menu.Item
							as="span"
							name="Real Time YOLO"
							active={activeItem === 'Real Time YOLO'}
							onClick={this.handleItemClick}
						/>
					</Link>
				</Menu>
			</div>
		);
	}
}

export default withRouter(Header);
