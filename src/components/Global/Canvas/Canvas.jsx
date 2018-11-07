import React from 'react';


import { writeImageData } from '../../../lib/web-dsp/WebDSP';

let style = {
  canvas: {
    maxWidth: '100%',
    maxHeight: '250px',
    width: 'auto',
    height: 'auto',
  },
};

class Canvas extends React.Component {

componentWillMount(){
  // const { styles } = this.props
  // style.canvas.maxHeight = styles.maxHeight
  // style.canvas.maxWidth = styles.maxWidth
}

setCanvas(){
  const { id, pixels } = this.props
  const canvas = document.getElementById(id);
  writeImageData(
    canvas,
    pixels.data,
    pixels.width,
    pixels.height
  );
}
componentDidMount(){
  this.setCanvas()
}

componentDidUpdate(){
  this.setCanvas()
}

render() {
  const { id } = this.props
  return (
    <div>
        <canvas id={id} style={style.canvas}/>
    </div>
  )
}

}
export default Canvas
