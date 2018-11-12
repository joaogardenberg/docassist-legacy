import React, { Component }           from 'react';
import { reduxForm }                  from 'redux-form';
import { connect as Connect }         from 'react-redux';
import PageModal                      from '../common/PageModal/PageModal';
import Form                           from './Form/Form';
import { loadPatient, updatePatient } from '../../../actions';
import * as Regex                     from '../../../constants/Regex';
import * as Patient                   from '../../../constants/Patient';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReset: false
}

class PatientsEdit extends Component {
  render() {
    const { change, reset }             = this.props;
    const { shouldGoBack, shouldReset } = this.state;

    return (
      <PageModal
        title="Editar paciente"
        iconClass="fas fa-pencil-alt"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo="/pacientes"
      >
        <Form
          shouldReset={ shouldReset }
          changeFieldValue={ change }
          resetField={ reset }
        />
      </PageModal>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.patientLoaded = false;
  }

  componentDidUpdate() {
    const { patients, loadPatient, history } = this.props;
    const { id }                             = this.props.match.params;

    if (this.state.shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    if (this.state.shouldReset) {
      this.setState({ shouldReset: false });
    }

    if (Object.keys(patients).length > 0 && !this.patientLoaded) {
      if (patients[id]) {
        loadPatient(patients[id]);
        this.patientLoaded = true;
        this.setState({ shouldReset: true });
      } else {
        history.push("/pacientes");
      }
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
    this.setState({ shouldGoBack: true });
  }

  clearForm() {
    this.props.reset();
    this.setState({ shouldReset: true });
  }

  onSubmit(values) {
    const { updatePatient, history } = this.props;

    updatePatient(values);
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

  const [ day, month, year ] = dateOfBirth.split('/');

  const date = Date.parse(`${month}/${day}/${year}`);

  if (!date || date > new Date()) {
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

function validatePhone(phone) {
  if (phone && !phone.match(Regex.Phone)) {
    return 'Número inválido'
  }

  return null;
}

function validateEmail(email) {
  if (email) {
    if (email.length > 50) {
      return 'Máximo 50 caracteres';
    }

    if (!email.toLowerCase().match(Regex.Email)) {
      return 'E-mail inválido';
    }
  }

  return null;
}

function validateCep(cep) {
  if (cep && !cep.match(Regex.CEP)) {
    return 'CEP inválido';
  }

  return null;
}

function validateState(state) {
  if (!Patient.STATE_VALUES.includes(state)) {
    return 'Opção inválida. Favor recarregar a página';
  }

  return null;
}

function validateCity(city) {
  if (city && city.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateNeighborhood(neighborhood) {
  if (neighborhood && neighborhood.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validateAddress(address) {
  if (address && address.length > 100) {
    return 'Máximo 100 caracteres';
  }

  return null;
}

function validateComplement(complement) {
  if (complement && complement.length > 50) {
    return 'Máximo 50 caracteres';
  }

  return null;
}

function validate(values) {
  const errors = {
    name:              validateName(values['name']),
    gender:            validateGender(values['gender']),
    maritalStatus:     validateMaritalStatus(values['maritalStatus']),
    dateOfBirth:       validateDateOfBirth(values['dateOfBirth']),
    occupation:        validateOccupation(values['occupation']),
    cpf:               validateCpf(values['cpf']),
    rg:                validateRg(values['rg']),
    rgIssuingAgency:   validateRgIssuingAgency(values['rg'], values['rgIssuingAgency']),
    nationality:       validateNationality(values['nationality']),
    nationalityOther:  validateNationalityOther(values['nationality'], values['nationalityOther']),
    placeOfBirth:      validatePlaceOfBirth(values['placeOfBirth']),
    placeOfBirthOther: validatePlaceOfBirthOther(values['placeOfBirth'], values['placeOfBirthOther']),
    landline:          validatePhone(values['landline']),
    cellPhone:         validatePhone(values['cellPhone']),
    workPhone:         validatePhone(values['workPhone']),
    email:             validateEmail(values['email']),
    cep:               validateCep(values['cep']),
    state:             validateState(values['state']),
    city:              validateCity(values['city']),
    neighborhood:      validateNeighborhood(values['neighborhood']),
    address:           validateAddress(values['address']),
    complement:        validateComplement(values['complement'])
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

function mapStateToProps({ patients, loadedPatient }) {
  return {
    patients,
    initialValues: loadedPatient
  };
}

PatientsEdit = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'PatientsEditForm'
})(PatientsEdit);

PatientsEdit = Connect(
  mapStateToProps,
  { loadPatient, updatePatient }
)(PatientsEdit);

export default PatientsEdit;
