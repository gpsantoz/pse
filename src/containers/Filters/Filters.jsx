import _ from 'lodash';
import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Grid, Message, Button } from 'semantic-ui-react';
import LeftMenu from '../../components/LeftMenu';
import FlowArea from '../../components/FlowArea';
import { bindActionCreators } from 'redux'
import { filtersActions } from '../../actions';
import { AREA_1 } from '../../constants/actionTypes';

const Parameterization = ({filter}) => {
  console.log(filter)
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

  componentDidMount(){

  }

  renderPreviews = (filters) => {
    return filters.map((filter, key) => {
      return (
        < Parameterization key={key} filter={filter}/>
      )
    }) 
  }

  render() {
    const { filters } = this.props
    console.log(filters)
    console.log("renderizou")
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
            {
              this.renderPreviews(this.props.filters.blocks)
            }

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

const mapDispatchToProps = (dispatch) => ({
  removeAllProcessingBlocks: bindActionCreators(filtersActions.removeAllProcessingBlocks, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

