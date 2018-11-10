import React, { Component } from 'react';
import                           './Appointments.scss';
import Article              from '../common/Article/Article';
import * as Toast           from '../../../common/Toast';

class Appointments extends Component {
  render() {
    return (
      <Article
        uniqueClass="appointments-index"
        header="Consultas"
        newButtonCallback={ this.onNewButtonClick }
        newButtonTooltip="Nova consulta"
      />
    );
  }

  onNewButtonClick() {
    Toast.info('Fazer modal para adicionar consulta.');
  }
}

export default Appointments;
