import _ from 'lodash';
import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Grid, Message, Button } from 'semantic-ui-react';
import LeftMenu from '../../components/LeftMenu';
import FlowArea from '../../components/FlowArea';
import * as actions from '../../actions';
import { AREA_1 } from '../../constants/actionTypes';

const Parameterization = ({parameters, filters}) => {
  console.log(parameters)
  console.log(filters[AREA_1])

  return(
    <Grid.Row centered>
        <Grid.Column width={8}>
          parametros
        </Grid.Column>

        <Grid.Column width={8}>
          imagem
        </Grid.Column>
    </Grid.Row>
  )
}

class Filters extends React.Component {

  render() {
    const { filters } = this.props
    
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

          <div className={filters[AREA_1][0] ? '' : 'hidden'}>
          <h3>Parâmetros e Pré-Visualização</h3>
          < Parameterization parameters={this.props.parameters} filters={this.props.filters}/>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

function mapStateToProps({ images, filters }) {
  return { images, filters };
}

export default connect(mapStateToProps, actions)(Filters);

