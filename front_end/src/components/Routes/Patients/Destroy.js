import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import { Link, withRouter }   from 'react-router-dom';
import PageModal              from '../common/PageModal/PageModal';
import { destroyPatient }     from '../../../actions';

const INITIAL_STATE = {
  shouldGoBack: false,
  patient: {}
}

class PatientsDestroy extends Component {
  render() {
    const { shouldGoBack, patient } = this.state;

    if (Object.keys(patient).length < 1) {
      return null;
    }

    return (
      <PageModal
        title="Remover paciente"
        iconClass="fas fa-trash-alt"
        footer={ this.modalFooter() }
        shouldGoBack={ shouldGoBack }
        closeTo="/pacientes"
      >
        <p>
          Você tem certeza de que deseja remover o paciente&nbsp;
          <Link
            to={ `/pacientes/${patient.id}` }
            className="link waves-effect waves-light"
          >
            { patient.name }
          </Link>
          ?
        </p>
      </PageModal>
    );
  }

  modalFooter() {
    return (
      <div>
        <button
          className="btn waves-effect waves-light bg-error"
          onClick={ this.onDestroyButtonClick.bind(this) }
        >
          <i className="fas fa-trash-alt left" />
          Remover
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
    this.patientLoaded = false;
  }

  componentDidMount() {
    this.loadPatient();
  }

  componentDidUpdate() {
    if (this.state.shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    this.loadPatient();
  }

  onDestroyButtonClick() {
    const { destroyPatient, history, match: { params: { id } } } = this.props;

    destroyPatient(id);
    history.push('/pacientes');
  }

  onBackButtonClick() {
    this.setState({ shouldGoBack: true });
  }

  loadPatient() {
    const { patients, match: { params: { id } }, history } = this.props;

    if (id !== this.lastId) {
      this.patientLoaded = false;
      this.lastId = id;
    }

    if (!this.patientLoaded && Object.keys(patients).length > 0) {
      if (patients[id]) {
        this.setState({ patient: patients[id] });
      } else {
        history.push('/pacientes');
      }

      this.patientLoaded = true;
    }
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

PatientsDestroy = Connect(
  mapStateToProps,
  { destroyPatient }
)(PatientsDestroy);

PatientsDestroy = withRouter(PatientsDestroy);

export default PatientsDestroy;
