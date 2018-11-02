import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';
import PageModal              from '../common/PageModal/PageModal';

const INITIAL_STATE = {
  shouldGoBack: false,
  shouldReload: false,
  patient: {}
}

class PatientsShow extends Component {
  render() {
    const { shouldGoBack, shouldReload, patient } = this.state;

    if (Object.keys(patient).length < 1) {
      return null;
    }

    return (
      <PageModal
        title="Paciente"
        iconClass="fas fa-address-card"
        footer={ this.modalFooter() }
        backTo="/pacientes"
        shouldGoBack={ shouldGoBack }
        shouldReload={ shouldReload }
      >
        <div className="show">
          <div className="row">
            <div className="col l6 s12">
              <h5>Nome</h5>
              <p>{ patient.name }</p>
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
    this.lastId = props.match.params.id;
  }

  componentDidMount() {
    this.loadPatient();
  }

  componentDidUpdate() {
    const { shouldGoBack, shouldReload } = this.state;

    if (shouldGoBack) {
      this.setState({ shouldGoBack: false });
    }

    if (shouldReload) {
      this.setState({ shouldReload: false });
    }

    this.loadPatient();
  }

  onBackButtonClick() {
    this.setState({ shouldGoBack: true });
  }

  loadPatient() {
    const { patients, match: { params: { id } }, history } = this.props;

    if (id !== this.lastId) {
      this.patientLoaded = false;
      this.lastId = id;
      this.setState({ shouldReload: true });
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

PatientsShow = Connect(
  mapStateToProps
)(PatientsShow);

export default PatientsShow;
