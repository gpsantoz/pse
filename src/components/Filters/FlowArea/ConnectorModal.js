import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import PropTypes from 'prop-types';
import ButtonBlock from './ButtonBlock';

class ConnectorModal extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    type: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = { modalOpen: false };

  handleRemove() {
    this.props.removeProcessingBlock(this.props.id);
  }

  render() {
    const { type } = this.props;
    return (
      <ButtonBlock content={type} />
    );
  }
}

export default connect(null, actions)(withRouter(ConnectorModal));
