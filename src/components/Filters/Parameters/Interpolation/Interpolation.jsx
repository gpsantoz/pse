import React from 'react';
import {
	Grid,
    Button,
    Radio,
    Form
} from 'semantic-ui-react';
import './style.css'

class Interpolation extends React.Component {

    constructor(props){
        super(props)
        this.state = {...this.props.filter.parameters}
        this.handleChange = this.handleChange.bind(this);
    }

    handleValue = (e, { value, name }) => {
            this.setState({ ...this.state, [name]: value })
    }    
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
      }

    render(){
        const {updateFilter, filter, pixels, target} = this.props
    return (
     
    <Form>
        
        <Grid.Row>

            <Grid.Column width={2} className="inline-fields">
                <Form.Field>
                    Algorithm:
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='Nearest Neighbor'
                    name='algorithm'
                    value='1'
                    checked={this.state.algorithm === '1'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='Bilinear'
                    name='algorithm'
                    value='2'
                    checked={this.state.algorithm === '2'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
            </Grid.Column>

            <Grid.Column width={2} className="inline-fields">
                Original size: { pixels.width} x { pixels.height}
                New size: { pixels.width*parseInt(filter.parameters.scale)} x { pixels.height*parseInt(filter.parameters.scale)}
            </Grid.Column>
        <Grid.Column>
        <div>
        <label>
        Scale:
            <input
            className="iterations-input"
                type="number"
                min="1"
                name="scale"
                onChange={this.handleChange}
                value={this.state.scale}
                // style="max-width: 47px;
                // margin-left: 10px;"
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

export default Interpolation