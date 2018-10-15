import React, { Component }       from 'react';
import                                 './Patients.scss';
import { connect as Connect }     from 'react-redux';
import { fetchUsers, openLoader } from '../../../actions';
import Article                    from '../common/Article/Article';
import * as Toast                 from '../../../common/Toast';

class Patients extends Component {
  render() {
    return (
      <Article
        uniqueClass="patients-index"
        header="Pacientes"
        newButtonCallback={ this.onNewButtonClick }
        newButtonTooltip="paciente"
      />
    );
  }

  componentDidMount() {
    // this.props.openLoader();
    // this.props.fetchUsers();
  }

  onNewButtonClick() {
    Toast.info('Fazer modal para adicionar paciente.');
  }
}

export default Connect(null, { fetchUsers, openLoader })(Patients);
