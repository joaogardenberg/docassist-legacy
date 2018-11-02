import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link, browserHistory }               from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';

const INITIAL_STATE = {
  shouldClose: false,
  shouldReload: false,
  user: {}
}

class UsersShow extends Component {
  render() {
    const { shouldClose, shouldReload, user } = this.state;

    if (Object.keys(user).length < 1) {
      return null;
    }

    return (
      <PageModal
        title="Usuário"
        iconClass="fas fa-user"
        footer={ this.modalFooter() }
        backTo="/usuarios"
        shouldClose={ shouldClose }
        shouldReload={ shouldReload }
      >
        <div className="show">
          <div className="row">
            <div className="col l6 s12">
              <h5>Nome</h5>
              <p>{ user.name }</p>
            </div>
            <div className="col l6 s12">
              <h5>Tipo</h5>
              { this.renderType() }
            </div>
          </div>
          <div className="row">
            <div className="col l6 s12">
              <h5>Usuário</h5>
              <p>{ user.username }</p>
            </div>
            <div className="col l6 s12">
              <h5>E-mail</h5>
              <p>{ user.email }</p>
            </div>
          </div>
        </div>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
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
    this.lastId = props.match.params.id;
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate() {
    const { shouldClose, shouldReload } = this.state;

    if (shouldClose) {
      this.setState({ shouldClose: false });
    }

    if (shouldReload) {
      this.setState({ shouldReload: false });
    }

    this.loadUser();
  }

  onBackButtonClick() {
    this.setState({ shouldClose: true });
  }

  loadUser() {
    const { users, match: { params: { id } }, history } = this.props;

    if (id !== this.lastId) {
      this.userLoaded = false;
      this.lastId = id;
      this.setState({ shouldReload: true });
    }

    if (!this.userLoaded && Object.keys(users).length > 0) {
      if (users[id]) {
        this.setState({ user: users[id] });
      } else {
        history.push('/usuarios');
      }

      this.userLoaded = true;
    }
  }

  renderType() {
    const { users } = this.props;
    const { user } = this.state;
    let userNames;

    if (user.type !== '1') {
      userNames = user.typeOf.map((id, index) => {
        let suffix = '';

        if (index < user.typeOf.length - 2) {
          suffix = ', ';
        } else if (index < user.typeOf.length - 1) {
          suffix = ' e ';
        }

        return (
          <span key={ id } className="user-container">
            <Link
              className="user"
              to={ `/usuarios/${id}` }
            >
              { users[id].name }
            </Link>
            { suffix }
          </span>
        );
      });
    }

    const typeOf = (
      <span className="users">
        { ' de ' }
        { userNames }
      </span>
    );

    return (
      <p className="type">
        <span className="typeName">{ user.typeName }</span>
        <span className="typeOf">{ userNames ? typeOf : '' }</span>
      </p>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

UsersShow = Connect(
  mapStateToProps
)(UsersShow);

export default UsersShow;
