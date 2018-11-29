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

    alert("Just a heads up! We'll ask to access your webcam so that we can " +
      "detect objects in semi-real-time. \n\nDon't worry, we aren't sending " +
      "any of your images to a remote server, all the ML is being done " +
      "locally on device, and you can check out our source code on Github.");

    await webcam.setup();

    doneLoading();
    run(webcam, model);
  } catch(e) {
    console.error(e);
    showError();
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

const webcamElem = document.getElementById('webcam-wrapper');

function drawRect(x, y, w, h, text = '', color = 'red') {
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
  const elem = document.getElementById('loading-message');
  elem.style.display = 'none';

  const successElem = document.getElementById('success-message');
  successElem.style.display = 'block';

  const webcamElem = document.getElementById('webcam-wrapper');
  webcamElem.style.display = 'flex';
}

function showError() {
  const elem = document.getElementById('error-message');
  elem.style.display = 'block';
  doneLoading();
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

    <div className="logo-wrapper">
      <a href="https://modeldepot.io/?ref=tfjs-yolo-tiny-demo" target="_blank" rel="noopener noreferrer">
        <img className="logo" src="assets/ModelDepot-logo.png"></img>
      </a>
    </div>
    <div id="loading-message">
      Loading Skynet (This may take a minute, 40mb)...
      <div>
        <img className="spin" src="assets/logo.png"></img>
      </div>
    </div>
    <div id="error-message" >
      Sorry! An error occured while loading the model 😢

    </div>
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
    <div >
      <a href='https://modeldepot.io/mikeshi/tiny-yolo-in-javascript' target="_blank" rel="noopener noreferrer">
        <img src='https://img.shields.io/badge/ModelDepot-Pre--trained_Model-3d9aff.svg' ></img>
      </a>
    </div>
    </div>
  </div>
    )
  }
}

export default Yolo
