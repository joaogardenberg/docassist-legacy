import React, { Component } from 'react';
import Modal                from '../common/Modal/Modal';
import { Link }             from 'react-router-dom';

class UsersNew extends Component {
  render() {
    return (
      <Modal
        title="Novo usuário"
        fixedFooter={ true }
        footerButtons={ this.footerButtons() }
      >
        <p>Formulário...</p>
      </Modal>
    );
  }

  footerButtons() {
    return (
      <div>
        <a href="#!" className="btn waves-effect waves-light bg-success">
          <i className="fas fa-plus left" />
          Criar
        </a>
        <a href="#!" className="btn waves-effect bg-warning">
          <i className="fas fa-eraser left" />
          Limpar
        </a>
        <Link to="/usuários" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }
}

export default UsersNew;
