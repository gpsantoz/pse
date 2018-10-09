import _ from 'lodash';
import React from 'react';
import './style.css'
import { Grid, Message } from 'semantic-ui-react';
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
						<Message floating>
							<Message.Header>Fluxos de edição</Message.Header>
							<p>
								Arraste um dos blocos ao lado e solte em um dos fluxos abaixo.
								<br />
							</p>
						</Message>

          <FlowArea />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

export default Filters
