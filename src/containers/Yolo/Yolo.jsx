import _ from 'lodash';
import React from 'react';
import './style.css'
import * as tf from '@tensorflow/tfjs';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';

import { Webcam } from './webcam';

async function main(webcam) {
  try {
    ga();
    let model = await downloadModel();

    alert("Você precisará autorizar o uso da sua webcam :)");

    await webcam.setup();

    doneLoading();
    run(webcam, model);
  } catch(e) {
    console.error(e);
  }
};

async function run(webcam, model) {
  while (true) {
    const inputImage = webcam.capture();

    const t0 = performance.now();

    const boxes = await yolo(inputImage, model);

    inputImage.dispose();

    const t1 = performance.now();
    console.log("YOLO inference took " + (t1 - t0) + " milliseconds.");

    console.log('tf.memory(): ', tf.memory());

    clearRects();
    boxes.forEach(box => {
      const {
        top, left, bottom, right, classProb, className,
      } = box;

      drawRect(left, top, right-left, bottom-top,
        `${className} Confidence: ${Math.round(classProb * 100)}%`)
    });

    await tf.nextFrame();
  }
}

function drawRect(x, y, w, h, text = '', color = 'red') {
  const webcamElem = document.getElementById('webcam-wrapper');
  const rect = document.createElement('div');
  rect.classList.add('rect');
  rect.style.cssText = `top: ${y}; left: ${x}; width: ${w}; height: ${h}; border-color: ${color}`;

  const label = document.createElement('div');
  label.classList.add('label');
  label.innerText = text;
  rect.appendChild(label);

  webcamElem.appendChild(rect);
}

function clearRects() {
  const rects = document.getElementsByClassName('rect');
  while(rects[0]) {
    rects[0].parentNode.removeChild(rects[0]);
  }
}

function doneLoading() {
  const successElem = document.getElementById('success-message');
  successElem.style.display = 'block';

  const webcamElem = document.getElementById('webcam-wrapper');
  webcamElem.style.display = 'flex';
}

function ga() {
  if (process.env.UA) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', process.env.UA);
  }
}

class Yolo extends React.Component {

  componentDidMount(){
    const webcam = new Webcam(document.getElementById('webcam'));
    main(webcam)
  }

  render(){
    return(
      <div>
  <div className="wrapper">

    <div id="success-message" >
      Point me at something, but please be a bit patient while I try to figure out what it is!
      (Ex. person, keyboard, cell phone, car, pet, etc.)
    </div>
    <div className="webcam-ui-container">
      <div id="webcam-wrapper" >
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
