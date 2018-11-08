import React, { Component }   from 'react';
import { reduxForm }          from 'redux-form';
import { connect as Connect } from 'react-redux';
import PageModal              from '../common/PageModal/PageModal';
import Form                   from './Form/Form';
import { createUser }         from '../../../actions';
import * as Regex             from '../../../checks/Regex';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReset: false
}

class UsersNew extends Component {
  render() {
    const { indexParams }               = this.props.location;
    const { shouldGoBack, shouldReset } = this.state;

    return (
      <PageModal
        title="Novo usuário"
        iconClass="fas fa-clipboard"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo={ `/usuarios${indexParams || ''}` }
        indexParams={ indexParams }
      >
        <Form
          shouldReset={ shouldReset }
        />
      </PageModal>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidUpdate() {
    if (this.state.shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    if (this.state.shouldReset) {
      this.setState({ shouldReset: false });
    }
  }

  modalFooter() {
    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-success"
          onClick={ this.props.handleSubmit(this.onSubmit.bind(this)) }
        >
          <i className="fas fa-plus left" />
          Criar
        </button>
        <button
          className="btn waves-effect waves-light bg-warning"
          onClick={ this.onClearButtonClick.bind(this) }
        >
          <i className="fas fa-eraser left" />
          Limpar
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
    this.setState({ shouldGoBack: true });
  }

  clearForm() {
    this.props.reset();
    this.setState({ shouldReset: true });
  }

  onSubmit(values) {
    const { createUser, history, location: { indexParams } } = this.props;
    let typeName;

    switch(values.type) {
      case '2':
        typeName = 'Secretário(a)'
        break;
      default:
        typeName = 'Médico(a)'
    }

    values.typeName = typeName;
    createUser(values);
    history.push(`/usuarios${indexParams || ''}`);
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
  if (!password) {
    return 'Campo obrigatório';
  }

  if (password.length > 50) {
    return 'Máximo 50 caracteres';
  }

  if (password.length < 6) {
    return 'Mínimo 6 caracteres';
  }

  return null;
}

function validatePasswordConfirmation(password, passwordConfirmation) {
  if (!passwordConfirmation) {
    return 'Campo obrigatório';
  }

  if (password !== passwordConfirmation) {
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

UsersNew = reduxForm({
  validate,
  initialValues: {
    type: '1',
    typeOf: []
  },
  enableReinitialize: true,
  form: 'UsersNewForm'
})(UsersNew);

UsersNew = Connect(
  null,
  { createUser }
)(UsersNew);

export default UsersNew;
