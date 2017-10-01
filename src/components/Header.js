import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
	state = { activeItem: 'home' };

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	}

	render() {
		const { activeItem } = this.state;

		return (
			<div>
				<Menu pointing secondary>
					<Link to='/'>
						<Menu.Item as='span' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
					</Link>
					<Link to='/test'>
						<Menu.Item as='span' name='test' active={activeItem === 'test'} onClick={this.handleItemClick} />
					</Link>
					{/*<Menu.Menu position='right'>
						<Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
					</Menu.Menu>*/}
				</Menu>
			</div>
		);
	}
}

export default Header;
