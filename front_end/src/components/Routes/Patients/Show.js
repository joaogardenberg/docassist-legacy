import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import Article                from '../common/Article/Article';
import { fetchPatient }       from '../../../actions';
import * as Patient           from '../../../constants/Patient';

const INITIAL_STATE = {
  patient: {}
}

class PatientsShow extends Component {
  render() {
    const { patient } = this.state;

    if (Object.keys(patient).length < 1) {
      return null;
    }

    const { gender, maritalStatus, nationality, nationalityOther }   = patient;
    const { placeOfBirth, placeOfBirthOther, name, dateOfBirth }     = patient;
    const { occupation, cpf, rg, rgIssuingAgency, imageUrl }         = patient;

    const genderName = Patient.getGenderName(gender);
    const maritalStatusName = Patient.getMaritalStatusName(maritalStatus);
    const rgWithIssuingAgency = Patient.getRgWithIssuingAgency(rg, rgIssuingAgency);
    const nationalityName = Patient.getNationalityName(nationality, nationalityOther);
    const placeOfBirthName = Patient.getPlaceOfBirthName(placeOfBirth, placeOfBirthOther);

    return (
      <Article
        uniqueClass="patients-show"
        header="Paciente"
      >
        <div className="show">
          <img
            src={ imageUrl ? imageUrl : '' }
            alt={ `Foto de ${name}` }
            onError={ this.onImageError }
          />
          <p>Nome: { name }</p>
          <p>Gênero: { genderName }</p>
          <p>Estado civil: { maritalStatusName }</p>
          <p>Data de nascimento: { dateOfBirth }</p>
          <p>Profissão: { occupation }</p>
          <p>CPF: { cpf }</p>
          <p>RG: { rgWithIssuingAgency }</p>
          <p>Nacionalidade: { nationalityName }</p>
          <p>Naturalidade: { placeOfBirthName }</p>
        </div>
      </Article>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.patientLoaded = false;
  }

  componentDidMount() {
    const { patients, fetchPatient, match: { params: { id } } } = this.props;

    if (patients[id] && Object.keys(patients[id]).length > 0) {
      this.setState({ patient: patients[id] });
      this.patientLoaded = true;
    } else {
      fetchPatient(id);
    }
  }

  componentDidUpdate() {
    const { patients, match: { params: { id } } } = this.props;

    if (!this.patientLoaded && patients[id] && Object.keys(patients[id]).length > 0) {
      this.setState({ patient: patients[id] });
      this.patientLoaded = true;
    }
  }

  onImageError({ target }) {
    target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

PatientsShow = Connect(
  mapStateToProps,
  { fetchPatient }
)(PatientsShow);

export default PatientsShow;
