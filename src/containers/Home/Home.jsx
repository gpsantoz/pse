import _ from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import LeftMenu from '../../components/LeftMenu'
import FlowArea from '../../components/FlowArea'
import { Stepper, ImageUploader, Result } from '../'
import { Logo } from '../../components'

class Home extends React.Component {

  state = {
    step: 1
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
          <Grid stackable celled>
            <Grid.Row centered>
              <Grid.Column width={4}>
                <LeftMenu />
              </Grid.Column>
              <Grid.Column width={12}>
                <FlowArea />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      case 2:
        return (
          <Grid stackable celled>
            <Grid.Row centered>
              <Result />
            </Grid.Row>
          </Grid>
        )
    }
  }

  render(){
    console.log(this.props)
    return(
      <Grid stackable celled>
      <Grid.Row>
        <Grid.Column width={16}>
          <Logo />
          <Stepper handleClick={this.setStep.bind(this)} />
          {this.content()}
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
}

export default Home
