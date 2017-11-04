import _ from 'lodash';
import React from 'react';
import { Input, Grid } from 'semantic-ui-react';
import ProcessingGroup from './ProcessingGroup';
import groups from './buttons';

const style = {
	input: {
		marginBottom: '15px',
		width: '100%'
	}
};

class LeftMenu extends React.Component {
	state = {
		groups: groups
	};

	renderGroups() {
		return _.map(this.state.groups, group => {
			return <ProcessingGroup key={group.label} group={group} />;
		});
	}

	handleSearch(event, data) {
		if (!data.value) this.setState({ groups });

		const filter = _.map(groups, group => {
			return {
				...group,
				buttons: _.filter(group.buttons, button => {
					return _.toUpper(button.label).includes(
						_.toUpper(data.value)
					);
				})
			};
		});

		this.setState({ groups: filter });
	}

	render() {
		return (
			<div>
				<Input
					icon="search"
					placeholder="Buscar..."
					style={style.input}
					onChange={this.handleSearch.bind(this)}
				/>
				<Grid
					style={{
						overflowX: 'hidden',
						overflowY: 'scroll',
						height: window.innerHeight - 90 + 'px'
					}}
				>
					<Grid.Row columns={1}>
						{this.renderGroups.apply(this)}
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default LeftMenu;
