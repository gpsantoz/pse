import _ from 'lodash';
import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Grid, Message, Button } from 'semantic-ui-react';
import LeftMenu from '../../components/Filters/LeftMenu';
import FlowArea from '../../components/Filters/FlowArea';
import { bindActionCreators } from 'redux'
import { filtersActions, image, loading } from '../../actions';
import { AREA_1 } from '../../constants/actionTypes';
import { Canvas, Morphological } from '../../components'

import { EROSION, DILATION } from '../../constants/filtersTypes'

import CoreDSP from '../../lib/web-dsp/CoreDSP';

const Parameterization = ({filter, image, blocks}) => {
  // console.log(filter)
  // const canvas = document.getElementById('image-preview-'+filter.id);
  // const { pixels } = images[filter.id];

  // writeImageData(
  //   canvas,
  //   pixels.data,
  //   pixels.width,
  //   pixels.height
  // );

  return(
    <Grid.Row centered>
        <Grid.Column width={8}>
          parametros
        </Grid.Column>


    </Grid.Row>
  )
}

class Filters extends React.Component {

  componentDidMount(){

  }

  componentDidUpdate(prevProps){
    const { filters, images, dispatch } = this.props
    filters.blocks.forEach((filter, index) => {
      console.log('update')
      if(images[filter.id]){
        console.log(prevProps.filters)
        console.log(filters)
        console.log('comparing filters')
        if(filter != prevProps.filters.blocks[index]){
          console.log(' not equal 1')
          this.props.addLoading()
          this.props.processImage(filter, images[filter.id-1].pixels, dispatch)
        }else if(!_.isEqual(filter.parameters, prevProps.filters.blocks[index].parameters)){
          console.log('not equal 2')
          this.props.addLoading()
          this.props.processImage(filter, images[filter.id-1].pixels, dispatch)
        }
      }
      else{
        this.props.addLoading()
        this.props.processImage(filter, images[filter.id-1].pixels, dispatch)
      }
    });
  }

  renderParameters(filter){
    if (filter.type) {
      switch (filter.type) {
        case _.snakeCase(EROSION):
          return (
            <Morphological updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1} />
          )
        case _.snakeCase(DILATION):
        return (
          <Morphological updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
        )
        default:
          break;
      }
    }
  }

  renderPreviews = (filters, images) => {
    return filters.blocks.map((filter, key) => {
      // console.log(images[filter.id].pixels)
      if(images[filter.id]){
      return (
        // < Parameterization key={key} filter={filter}/>
        <Grid.Column width={8} key={key}>
        <h4>Filtro: {filter.name}</h4>
           <Canvas id={`image-preview-${filter.id}`} pixels={images[filter.id].pixels}/>
           {this.renderParameters(filter)}
        </Grid.Column>
      )
    }
    })
  }

  render() {
    const { filters, images } = this.props
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

          <div className={filters[AREA_1][1] ? '' : 'hidden'}>

            {/* <h3>Parâmetros e Pré-Visualização</h3> */}
            {
              this.renderPreviews(filters, images)
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
  updateProcessingBlock: bindActionCreators(filtersActions.updateProcessingBlock, dispatch),
  processImage: bindActionCreators(image.processImage, dispatch),
  addLoading: bindActionCreators(loading.addLoading, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

