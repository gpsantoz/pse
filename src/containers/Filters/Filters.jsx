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
import { Canvas, Morphological, Loader } from '../../components'
import { EROSION, DILATION } from '../../constants/filtersTypes'
import { removeLoading } from '../../actions/loading/loading';

class Filters extends React.Component {

  constructor(props){
    super(props)
    this.state = { loaders: 0 }
  }

  componentDidUpdate(prevProps){
    const { filters, images, dispatch } = this.props
    filters.blocks.forEach((filter, index) => {
      if(images[filter.id]){
        if(filter !== prevProps.filters.blocks[index] || images[filter.id-1] !== prevProps.images[filter.id-1]){
          //this.props.addLoading()
          console.log("increase loaders")
          this.setState({loaders: this.state.loaders+1})
          console.log("will process image")
          this.props.processImage(filter, images[filter.id-1].pixels, dispatch)
          console.log("processed image")
        } 
      }
      else{
        //this.props.addLoading()
        console.log("increase loaders")
        this.setState({loaders: this.state.loaders+1})
        console.log("will process image")
        this.props.processImage(filter, images[filter.id-1].pixels, dispatch)
        console.log("processed image")
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
    console.log("render filters")
    console.log(this.state.loaders)
    const { filters, images, loading } = this.props
    return (
      <Grid stackable celled>
      <Loader loading={this.state.loaders > 0} />
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
            {}
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

function mapStateToProps({ images, filters, loading }) {
  return { images, filters, loading };
}

const mapDispatchToProps = (dispatch) => ({
  removeAllProcessingBlocks: bindActionCreators(filtersActions.removeAllProcessingBlocks, dispatch),
  updateProcessingBlock: bindActionCreators(filtersActions.updateProcessingBlock, dispatch),
  processImage: bindActionCreators(image.processImage, dispatch),
  addLoading: bindActionCreators(loading.addLoading, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

