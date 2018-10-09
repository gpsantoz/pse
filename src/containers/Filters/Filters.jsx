import _ from 'lodash';
import React from 'react';
import './style.css'
import { Grid } from 'semantic-ui-react';
import LeftMenu from '../../components/LeftMenu'
import FlowArea from '../../components/FlowArea'

class Filters extends React.Component {

  render(){
    return(
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
  }
}

export default Filters
