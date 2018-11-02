import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const PSELoader = (props) => {
    console.log(props)
  return (
    <Dimmer active={props.loading}>
        <Loader />
    </Dimmer>
  )
}

export default PSELoader