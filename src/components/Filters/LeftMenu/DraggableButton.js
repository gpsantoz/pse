import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { filtersActions } from '../../actions'
import { bindActionCreators } from 'redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import {
// 	ERRO_FORMATO_ARQUIVO_BMP,
// } from '../../constants/Constants';

const buttonSource = {
  beginDrag(props) {
    return {
      name: props.label,
      parameters: props.parameters
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      const type = _.snakeCase(item.name);
      const target = _.snakeCase(dropResult.name);
      //CHECK PARAMETERS
      switch (type) {
        case 'gravar_arquivo':
          props.addWriteFileBlock(type, target);
          break;
        default:
          props.addProcessingBlock(type, target, item.name, item.parameters);
          break;
      }
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class DraggableButton extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };
  state = {
    openModal: false,
  }

  componentWillReceiveProps() {
    if (this.props.label === 'Filtro Morfólogico' && this.props.isDragging) {
      const pertence = this.binaryImage();
        if (!pertence) {
          this.setState({
            openModal: true,
          });
        }
    }
  }


	binaryImage = () => {
    const vet = this.props.images.fluxo_1.pixels;
    for (let i = 0; i < vet.height * vet.width; i++) {
      if (vet.data[i] !== 0 && vet.data[i] !== 255) {
        return false;
      }
    }
    return true;
  };

  handleClose = () => {
    // const obj = Object.values(this.props.filters.fluxo_1);
    // const id = obj[obj.length - 1] - 1;
    // console.log(id);
    // this.props.removeProcessingBlock('filtro_morfologico', id);
    this.setState({ openModal: false });
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { color, label } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(
      <div>
        <Button basic color={color} style={{ width: 200, opacity }}>
          {label}
        </Button>
        {/* {
          this.state.openModal ?
          <Dialog
            open
            onClose={this.handleClose}
          >
            <DialogContent>
              <DialogContentText>
                {ERRO_FORMATO_ARQUIVO_BMP}
              </DialogContentText>
            </DialogContent>
          </Dialog>     : null
        } */}

      </div>
    );
  }
}

function mapStateToProps({ images, filters }) {
  return { images, filters };
}

function mapDispatchToProps(dispatch) {
  return {
    addWriteFileBlock: bindActionCreators(filtersActions.addWriteFileBlock, dispatch),
    addProcessingBlock: bindActionCreators(filtersActions.addProcessingBlock, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DragSource('draggableButton', buttonSource, collect)(DraggableButton)
);
