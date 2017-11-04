import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Header from './Header';
import Test from './Test';
import LeftMenu from './LeftMenu/LeftMenu';
import FlowArea from './FlowArea/FlowArea';
import OpenImage from './OpenImage';
import Histogram from './Histogram';

const Content = () => {
	return (
		<Grid stackable celled>
			<Grid.Row>
				<Grid.Column width={4}>
					<LeftMenu />
				</Grid.Column>
				<Grid.Column width={12}>
					<FlowArea />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

class App extends Component {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<BrowserRouter>
					<div className="container" style={{ marginTop: '20px' }}>
						<Header />
						<div>
							<Route exact path="/" component={Content} />
							<Route exact path="/test" component={Test} />
							<Route
								exact
								path="/open/:target/"
								component={OpenImage}
							/>
							<Route
								exact
								path="/filter/:target/:id"
								component={Test}
							/>
							<Route
								exact
								path="/histogram"
								component={Histogram}
							/>
						</div>
					</div>
				</BrowserRouter>
			</DragDropContextProvider>
		);
	}
}

export default App;
