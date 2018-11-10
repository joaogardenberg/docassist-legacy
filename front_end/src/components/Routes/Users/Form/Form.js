import React, { Component }   from 'react';
import { Field }              from 'redux-form';
import { connect as Connect } from 'react-redux';
import _                      from 'lodash';
import * as User              from '../../../../constants/User';

const INITIAL_STATE = {
  showTypeOf: false
}

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
            className={ `col ${showTypeOf ? 'xl3 l6 s12' : 's12'}` }
            reference={ this.typeSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onTypeChange(event) }
          >
            { this.renderTypeOptions() }
          </Field>
          <div className="col xl9 l6 s12" style={{ display: showTypeOf ? 'block' : 'none' }}>
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
          </div>
          <Field
            id="name"
            name="name"
            type="text"
            label="Nome"
            className="col l6 s12"
            autoComplete="off"
            maxLength="100"
            component={ this.renderField }
          />
          <Field
            id="username"
            name="username"
            type="text"
            label="Usuário"
            className="col l6 s12"
            autoComplete="off"
            maxLength="50"
            component={ this.renderField }
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className="col xl3 l6 s12"
            autoComplete="off"
            maxLength="50"
            component={ this.renderField }
          />
          <Field
            id="emailConfirmation"
            name="emailConfirmation"
            type="email"
            label="Confirmação de e-mail"
            className="col xl3 l6 s12"
            autoComplete="off"
            maxLength="50"
            component={ this.renderField }
          />
          <Field
            id="password"
            name="password"
            type="password"
            label="Senha"
            className="col xl3 l6 s12"
            autoComplete="off"
            maxLength="50"
            component={ this.renderField }
          />
          <Field
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            label="Confirmação de senha"
            className="col xl3 l6 s12"
            autoComplete="off"
            maxLength="50"
            component={ this.renderField }
          />
        </div>
      </form>
    );
  }

  renderTypeOptions() {
    return User.TYPES.map((type, index) => {
      const value = User.TYPE_VALUES[index];
      return <option key={ value } value={ value } >{ type }</option>;
    });
  }

  renderDoctorOptions() {
    let users = _.map(this.props.users, user => user).filter(user => user.type === '1');
    return users.map(user => <option key={ user.id } value={ user.id }>{ user.name }</option>);
  }

  renderField(field) {
    const { input, id, type, label, className, disabled, style } = field;
    const { maxLength, meta: { touched, active, error } }        = field;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <input
          { ...input }
          id={ id }
          type={ type }
          maxLength={ maxLength }
          disabled={ disabled }
        />
        <label htmlFor={ id }>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  renderSelect(field) {
    const { input, id, label, className, children, reference }     = field;
    const { disabled, multiple, style }                            = field;
    const { touched, active, error }                               = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
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
    this.updateFields();
  }

  onTypeChange({ target: { options } }) {
    if (options[options.selectedIndex].value === '2' && this.state.showTypeOf === false) {
      this.setState({ showTypeOf: true });
    } else if (options[options.selectedIndex].value !== '2' && this.state.showTypeOf === true) {
      this.setState({ showTypeOf: false });
    }
  }

  initFormSelects() {
    const { typeSelectLoaded, typeOfSelectLoaded, typeSelectRef } = this;
    const { typeOfSelectRef, props: { users, shouldReset } }      = this;

    if (shouldReset || (!typeSelectLoaded && typeSelectRef.current)) {
      window.M.FormSelect.init(typeSelectRef.current);
      this.typeSelectLoaded = true;
    }

    if (shouldReset || (!typeOfSelectLoaded && typeOfSelectRef.current && Object.keys(users).length > 0)) {
      window.M.FormSelect.init(typeOfSelectRef.current);
      this.typeOfSelectLoaded = true;
    }
  }

  updateFields() {
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
