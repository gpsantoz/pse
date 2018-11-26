import React from 'react';
import {
	Grid,
	Button
} from 'semantic-ui-react';

class Substract extends React.Component {

    constructor(props){
        super(props)
        this.state = {...this.props.filter.parameters}

        // this.handleChange = this.handleChange.bind(this);
    }

    render(){
        const {updateFilter, filter, images, target} = this.props
        console.log(images)
    return (

      <Grid.Column>
        <label>
            Image:
        </label>
        <select class="ui dropdown">
        {Object.keys(images).map((image, key) => {
          return(

            <option value={key}>Image {key}</option>
          )
        })}
       {/* {images.map((image, key) => {
          return
          (
            <option value="1">Male</option>
          )
        */}
      </select>
      <Button
            basic
            color="green"
            onClick={(e) => {
                e.preventDefault()
                updateFilter(target, filter.id, this.state)
            }}
        >
            Atualizar Filtro
        </Button>
      </Grid.Column>
  )
}
}

export default Substract
