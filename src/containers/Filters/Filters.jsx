import _ from 'lodash';
import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Grid, Message, Button } from 'semantic-ui-react';
import LeftMenu from '../../components/LeftMenu';
import FlowArea from '../../components/FlowArea';
import * as actions from '../../actions';
import { AREA_1 } from '../../constants/actionTypes';

const Parameterization = () => {

}

class Filters extends React.Component {

  render() {
    return (
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
          <Button className="right floated" onClick={(e) => {
            e.preventDefault();
            this.props.removeAllProcessingBlocks(AREA_1);
          }}>Remover Filtros</Button>

          <h3>Parâmetros e Pré-Visualização</h3>
          
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

function mapStateToProps({ images, filters,  }) {
  return { images };
}

export default connect(mapStateToProps, actions)(Filters);

