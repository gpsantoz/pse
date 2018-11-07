import React from 'react';
import {
	Grid,
	Button
} from 'semantic-ui-react';

class Morphological extends React.Component {

    constructor(props){
        super(props)
        this.state = {...this.props.filter.parameters}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
      }

    render(){
        const {updateFilter, filter, target} = this.props
    return (
     
      <Grid.Column>
        <div>
        <label>
        Quantidade de Iterações:
            <input
                type="number"
                min="1"
                name="iterations"
                onChange={this.handleChange}
                value={this.state.iterations}
            />
            </label>
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

export default Morphological