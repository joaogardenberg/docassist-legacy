import React, { Component }   from 'react';
import { Link, withRouter }   from 'react-router-dom';
import { reduxForm }          from 'redux-form';
import { connect as Connect } from 'react-redux';
import PageModal              from '../common/PageModal/PageModal';
import Form                   from './Form/Form';
import { createUser }         from '../../../actions';

class UsersNew extends Component {
  render() {
    return (
      <PageModal
        title="Novo usuário"
        iconClass="fas fa-clipboard"
        footer={ this.modalFooter() }
        backTo="/usuarios"
      >
        <Form />
      </PageModal>
    );
  }

  modalFooter() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-success"
          onClick={ handleSubmit(this.onSubmit.bind(this)) }
        >
          <i className="fas fa-plus left" />
          Criar
        </button>
        <button
          className="btn waves-effect waves-light bg-warning"
          onClick={ this.clearForm.bind(this) }
        >
          <i className="fas fa-eraser left" />
          Limpar
        </button>
        <Link to="/usuarios" className="btn-flat waves-effect">
          <i className="fas fa-arrow-left left" />
          Voltar
        </Link>
      </div>
    );
  }

  clearForm() {
    this.props.initialize();
  }

  onSubmit(values) {
    const { createUser, history } = this.props;

    createUser(values);
    history.push('/usuarios');
  }
}

function validateName(name) {
  if (!name) {
    return 'Campo obrigatório';
  }

  if (name.length > 100) {
    return 'Máximo 100 caracteres';
  }

  if (!name.toLowerCase().match(/^[a-záéíóúàèâêôãõäöü'\s]+$/)) {
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

  if (!username.toLowerCase().match(/^[a-z0-9]+$/)) {
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

  if (!email.toLowerCase().match(/^[^@]+@[^@]+\.[^@]+$/)) {
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
  console.log(values);
  const errors = {
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
    type: '1'
  },
  enableReinitialize: true,
  form: 'UsersNewForm'
})(UsersNew);

UsersNew = Connect(
  null,
  { createUser }
)(UsersNew);

export default UsersNew;
