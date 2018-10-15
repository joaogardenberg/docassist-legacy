import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';

class UsersShow extends Component {
  render() {
    const { id }    = this.props.match.params;
    const { users } = this.props;

    if (!users) {
      return null;
    }

    const user = users[id];

    return (
      <PageModal
        title="Usuário"
        footer={ this.modalFooter() }
        backTo="/usuarios"
      >
        <p>Informações...</p>
        <p>{ JSON.stringify(user) }</p>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
        <Link to="/usuarios" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return users;
}

export default Connect(mapStateToProps)(UsersShow);
