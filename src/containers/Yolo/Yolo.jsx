import _ from 'lodash';
import React from 'react';
import './style.css'
import * as tf from '@tensorflow/tfjs';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';

import { Webcam } from './webcam';

let rects = []

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

      alert("Você precisará autorizar o uso da sua webcam :)");

      await webcam.setup();

      this.doneLoading();
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
    const webcamElem = document.getElementById('webcam-wrapper');
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

  doneLoading = () => {
    const successElem = document.getElementById('success-message');
    successElem.style.display = 'block';

    const webcamElem = document.getElementById('webcam-wrapper');
    webcamElem.style.display = 'flex';
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
    this.main()
  }

  render(){
    console.log('render rects')
    return(
      <div>
  <div className="wrapper">

    <div id="success-message" >
      Point me at something, but please be a bit patient while I try to figure out what it is!
      (Ex. person, keyboard, cell phone, car, pet, etc.)
    </div>
    <div className="webcam-ui-container">
      <div id="webcam-wrapper" >
        {this.state.rects.map((rect, key) => {
          console.log(rect)
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
  </div>
    )
  }
}

export default Yolo
