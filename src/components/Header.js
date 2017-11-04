import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

// const PATHS = {
//     home: {
//         name: 'home',
//         url: '/'
//     },
//     openImage: {
//         name: 'Carrega Imagem',
//         url: /\/(open)\/([a-zA-Z_0-9])+/g
//     }

// };

class Header extends React.Component {
	state = { activeItem: 'home' };

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
							name="home"
							active={activeItem === 'home'}
							onClick={this.handleItemClick}
						/>
					</Link>
					<Link to="/test">
						<Menu.Item
							as="span"
							name="test"
							active={activeItem === 'test'}
							onClick={this.handleItemClick}
						/>
					</Link>
					<Link to="/histogram">
						<Menu.Item
							as="span"
							name="histogram"
							active={activeItem === 'histogram'}
							onClick={this.handleItemClick}
						/>
					</Link>
					{/*<Menu.Menu position='right'>
						<Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
					</Menu.Menu>*/}
				</Menu>
			</div>
		);
	}
}

export default withRouter(Header);
