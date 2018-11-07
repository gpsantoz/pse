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

  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps){
    // if(nextProps.someValue!==this.props.someValue){
    //   //Perform some operation
    //   this.setState({someState: someValue });
    //   this.classMethod();
    // }
    console.log("will receive props")
    console.log(nextProps)
  }

  render() {
    const { loaders } = this.props
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <BrowserRouter>
          <div className="container" style={{ marginTop: '20px' }}>
            {/* <Header /> */}
            <div>
              {/* <Loader loading={loaders > 0} /> */}
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
  const { loaders } = loading

  return {
      loaders
  }
}

export default connect(mapStateToProps, null)(App)
