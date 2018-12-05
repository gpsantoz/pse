import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import './style.css'

const PSELoader = (props) => {
  console.log(props.loading)
  return (
    <Dimmer page active={props.loading}>
        <Loader className="loader" />
    </Dimmer>
  )
}

export default PSELoader