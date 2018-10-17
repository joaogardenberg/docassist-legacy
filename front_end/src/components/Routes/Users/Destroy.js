import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link, withRouter }   from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';
import { destroyUser }        from '../../../actions';

class UsersDestroy extends Component {
  render() {
    const { users, match: { params: { id } } } = this.props;

    if (!users) {
      return null;
    }

    const user = users[id];

    return (
      <PageModal
        title="Remover usuário"
        iconClass="fas fa-trash-alt"
        footer={ this.modalFooter() }
        backTo="/usuarios"
      >
        <p>Você tem certeza de que deseja remover o usuário "{ user.name }"?</p>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-error"
          onClick={ this.onDestroyButtonClick.bind(this) }
        >
          <i className="fas fa-trash-alt left" />
          Remover
        </button>
        <Link to="/usuarios" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }

  onDestroyButtonClick() {
    const { destroyUser, history, match: { params: { id } } } = this.props;
    destroyUser(id);
    history.push('/usuarios');
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default withRouter(Connect(mapStateToProps, { destroyUser })(UsersDestroy));
