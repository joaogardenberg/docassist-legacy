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

function validate(values) {
  const errors = {
    name: validateName(values['name']),
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
    type: '1'
  },
  enableReinitialize: true,
  form: 'PatientsNewForm'
})(PatientsNew);

PatientsNew = Connect(
  null,
  { createPatient }
)(PatientsNew);

export default PatientsNew;
