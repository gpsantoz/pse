import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Test from './Test';
import CustomFilter from './CustomFilter';
import FilterImage from './FilterImage';
import ScalingImage from './ScalingImage';
import MorphologicalFiltering from './MorphologicalFiltering';
import { Home } from '../containers';
import { Loader } from '../components';

class App extends Component {

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render() {
    const { loaders, hasLoading } = this.props
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <BrowserRouter>
          <div className="container" style={{ marginTop: '20px' }}>
            {/* <Header /> */}
            <div>
              <Loader loading={loaders > 0 && hasLoading} />
              <Route exact path="/" component={Home} />
              <Route exact path="/test" component={Test} />
              <Route
                exact
                path="/custom/:target/:id"
                component={CustomFilter}
              />
              <Route exact path="/filter/:target/:id" component={FilterImage} />
              <Route
                exact
                path="/scaling/:target/:id"
                component={ScalingImage}
              />
              <Route exact path="/morphological/:target/:id" component={MorphologicalFiltering} />
              {/* <Route exact path="/histogram" component={Histogram} /> */}
            </div>
          </div>
        </BrowserRouter>
      </DragDropContextProvider>
    );
  }
}

const mapStateToProps = ({ loading }) => {
  const { loaders, hasLoading } = loading

  return {
      loaders,
      hasLoading
  }
}

export default connect(mapStateToProps, null)(App)
