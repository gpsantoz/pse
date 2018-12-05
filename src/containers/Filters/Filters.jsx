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
import { Canvas, Morphological, Threshold, Interpolation, Substract, NumberParameter, Loader } from '../../components'
import { EROSION, DILATION, THRESHOLD, INTERPOLATION, SUBSTRACT_IMAGE, MEDIAN, GAUSSIAN } from '../../constants/filtersTypes'
import { removeLoading } from '../../actions/loading/loading';

class Filters extends React.Component {

  constructor(props){
    super(props)
    this.state = { loader: false }
  }

  componentDidUpdate(prevProps){
    const { filters, images, dispatch, loading } = this.props
    var that = this
    if(!images.processing){
    filters.blocks.forEach((filter, index) => {
      if(images[filter.id]){
        if(filter !== prevProps.filters.blocks[index] || images[filter.id-1] !== prevProps.images[filter.id-1]){
          setTimeout(function (theseArgs)
          {
            that.props.processImage(filter, images[filter.id-1].pixels, dispatch)
          }, 100)
        this.props.setProcessingStatus(true)
        this.props.addLoading()
        }

      }
      else{
        setTimeout(function (theseArgs)
          {
            that.props.processImage(filter, images[filter.id-1].pixels, dispatch)
          }, 100)
        this.props.setProcessingStatus(true)
        this.props.addLoading()
      }

    });
  }
  }

  renderParameters(filter, pixels){
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
        case _.snakeCase(THRESHOLD):
          return (
            <Threshold updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
        )
        case _.snakeCase(INTERPOLATION):
          return (
            <Interpolation pixels={pixels} updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
        )
        case _.snakeCase(SUBSTRACT_IMAGE):
        return (
            <Substract images={this.props.images} updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
      )
      case _.snakeCase(MEDIAN):
        return (
            <NumberParameter name='Radius' parameter='radius' updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
      )
      case _.snakeCase(GAUSSIAN):
        return (
            <NumberParameter name='Radius' parameter='radius' images={this.props.images} updateFilter={this.props.updateProcessingBlock} filter={filter} target={AREA_1}/>
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
        <Grid.Column className="preview-block" width={8} key={key}>
        <h4>Filter: {filter.name}</h4>
        <p>Image number: {filter.id}</p>
           <Canvas id={`image-preview-${filter.id}`} pixels={images[filter.id].pixels}/>
           <div className="image-parameters">
            {this.renderParameters(filter, images[filter.id].pixels)}
           </div>
        </Grid.Column>
      )
    }
    })
  }

  render() {
    const { filters, images, loading } = this.props
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
  setProcessingStatus: bindActionCreators(image.setProcessingStatus, dispatch),
  removeLoading: bindActionCreators(loading.removeLoading, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

