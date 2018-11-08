import React, { Component }   from 'react';
import { reduxForm }          from 'redux-form';
import { connect as Connect } from 'react-redux';
import PageModal              from '../common/PageModal/PageModal';
import Form                   from './Form/Form';
import { createPatient }         from '../../../actions';
import * as Regex             from '../../../checks/Regex';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReset: false
}

class PatientsNew extends Component {
  render() {
    const { indexParams }               = this.props.location;
    const { shouldGoBack, shouldReset } = this.state;

    return (
      <PageModal
        title="Novo paciente"
        iconClass="fas fa-clipboard"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo={ `/pacientes${indexParams || ''}` }
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
    const { createPatient, history, location: { indexParams } } = this.props;

    createPatient(values);
    history.push(`/pacientes${indexParams || ''}`);
  }
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
  return null;
}

function validateRgIssuingAgency(rg, rgIssuingAgency) {
  if (rg && !rgIssuingAgency) {
    return 'Campo obrigatório';
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

  return null;
}

function validatePlaceOfBirth(placeOfBirth) {
  if (![
    'acre',
    'alagoas',
    'amapa',
    'amazonas',
    'bahia',
    'ceara',
    'distrito_federal',
    'espirito_santo',
    'goias',
    'maranhao',
    'mato_grosso',
    'mato_grosso_do_sul',
    'minas_gerais',
    'para',
    'paraiba',
    'parana',
    'pernambuco',
    'piaui',
    'rio_de_janeiro',
    'rio_grande_do_norte',
    'rio_grande_do_sul',
    'rondonia',
    'roraima',
    'santa_catarina',
    'sao_paulo',
    'sergipe',
    'tocantins',
    'other'
  ].includes(placeOfBirth)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validatePlaceOfBirthOther(placeOfBirth, placeOfBirthOther) {
  if (placeOfBirth === 'other' && !placeOfBirthOther) {
    return 'Campo obrigatório';
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
