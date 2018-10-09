import _ from 'lodash';
import React from 'react';
import './style.css'

class Stepper extends React.Component {

  render(){
    const handleClick = this.props.handleClick;
    console.log(this.props)
    return(
        <div class="ui three steps">
      <div class="link step" onClick={(e) => {
        e.preventDefault()
        handleClick(0)
      }}>
        <i class="upload icon"></i>
        <div class="content">
          <div class="title">Upload</div>
          <div class="description">Escolha a imagem</div>
        </div>
      </div>
      <div class="link step" onClick={(e) => {
        e.preventDefault()
        handleClick(1)
      }}>
      <i class="list ol icon"></i>
        <div class="content">
          <div class="title">Filtros</div>
          <div class="description">Adicione os blocos dos filtros</div>
        </div>
      </div>
      <div class="link step" onClick={(e) => {
        e.preventDefault()
        handleClick(2)
      }}>
      <i class="list ol icon"></i>
        <div class="content">
          <div class="title">Resultado</div>
          <div class="description">Veja a imagem processada</div>
        </div>
      </div>
    </div>
    )
  }
}

export default Stepper
