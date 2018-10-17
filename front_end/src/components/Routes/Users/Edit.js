import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link, withRouter }   from 'react-router-dom';
import { fetchUsers }         from '../../../actions';
import PageModal              from '../common/PageModal/PageModal';

class UsersEdit extends Component {
  render() {
    const { id }    = this.props.match.params;
    const { users } = this.props;

    if (!users) {
      return null;
    }

    const user = users[id];

    return (
      <PageModal
        title="Editar usuário"
        iconClass="fas fa-clipboard"
        footer={ this.modalFooter() }
        backTo="/usuarios"
      >
        <p>Formulário...</p>
        <p>{ JSON.stringify(user) }</p>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
        <a href="#!" className="btn waves-effect waves-light bg-success">
          <i className="fas fa-save left" />
          Salvar
        </a>
        <Link to="/usuarios" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default withRouter(Connect(mapStateToProps, { fetchUsers })(UsersEdit));
