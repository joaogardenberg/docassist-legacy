import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';
import * as User              from '../../../constants/User';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReload: false,
  user: {}
}

class UsersShow extends Component {
  render() {
    const { shouldGoBack, shouldReload, user } = this.state;

    if (Object.keys(user).length < 1) {
      return null;
    }

    const { name, username, email, imageUrl } = user;

    return (
      <PageModal
        title="Usuário"
        iconClass="fas fa-user"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        shouldReload={ shouldReload }
        closeTo="/usuarios"
      >
        <div className="show">
          <div className="primary-info">
            <img
              src={ imageUrl ? imageUrl : '' }
              alt={ `Foto de ${name}` }
              onError={ this.onImageError }
            />
            <div className="info">
              <p className="name">{ name }</p>
              { this.renderType() }
            </div>
          </div>
          <div className="secondary-info">
            <div className="row">
              <div className="username col l6 s12">
                <h5>Usuário</h5>
                <p>{ username }</p>
              </div>
              <div className="email col l6 s12">
                <h5>E-mail</h5>
                <p>{ email }</p>
              </div>
            </div>
          </div>
        </div>
      </PageModal>
    );
  }

  renderType() {
    const { users } = this.props;
    const { user }  = this.state;
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
              className="link waves-effect waves-light"
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
        <span className="typeName">{ User.getTypeName(user.type ) }</span>
        <span className="typeOf">{ userNames ? typeOf : '' }</span>
      </p>
    );
  }

  modalFooter() {
    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-warning"
          onClick={ this.onEditButtonClick.bind(this) }
        >
          <i className="fas fa-pencil-alt left" />
          Editar
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
    this.lastId = props.match.params.id;
    this.editTimeout = null;
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate() {
    const { shouldGoBack, shouldReload } = this.state;

    if (shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    if (shouldReload) {
      this.setState({ shouldReload: false });
    }

    this.loadUser();
  }

  componentWillUnmount() {
    clearTimeout(this.editTimeout);
  }

  onEditButtonClick() {
    const { history } = this.props;
    const { user }    = this.state;

    if (Object.keys(user).length > 0) {
      this.setState({ shouldGoBack: true });
      this.editTimeout = setTimeout(() => history.push(`/usuarios/${user.id}/editar`), 200);
    }
  }

  onBackButtonClick() {
    this.setState({ shouldGoBack: true });
  }

  onImageError({ target }) {
    target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';
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
}

function mapStateToProps({ users }) {
  return { users };
}

UsersShow = Connect(
  mapStateToProps
)(UsersShow);

export default UsersShow;
