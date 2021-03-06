import _ from 'lodash';
import React from 'react';
import {ORIGINAL_IMAGE} from '../../../constants/imageTypes'
import './style.css'

class Stepper extends React.Component {

  state = {
    images: {}
  }
  styleStep(element, images){
    switch(element)
    {
      case 0:
        return images[ORIGINAL_IMAGE] ? 'completed' : ''
      case 1:
        return images[ORIGINAL_IMAGE] ? '' : 'disabled'
      default:
        return ''
    }
  }

  componentDidMount(){
  }

  render(){
    const images = this.props.images
    const handleClick = this.props.handleClick
    return(
        <div className="ui three steps">
      <div className={`link step ${this.props.step == 0 ? 'active' : ''} ${this.styleStep(0, images)}`} onClick={(e) => {
        e.preventDefault()
        handleClick(0)
      }}>
        <i className="upload icon"></i>
        <div className="content">
          <div className="title">Upload</div>
          <div className="description">Escolha a imagem</div>
        </div>
      </div>
      <div className={`link step ${this.props.step == 1 ? 'active' : ''} ${this.styleStep(1, images)}`} onClick={(e) => {
        e.preventDefault()
        handleClick(1)
      }}>
      <i className="list ol icon"></i>
        <div className="content">
          <div className="title">Filtros</div>
          <div className="description">Adicione os blocos dos filtros</div>
        </div>
      </div>
      <div className={`link step ${this.props.step == 2 ? 'active' : ''}${this.styleStep(1, images)}`} onClick={(e) => {
        e.preventDefault()
        handleClick(2)
      }}>
      <i className="image icon"></i>
        <div className="content">
          <div className="title">Resultado</div>
          <div className="description">Veja a imagem processada</div>
        </div>
      </div>
    </div>
    )
  }
}

export default Stepper
