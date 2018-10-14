import React, { Component } from 'react';
import Modal                from '../common/Modal/Modal';

class UsersNew extends Component {
  render() {
    return (
      <Modal
        title="Novo usuário"
        footerButtons={ this.footerButtons() }
      >
        <p>Conteúdo</p>
      </Modal>
    );
  }

  footerButtons() {
    return (
      <div>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Criar</a>
      </div>
    );
  }
}

export default UsersNew;
