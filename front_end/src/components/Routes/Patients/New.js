import React, { Component }   from 'react';
import { reduxForm }          from 'redux-form';
import { connect as Connect } from 'react-redux';
import PageModal              from '../common/PageModal/PageModal';
import Form                   from './Form/Form';
import { createPatient }      from '../../../actions';
import * as Regex             from '../../../constants/Regex';
import * as Patient           from '../../../constants/Patient';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReset: false
}

class PatientsNew extends Component {
  render() {
    const { shouldGoBack, shouldReset } = this.state;

    return (
      <PageModal
        title="Novo paciente"
        iconClass="fas fa-clipboard"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo="/pacientes"
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
    const { createPatient, history } = this.props;

    createPatient(values);
    history.push('/pacientes');
  }
}

function validateName(name) {
  if (!name) {
    return 'Campo obrigatório';
  }

  if (name.length > 100) {
    return 'Máximo 100 caracteres';
  }

  if (!name.toLowerCase().match(Regex.LowercaseName)) {
    return 'Não pode conter caracteres especiais';
  }

  return null;
}

function validateGender(gender) {
  if (!['1', '2'].includes(gender)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validateMaritalStatus(maritalStatus) {
  if (!['1', '2', '3', '4'].includes(maritalStatus)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validateDateOfBirth(dateOfBirth) {
  if (!dateOfBirth) {
    return 'Campo obrigatório';
  }

  if (!dateOfBirth.match(Regex.DateOfBirth)) {
    return 'Data de nascimento inválida';
  }

  const date = Date.parse(dateOfBirth);

  if (!date || date > new Date().getTime()) {
    return 'Data de nascimento inválida';
  }

  return null;
}

function validateOccupation(occupation) {
  if (occupation && occupation.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateCpf(cpf) {
  if (cpf) {
    if (!cpf.match(Regex.CPF)) {
      return 'CPF inválido';
    }

    cpf = cpf.replace(/\./g, '').replace(/-/g, '');

    let error = false;

    let firstDigit = cpf.substr(0, cpf.length - 2).split('').reduce((acc, curr, i) => {
      acc += parseInt(curr) * (10 - i);
      return acc;
    }, 0) * 10 % 11;

    if (firstDigit === 10) {
      firstDigit = 0;
    }

    if (firstDigit !== parseInt(cpf[9])) {
      error = true;
    }

    if (!error) {
      let secondDigit = cpf.substr(0, cpf.length - 1).split('').reduce((acc, curr, i) => {
        acc += parseInt(curr) * (11 - i)
        return acc;
      }, 0) * 10 % 11;

      if (secondDigit === 10) {
        secondDigit = 0;
      }

      if (secondDigit !== parseInt(cpf[10])) {
        error = true;
      }
    }

    if (error) {
      return 'CPF inválido';
    }
  }

  return null;
}

function validateRg(rg) {
  if (rg && rg.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateRgIssuingAgency(rg, rgIssuingAgency) {
  if (rg && !rgIssuingAgency) {
    return 'Campo obrigatório';
  }

  if (rg && rgIssuingAgency && rgIssuingAgency.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateNationality(nationality) {
  if (!['1', 'other'].includes(nationality)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validateNationalityOther(nationality, nationalityOther) {
  if (nationality === 'other' && !nationalityOther) {
    return 'Campo obrigatório';
  }

  if (nationality === 'other' && nationalityOther && nationalityOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validatePlaceOfBirth(placeOfBirth) {
  if (!Patient.STATE_VALUES.includes(placeOfBirth)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validatePlaceOfBirthOther(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === 'other' && !placeOfBirthOther) {
    return 'Campo obrigatório';
  }

  if (placeOfBirth === 'other' && placeOfBirthOther && placeOfBirthOther.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validate(values) {
  const errors = {
    name: validateName(values['name']),
    gender: validateGender(values['gender']),
    maritalStatus: validateMaritalStatus(values['maritalStatus']),
    dateOfBirth: validateDateOfBirth(values['dateOfBirth']),
    occupation: validateOccupation(values['occupation']),
    cpf: validateCpf(values['cpf']),
    rg: validateRg(values['rg']),
    rgIssuingAgency: validateRgIssuingAgency(values['rg'], values['rgIssuingAgency']),
    nationality: validateNationality(values['nationality']),
    nationalityOther: validateNationalityOther(values['nationality'], values['nationalityOther']),
    placeOfBirth: validatePlaceOfBirth(values['placeOfBirth']),
    placeOfBirthOther: validatePlaceOfBirthOther(values['placeOfBirth'], values['placeOfBirthOther'])
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

PatientsNew = reduxForm({
  validate,
  initialValues: {
    gender: '1',
    maritalStatus: '1',
    nationality: '1',
    placeOfBirth: 'rio_de_janeiro'
  },
  enableReinitialize: true,
  form: 'PatientsNewForm'
})(PatientsNew);

PatientsNew = Connect(
  null,
  { createPatient }
)(PatientsNew);

export default PatientsNew;
