import React from 'react';
import {
	Grid,
	Button
} from 'semantic-ui-react';
import { Slider } from '../../../'

class Threshold extends React.Component {

    constructor(props){
        super(props)
        this.state = {...this.props.filter.parameters}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
      }

    setLimiar(value) {
        console.log('set limiar')
        console.log(value)
        this.setState({...this.state, t: value})
    }

    render(){
        const {updateFilter, filter, target} = this.props
    return (
     
      <Grid.Column>
        <div>
        <label>
            Limiar:
        </label>
        <Slider value={filter.parameters.t} setValue={this.setLimiar.bind(this)}/>
        </div>
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

export default Threshold