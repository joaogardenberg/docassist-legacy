import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link, withRouter }   from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';
import { destroyUser }        from '../../../actions';

const INITIAL_STATE = {
  shouldGoBack: false,
  user: {}
}

class UsersDestroy extends Component {
  render() {
    const { indexParams }        = this.props.location;
    const { shouldGoBack, user } = this.state;

    if (Object.keys(user).length < 1) {
      return null;
    }

    return (
      <PageModal
        title="Remover usuário"
        iconClass="fas fa-trash-alt"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo={ `/usuarios${indexParams || ''}` }
        indexParams={ indexParams }
      >
        <p>
          Você tem certeza de que deseja remover o usuário&nbsp;
          <Link
            to={{ indexParams: indexParams || '', pathname: `/usuarios/${user.id}` }}
            className="link waves-effect waves-light"
          >
            { user.name }
          </Link>
          ?
        </p>
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
        <button
          className="btn-flat waves-effect"
          onClick={ this.onBackButtonClick.bind(this) }
        >
          <i className="fas fa-arrow-left left" />
          Voltar
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.userLoaded = false;
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate() {
    if (this.state.shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    this.loadUser();
  }

  onDestroyButtonClick() {
    const { destroyUser, history, match: { params: { id } } } = this.props;
    const { location: { indexParams } }                       = this.props;

    destroyUser(id);
    history.push(`/usuarios${indexParams || ''}`);
  }

  onBackButtonClick() {
    this.setState({ shouldGoBack: true });
  }

  loadUser() {
    const { users, match: { params: { id } }, history } = this.props;
    const { location: { indexParams } }                 = this.props;

    if (id !== this.lastId) {
      this.userLoaded = false;
      this.lastId = id;
    }

    if (!this.userLoaded && Object.keys(users).length > 0) {
      if (users[id]) {
        this.setState({ user: users[id] });
      } else {
        history.push(`/usuarios${indexParams || ''}`);
      }

      this.userLoaded = true;
    }
  }
}

function mapStateToProps({ users }) {
  return { users };
}

UsersDestroy = Connect(
  mapStateToProps,
  { destroyUser }
)(UsersDestroy);

UsersDestroy = withRouter(UsersDestroy);

export default UsersDestroy;
