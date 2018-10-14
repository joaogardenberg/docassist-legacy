import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import { fetchUsers }         from '../../../actions';
import Modal                  from '../common/Modal/Modal';

class UsersDestroy extends Component {
  render() {
    const { id }    = this.props.match.params;
    const { users } = this.props;

    if (!users) {
      return null;
    }

    const user = users[id];

    return (
      <Modal
        title="Remover usuário"
        footerButtons={ this.footerButtons() }
      >
        <p>Você tem certeza de que deseja remover o usuário "{ user.name }"?</p>
      </Modal>
    );
  }

  footerButtons() {
    return (
      <div>
        <a href="#!" className="btn waves-effect waves-light bg-error">
          <i className="fas fa-trash-alt left" />
          Remover
        </a>
        <Link to="/usuários" className="btn-flat waves-effect">
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

export default Connect(mapStateToProps)(UsersDestroy);
