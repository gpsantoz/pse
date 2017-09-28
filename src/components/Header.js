import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper container">
					<a href="#" className="brand-logo">
						Logo
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<a href="#">Teste</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
