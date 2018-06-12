import _ from 'lodash';
import React from 'react';
import { List, Header, Icon, Grid } from 'semantic-ui-react';
import DraggableButton from './DraggableButton';

class ProcessingGroup extends React.Component {
  renderButtons() {
    return _.map(this.props.group.buttons, button => {
      return (
        <List.Item key={_.random(1, 100, true)}>
          <DraggableButton basic {...button} />
        </List.Item>
      );
    });
  }

  render() {
    if (!this.props.group.buttons.length) {return '';}
    return (
      <Grid.Column style={{ marginBottom: 20 }}>
        <div>
          <Header as="h4">
            <Icon name="options" />
            <Header.Content>{this.props.group.label}</Header.Content>
          </Header>
          <List className="ui grid centered" style={{ marginTop: 10 }}>
            {this.renderButtons()}
          </List>
        </div>
      </Grid.Column>
    );
  }
}

export default ProcessingGroup;
