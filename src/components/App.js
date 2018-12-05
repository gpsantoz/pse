import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Home, Yolo } from '../containers';
import { Loader, Header } from '../components';

class App extends Component {

  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    const { loaders } = this.props
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <BrowserRouter>
          <div className="container" style={{ marginTop: '20px' }}>
            <Header />
            <div>
              <Loader loading={loaders > 0} />
              <Route exact path="/" component={Home} />
              <Route exact path="/yolo" component={Yolo} />
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
