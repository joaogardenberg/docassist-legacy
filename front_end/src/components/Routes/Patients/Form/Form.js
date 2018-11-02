import React, { Component }   from 'react';
import { Field }              from 'redux-form';

class Form extends Component {
  render() {
    return (
      <form>
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
        </div>
      </form>
    );
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

  componentDidUpdate() {
    window.M.updateTextFields();
  }
}

export default Form;
