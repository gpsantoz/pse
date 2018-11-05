import React from 'react';
import {
	Grid,
	Button
} from 'semantic-ui-react';

class Morphological extends React.Component {

    state = {...this.props.filter.parameters }

    setIterations = (iterations) => {
        this.setState({ ...this.state, iterations: parseInt(iterations.target.value)})
    }

    render(){
        const {updateFilter, filter, target} = this.props
    return (
     
      <Grid.Column>
        <div>
            <input
                type="number"
                placeholder="Quantidade de Iterações"
                onChange={this.setIterations}
                value={this.state.iterations}
            />
        </div>
      <Button
            basic
            color="green"
            onClick={(e) => {
                e.preventDefault()
                console.log('state')
                console.log(this.state)
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