import _ from 'lodash';
import React from 'react';
import { Label, List } from 'semantic-ui-react';
import DraggableButton from './DraggableButton'

class ProcessingGroup extends React.Component {
    renderButtons() {
        return (
            _.map(this.props.group.buttons, button => {
                return (
                    <List.Item key={_.random(1, 100, true)}>
                        <DraggableButton basic {...button} />
                    </List.Item>
                );
            })
        );
    }

    render() {
        return (
            <div style={{ marginBottom: 20 }}>
                <Label as='a' color='black' ribbon>{this.props.group.label}</Label>
                <List className='ui grid centered' style={{ marginTop: 10 }}>
                    {this.renderButtons()}
                </List>
            </div>
        );
    }
}

export default ProcessingGroup;