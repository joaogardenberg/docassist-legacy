import React, { Component }   from 'react';
import { Field }              from 'redux-form';
import { connect as Connect } from 'react-redux';
import _                      from 'lodash';
import posed                  from 'react-pose';

const INITIAL_STATE = {
  showTypeOf: false
}

const Container = posed.div({
  transition: { duration: 200 },
  inactive: {
    height: 0,
    opacity: 0,
    width: 0
  },
  active: {
    applyAtStart: {
      height: 0,
      opacity: 0,
      width: 0
    },
    height: 'auto',
    opacity: 1,
    width: '100%'
  }
});

class Form extends Component {
  render() {
    const { showTypeOf } = this.state;

    return (
      <form>
        <div className="row">
          <Field
            id="type"
            name="type"
            label="Tipo"
            className="col l6 s12"
            reference={ this.typeSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onTypeChange(event) }
          >
            <option key="1" value="1">Médico(a)</option>
            <option key="2" value="2">Secretário(a)</option>
          </Field>
          <div className="col l6 s12">
            <Container
              style={{ display: showTypeOf ? 'block' : 'none' }}
              pose={ showTypeOf ? 'active' : 'inactive' }
            >
              <Field
                id="typeOf"
                name="typeOf"
                label="Secretário(a) de quem(ns)?"
                reference={ this.typeOfSelectRef }
                multiple={ true }
                format={ value => value || [] }
                component={ this.renderSelect }
              >
                { this.renderDoctorOptions() }
              </Field>
            </Container>
          </div>
        </div>
        <div className="row">
          <Field
            id="name"
            name="name"
            type="text"
            label="Nome"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="username"
            name="username"
            type="text"
            label="Usuário"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="emailConfirmation"
            name="emailConfirmation"
            type="email"
            label="Confirmação de e-mail"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="password"
            name="password"
            type="password"
            label="Senha"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            label="Confirmação de senha"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
        </div>
      </form>
    );
  }

  renderDoctorOptions() {
    let users = _.map(this.props.users, user => user).filter(user => user.type === '1');
    return users.map(user => <option key={ user.id } value={ user.id }>{ user.name }</option>);
  }

  renderField(field) {
    const { input, id, type, label, className, disabled } = field;
    const { meta: { touched, active, error } }            = field;
    const errorMessage = touched && !active ? error : '';
    const valid = touched && !active && !errorMessage;

    return (
      <div className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }>
        <input
          { ...input }
          id={ id }
          type={ type }
          disabled={ disabled }
        />
        <label htmlFor={ id }>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  renderSelect(field) {
    const { input, id, label, className, children, reference }     = field;
    const { disabled, multiple, meta: { touched, active, error } } = field;
    const errorMessage = touched && !active ? error : '';
    const valid = touched && !active && !errorMessage;

    return (
      <div className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }>
        <select
          { ...input }
          id={ id }
          ref={ reference }
          disabled={ disabled }
          multiple={ multiple }
          onChange={ event => { input.onChange(event); input.onBlur(event) } }
        >
          { children }
        </select>
        <label>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.typeSelectRef = React.createRef();
    this.typeSelectLoaded = false;
    this.typeOfSelectRef = React.createRef();
    this.typeOfSelectLoaded = false;
  }

  componentDidMount() {
    this.initFormSelects();
  }

  componentDidUpdate() {
    this.initFormSelects();
    window.M.updateTextFields();
  }

  initFormSelects() {
    let { typeSelectRef, typeOfSelectRef, typeSelectLoaded }  = this;
    let { typeOfSelectLoaded, props: { users } }              = this;

    if (!typeSelectLoaded && typeSelectRef.current) {
      window.M.FormSelect.init(typeSelectRef.current);
      typeSelectLoaded = true;
    }

    if (!typeOfSelectLoaded && typeOfSelectRef.current && Object.keys(users).length > 0) {
      window.M.FormSelect.init(typeOfSelectRef.current);
      typeOfSelectLoaded = true;
    }

    this.updateSelects();
  }

  onTypeChange({ target: { options } }) {
    if (options[options.selectedIndex].value === '2' && this.state.showTypeOf === false) {
      this.setState({ showTypeOf: true });
    } else if (options[options.selectedIndex].value !== '2' && this.state.showTypeOf === true) {
      this.setState({ showTypeOf: false });
    }
  }

  updateSelects() {
    this.onTypeChange({ target: { options: this.typeSelectRef.current.options } });
  }
}

function mapStateToProps({ users }) {
  return { users };
}

Form = Connect(
  mapStateToProps
)(Form);

export default Form;
