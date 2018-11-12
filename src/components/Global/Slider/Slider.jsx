import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'react-semantic-ui-range'
import 'semantic-ui-css/semantic.min.css';
import {Segment,Grid,Label,Input} from 'semantic-ui-react';
 
export default class RangeSlider extends Component{
  constructor(props){
    super(props);
    this.state={
      value1: this.props.value,
      value: 0
    }
  }
 
  handleValueChange(e, {value}){
 
    this.setState({
      value: value
    })

  }
 
  render(){
    const settings = {
      start:2,
      min:0,
      max:10,
      step:1,
    }
    return (
      <Grid padded>
        <Grid.Column width={16}>
          <Segment>
              <Slider color="blue" inverted={false}
                settings={{
                start: this.state.value1,
                min:0,
                max:255,
                step:1,
                onChange: (value) => {
                  this.setState({
                    value1:value
                  })
                  this.props.setValue(value)
                }
              }}/>
            <Label color="blue">{this.state.value1}</Label>
          </Segment>
        </Grid.Column>
      </Grid>
      
    );
  }
  
}