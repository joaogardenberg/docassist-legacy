import React, { Component } from 'react';
import                           './Patients.scss';
import Article              from '../common/Article/Article';
import * as Toast           from '../../../common/Toast';

class Patients extends Component {
  render() {
    return (
      <Article
        uniqueClass="patients"
        header="Pacientes"
        newButtonCallback={ this.onNewButtonClick }
        newButtonTooltip="paciente"
      />
    );
  }

  onNewButtonClick() {
    Toast.info('Fazer modal para adicionar paciente.');
  }
}

export default Patients;
