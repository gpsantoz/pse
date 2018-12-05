import _ from 'lodash';
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import './style.css'
import * as tf from '@tensorflow/tfjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loading } from '../../actions';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';
import { Webcam } from '../../lib/webcam';
import PSE_YOLO_LOGO from '../../assets/images/pse_yolo.png'

class Yolo extends React.Component {

  constructor(props){
    super(props)
    this.state = { rects: [] }
  }
  main = async () => {
    try {
      this.ga();
      let model = await downloadModel();
      const webcam = new Webcam(document.getElementById('webcam'));
      //alert("Você precisará autorizar o uso da sua webcam :)");
      await webcam.setup();

      this.props.removeLoading()
      this.run(webcam, model);
    } catch(e) {
      console.error(e);
    }
  }

  run = async (webcam, model) => {
    while (true) {
      const inputImage = webcam.capture();

      const t0 = performance.now();

      const boxes = await yolo(inputImage, model);

      inputImage.dispose();

      const t1 = performance.now();
      console.log("YOLO inference took " + (t1 - t0) + " milliseconds.");

      console.log('tf.memory(): ', tf.memory());

      this.clearRects();
      boxes.forEach(box => {
        const {
          top, left, bottom, right, classProb, className,
        } = box;

        this.drawRect(left, top, right-left, bottom-top,
          `${className} Confidence: ${Math.round(classProb * 100)}%`)
      });

      await tf.nextFrame();
    }
  }

  drawRect = async (x, y, w, h, text = '', color = 'red') => {
    var newRect = {
      style: {
      top: y,
      left: x,
      width: w,
      height: h,
      borderColor: color},
      text: text
    };
    this.setState(prevState => ({
      rects: [...prevState.rects, newRect]
    }))
  }

  clearRects = () => {
    this.setState({rects: []})
  }

  ga = () => {
    if (process.env.UA) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', process.env.UA);
    }
  }

  componentDidMount(){
    this.props.addLoading()
    this.main()
  }

  render(){
    return(
       <Grid stackable>
       <Grid.Row centered>
       <Grid.Column width={16}>

  <div className="wrapper">

    <div id="success-message" >
    <Image src={PSE_YOLO_LOGO} width={500} centered />
      <div className="yolo-description">Detecção de Objetos em Tempo Real utilizando YOLO. Basta autorizar o acesso à webcam e esperar que a imagem seja processada.</div>
    </div>
    <div className="webcam-ui-container">
      <div id="webcam-wrapper" >
        {this.state.rects.map((rect, key) => {
          return (
            <div className="rect" style={rect.style}>
              <div className="label">
                {rect.text}
              </div>
            </div>
          )
        })
        }
        <video autoPlay playsInline muted
          id="webcam" width="416" height="416">
        </video>
      </div>
    </div>
    </div>
     </Grid.Column>
     </Grid.Row>
     </Grid>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLoading: bindActionCreators(loading.addLoading, dispatch),
  removeLoading: bindActionCreators(loading.removeLoading, dispatch),
})

export default connect(null, mapDispatchToProps)(Yolo);

