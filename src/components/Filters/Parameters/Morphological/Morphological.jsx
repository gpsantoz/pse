import React from 'react';
import {
	Grid,
    Button,
    Radio,
    Form
} from 'semantic-ui-react';
import './style.css'

class Morphological extends React.Component {

    constructor(props){
        super(props)
        this.state = {...this.props.filter.parameters}
        this.handleChange = this.handleChange.bind(this);
    }

    setMatrix(element, size){
        switch(element){
            case "cross":
                if(size === '3')
                    return [[0, 1, 0],
                            [1, 1, 1],
                            [0, 1, 0]]
                else 
                    return   [[0, 0, 1, 0, 0],
                              [0, 0, 1, 0, 0],
                              [1, 1, 1, 1, 1],
                              [0, 0, 1, 0, 0],
                              [0, 0, 1, 0, 0]]
            case "full":
                if(size === '3')
                    return [[1, 1, 1],
                            [1, 1, 1],
                            [1, 1, 1]]
                else 
                    return   [[1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1]]
            case "curve":
                if(size === '3')
                    return [[0, 1, 0],
                            [1, 1, 1],
                            [0, 1, 0]]
                else 
                    return   [[0, 0, 1, 0, 0],
                            [0, 1, 1, 1, 0],
                            [1, 1, 1, 1, 1],
                            [0, 1, 1, 1, 0],
                            [0, 0, 1, 0, 0]]


        }
    }

    handleValue = (e, { value, name }) => {
        if(name === 'element'){
            this.setState({ ...this.state, [name]: value, kernel: this.setMatrix(value, this.state.matrixSize) })    
        }else
            this.setState({ ...this.state, [name]: value })
    }    
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'number' ? parseInt(target.value) : target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
      }

    render(){
        const {updateFilter, filter, target} = this.props
    return (
     
    <Form>
        <Grid.Row>
            <Grid.Column width={2} className="inline-fields">
                <Form.Field>
                    Matrix size:
                </Form.Field>
                <Form.Field className="radio-margin">
                    <Radio
                    label='3x3'
                    name='matrixSize'
                    value='3'
                    checked={this.state.matrixSize === '3'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='5x5'
                    name='matrixSize'
                    value='5'
                    checked={this.state.matrixSize === '5'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
            </Grid.Column>

             <Grid.Column width={2} className="inline-fields">
                <Form.Field>
                    Structuring Element:
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='Full'
                    name='element'
                    value='full'
                    checked={this.state.element === 'full'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='Cross'
                    name='element'
                    value='cross'
                    checked={this.state.element === 'cross'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
                <Form.Field  className="radio-margin">
                    <Radio
                    label='Curve'
                    name='element'
                    value='curve'
                    checked={this.state.element === 'curve'}
                    onChange={this.handleValue}
                    />
                </Form.Field>
            </Grid.Column>

        <Grid.Column>
        <div>
        <label>
        Iterations:
            <input
            className="iterations-input"
                type="number"
                min="1"
                name="iterations"
                onChange={this.handleChange}
                value={this.state.iterations}
                // style="max-width: 47px;
                // margin-left: 10px;"
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
      </Grid.Row>
    </Form>
  )
}
}

export default Morphological