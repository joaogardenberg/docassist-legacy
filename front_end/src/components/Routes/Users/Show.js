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
    const { indexParams }                      = this.props.location;
    const { shouldGoBack, shouldReload, user } = this.state;

    if (Object.keys(user).length < 1) {
      return null;
    }

    return (
      <PageModal
        title="Usuário"
        iconClass="fas fa-user"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        shouldReload={ shouldReload }
        closeTo={ `/usuarios${indexParams || ''}` }
        indexParams={ indexParams }
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
          className="btn waves-effect waves-light bg-warning"
          onClick={ this.onEditButtonClick.bind(this) }
        >
          <i className="fas fa-pencil-alt left" />
          Editar
        </button>
        {/*<button
          className="btn-flat waves-effect"
          onClick={ this.onBackButtonClick.bind(this) }
        >
          <i className="fas fa-arrow-left left" />
          Voltar
        </button>*/}
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
    console.log('Mount:', this.props.location.indexParams);
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
    console.log('Update:', this.props.location.indexParams);
  }

  componentWillUnmount() {
    clearTimeout(this.editTimeout);
  }

  onEditButtonClick() {
    const { history, location: { indexParams } } = this.props;
    const { user }                               = this.state;

    if (Object.keys(user).length > 0) {
      this.setState({ shouldGoBack: true });
      this.editTimeout = setTimeout(() => history.push({ indexParams: indexParams || '', pathname: `/usuarios/${user.id}/editar` }), 200);
    }
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
      this.setState({ shouldReload: true });
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

  renderType() {
    const { users, location: { indexParams } } = this.props;
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
              className="link waves-effect waves-light"
              to={{ indexParams: indexParams || '', pathname: `/usuarios/${id}` }}
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
