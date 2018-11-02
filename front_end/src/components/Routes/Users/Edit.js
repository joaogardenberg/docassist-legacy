import React, { Component }     from 'react';
import { reduxForm }            from 'redux-form';
import { connect as Connect }   from 'react-redux';
import PageModal                from '../common/PageModal/PageModal';
import Form                     from './Form/Form';
import { loadUser, updateUser } from '../../../actions';
import * as Regex               from '../../../checks/Regex';

const INITIAL_STATE = {
  shouldClose: false
}

class UsersEdit extends Component {
  render() {
    const { shouldClose } = this.state;

    return (
      <PageModal
        title="Editar usuário"
        iconClass="fas fa-pencil-alt"
        footer={ this.modalFooter() }
        backTo="/usuarios"
        shouldClose={ shouldClose }
      >
        <Form />
      </PageModal>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.userLoaded = false;
  }

  componentDidUpdate() {
    const { users, loadUser, match: { params: { id } }, history } = this.props;

    if (Object.keys(users).length > 0 && !this.userLoaded) {
      if (users[id]) {
        loadUser(users[id]);
        this.userLoaded = true;
      } else {
        history.push('/usuarios');
      }
    }

    if (this.state.shouldClose) {
      this.setState({ shouldClose: false });
    }
  }

  modalFooter() {
    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-success"
          onClick={ this.props.handleSubmit(this.onSubmit.bind(this)) }
        >
          <i className="fas fa-save left" />
          Salvar
        </button>
        <button
          className="btn waves-effect waves-light bg-warning"
          onClick={ this.onClearButtonClick.bind(this) }
        >
          <i className="fas fa-sync-alt left" />
          Restaurar
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

  onClearButtonClick() {
    this.clearForm();
  }

  onBackButtonClick() {
    this.setState({ shouldClose: true });
  }

  clearForm() {
    this.props.reset();
  }

  onSubmit(values) {
    const { updateUser, history } = this.props;
    let typeName;

    switch(values.type) {
      case '2':
        typeName = 'Secretário(a)'
        break;
      default:
        typeName = 'Médico(a)'
    }

    values.typeName = typeName;
    updateUser(values);
    history.push('/usuarios');
  }
}

function validateType(type) {
  if (!['1', '2'].includes(type)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validateTypeOf(type, typeOf) {
  if (type === '2' && (!typeOf || typeOf.length < 1)) {
    return 'Campo obrigatório';
  }

  return null;
}

function validateName(name) {
  if (!name) {
    return 'Campo obrigatório';
  }

  if (name.length > 100) {
    return 'Máximo 100 caracteres';
  }

  if (!name.toLowerCase().match(Regex.Name)) {
    return 'Não pode conter caracteres especiais';
  }

  return null;
}

function validateUsername(username) {
  if (!username) {
    return 'Campo obrigatório';
  }

  if (username.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (!username.toLowerCase().match(Regex.Username)) {
    return 'Só pode conter letras e números'
  }

  return null;
}

function validateEmail(email) {
  if (!email) {
    return 'Campo obrigatório';
  }

  if (email.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (!email.toLowerCase().match(Regex.Email)) {
    return 'E-mail inválido.';
  }

  return null;
}

function validateEmailConfirmation(email, emailConfirmation) {
  if (!emailConfirmation) {
    return 'Campo obrigatório';
  }

  if (email !== emailConfirmation) {
    return 'Os e-mails não conferem';
  }

  return null;
}

function validatePassword(password) {
  if (password && password.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (password && password.length < 6) {
    return 'Mínimo 6 caracteres';
  }

  return null;
}

function validatePasswordConfirmation(password, passwordConfirmation) {
  if (password && !passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password && password !== passwordConfirmation) {
    return 'As senhas não conferem';
  }

  return null;
}

function validate(values) {
  const errors = {
    type: validateType(values['type']),
    typeOf: validateTypeOf(values['type'], values['typeOf']),
    name: validateName(values['name']),
    username: validateUsername(values['username']),
    email: validateEmail(values['email']),
    emailConfirmation: validateEmailConfirmation(values['email'], values['emailConfirmation']),
    password: validatePassword(values['password']),
    passwordConfirmation: validatePasswordConfirmation(values['password'], values['passwordConfirmation'])
  };

  const ret = Object.keys(errors).reduce((final, key) => {
    if (errors[key]) {
      final[key] = errors[key];
      return final;
    }

    return final;
  }, {});

  return ret;
}

function mapStateToProps({ users, loadedUser }) {
  return {
    users,
    initialValues: {
      ...loadedUser,
      emailConfirmation: loadedUser.email
    }
  };
}

UsersEdit = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'UsersEditForm'
})(UsersEdit);

UsersEdit = Connect(
  mapStateToProps,
  { loadUser, updateUser }
)(UsersEdit);

export default UsersEdit;
