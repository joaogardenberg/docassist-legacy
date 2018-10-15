import React, { Component } from 'react';
import PageModal            from '../common/PageModal/PageModal';
import { Link }             from 'react-router-dom';

class UsersNew extends Component {
  render() {
    return (
      <PageModal
        title="Novo usuário"
        footer={ this.modalFooter() }
        backTo="/usuarios"
      >
        <p>Formulário...</p>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
        <a href="#!" className="btn waves-effect waves-light bg-success">
          <i className="fas fa-plus left" />
          Criar
        </a>
        <a href="#!" className="btn waves-effect waves-light bg-warning">
          <i className="fas fa-eraser left" />
          Limpar
        </a>
        <Link to="/usuarios" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }
}

export default UsersNew;
