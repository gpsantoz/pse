import React from 'react';
import {
	Grid,
    Button,
    Radio,
    Form
} from 'semantic-ui-react';
import './style.css'

class NumberParameter extends React.Component {

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

    render(){
        const {updateFilter, filter, name, parameter, target} = this.props
    return (

    <Form>
        <Grid.Row>
        <Grid.Column>
        <div>
        <label>
        {name}:
            <input
            className="iterations-input"
                type="number"
                min="1"
                name={parameter}
                onChange={this.handleChange}
                value={this.state[parameter]}
            />
            </label>
        </div>
      <Button
            className="update-filters"
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
      </Grid.Row>
    </Form>
  )
}
}

export default NumberParameter
