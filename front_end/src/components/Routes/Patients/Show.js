import React, { Component }   from 'react';
import { connect as Connect } from 'react-redux';

const INITIAL_STATE = {
  patient: {}
}

class PatientsShow extends Component {
  render() {
    const { patient } = this.state;

    if (Object.keys(patient).length < 1) {
      return null;
    }

    return (
      <div className="show">
        <div className="row">
          <div className="col l6 s12">
            <h5>Nome</h5>
            <p>{ patient.name }</p>
          </div>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.patientLoaded = false;
    this.lastId = props.match.params.id;
    this.editTimeout = null;
  }

  componentDidMount() {
    this.loadPatient();
  }

  componentDidUpdate() {
    this.loadPatient();
  }

  componentWillUnmount() {
    clearTimeout(this.editTimeout);
  }

  onEditButtonClick() {
    const { history } = this.props;
    const { patient } = this.state;

    if (Object.keys(patient).length > 0) {
      this.editTimeout = setTimeout(() => history.push(`/pacientes/${patient.id}/editar`), 200);
    }
  }

  onBackButtonClick() {
    this.props.history.goBack();
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

PatientsShow = Connect(
  mapStateToProps
)(PatientsShow);

export default PatientsShow;
