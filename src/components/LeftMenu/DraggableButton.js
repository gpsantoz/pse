import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
	ERRO_FORMATO_ARQUIVO_BMP,
} from '../../Constants';

const buttonSource = {
  beginDrag(props) {
    return {
      name: _.snakeCase(props.label),
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      const type = _.snakeCase(item.name);
      const target = _.snakeCase(dropResult.name);
      switch (type) {
        case 'abrir_imagem':
          props.addOpenImageBlock(type, target);
          break;
        case 'gravar_arquivo':
          props.addWriteFileBlock(type, target);
          break;
        default:
          props.addProcessingBlock(type, target);
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
    // const obj = Object.values(this.props.imageActions.fluxo_1);
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
        {
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
        }

      </div>
    );
  }
}

function mapStateToProps({ images, imageActions }) {
  return { images, imageActions };
}

export default connect(mapStateToProps, actions)(
  DragSource('draggableButton', buttonSource, collect)(DraggableButton)
);
