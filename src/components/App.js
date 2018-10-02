import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Test from './Test';
import CustomFilter from './CustomFilter';
import FilterImage from './FilterImage';
import ScalingImage from './ScalingImage';
import FlowArea from './FlowArea';
import Histogram from './Histogram';
import LeftMenu from './LeftMenu';
import OpenImage from './OpenImage';
import Header from './Header';

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
                path="/custom/:target/:id"
                component={CustomFilter}
              />
              <Route exact path="/open/:target/" component={OpenImage} />
              <Route exact path="/filter/:target/:id" component={FilterImage} />
              <Route
                exact
                path="/scaling/:target/:id"
                component={ScalingImage}
              />
              <Route exact path="/histogram" component={Histogram} />
            </div>
          </div>
        </BrowserRouter>
      </DragDropContextProvider>
    );
  }
}

export default App;
