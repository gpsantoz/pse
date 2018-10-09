import _ from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Stepper, ImageUploader, Filters, Result } from '../'
import { Logo } from '../../components'

class Home extends React.Component {

  state = {
    step: 0
  }

  setStep(stepNumber){
    this.setState({step: stepNumber})
  }

  content(){
    switch(this.state.step){
      case 0:
        return (
          <Grid>
            <Grid.Row centered>
              <ImageUploader />
            </Grid.Row>
          </Grid>
        )
      case 1:
        return (
            <Filters />
        )
      case 2:
        return (
          <Grid>
            <Grid.Row centered>
              <Result />
            </Grid.Row>
          </Grid>
        )
    }
  }

  render(){
    console.log(this.props)
    console.log("home")
    return(
      <Grid stackable celled>
      <Grid.Row>
        <Grid.Column width={16}>
          <Logo />
          <Stepper handleClick={this.setStep.bind(this)} step={this.state.step} images={this.props.images || {}} />
          {this.content()}
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps({ images }) {
  return { images };
}

export default connect(mapStateToProps, actions)(Home)
