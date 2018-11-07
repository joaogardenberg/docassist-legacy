import React, { Component }   from 'react';
import { Field }              from 'redux-form';
import { connect as Connect } from 'react-redux';
import * as Datepicker        from '../../../../common/Datepicker';

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
            className="col s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="occupation"
            name="occupation"
            type="text"
            label="Profissão"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="date_of_birth"
            name="date_of_birth"
            type="text"
            label="Data de nascimento"
            className="col l6 s12"
            autoComplete="off"
            reference={ this.dateOfBirthInputRef }
            component={ this.renderField }
          />
          <Field
            id="gender"
            name="gender"
            label="Gênero"
            className="col l6 s12"
            reference={ this.genderSelectRef }
            component={ this.renderSelect }
          >
            <option key="1" value="1">Masculino</option>
            <option key="2" value="2">Feminino</option>
          </Field>
          <Field
            id="marital_status"
            name="marital_status"
            label="Estado civil"
            className="col l6 s12"
            reference={ this.maritalStatusSelectRef }
            component={ this.renderSelect }
          >
            <option key="1" value="1">Solteiro(a)</option>
            <option key="2" value="2">Casado(a)</option>
            <option key="3" value="3">Divorciado(a)</option>
            <option key="4" value="4">Viúvo(a)</option>
          </Field>
          <Field
            id="cpf"
            name="cpf"
            type="text"
            label="CPF"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="rg"
            name="rg"
            type="text"
            label="RG"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="rg_issuing_agency"
            name="rg_issuing_agency"
            type="text"
            label="Órgão expedidor"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="nationality"
            name="nationality"
            type="text"
            label="Nacionalidade"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
          <Field
            id="place_of_birth"
            name="place_of_birth"
            type="text"
            label="Naturalidade"
            className="col l6 s12"
            autoComplete="off"
            component={ this.renderField }
          />
        </div>
      </form>
    );
  }

  renderField(field) {
    const { input, id, type, label, className, disabled, reference } = field;
    const { meta: { touched, active, error } }            = field;
    const errorMessage = touched && !active ? error : '';
    const valid = touched && !active && !errorMessage;

    return (
      <div className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }>
        <input
          { ...input }
          id={ id }
          type={ type }
          ref={ reference }
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

    this.dateOfBirthInputRef = React.createRef();
    this.genderSelectRef = React.createRef();
    this.maritalStatusSelectRef = React.createRef();
    this.dateOfBirthPickerLoaded = false;
    this.genderSelectLoaded = false;
    this.maritalStatusSelectLoaded = false;
  }

  componentDidMount() {
    this.initFormPickers();
    this.initFormSelects();
  }

  componentDidUpdate() {
    this.initFormSelects();
    window.M.updateTextFields();
  }

  onDatepickerOpen() {
    this.fixDateDisplay();
    this.fixYearsSelect();
  }

  onDatepickerSelect() {
    this.fixDateDisplay();
    this.fixYearsSelect();
  }

  onDatepickerDraw() {
    this.fixDateDisplay();
    this.fixYearsSelect();
  }

  initFormPickers() {
    const { dateOfBirthPickerLoaded, dateOfBirthInputRef } = this;
    const { shouldReset }                                  = this.props;

    if (shouldReset || (!dateOfBirthPickerLoaded && dateOfBirthInputRef.current)) {
      window.M.Datepicker.init(dateOfBirthInputRef.current, {
        autoClose: true,
        format: 'dd/mm/yyyy',
        setDefaultDate: true,
        minDate: new Date(new Date().getFullYear() - 150, 1, 1),
        maxDate: new Date(),
        yearRange: [new Date().getFullYear() - 150, new Date().getFullYear()],
        i18n: Datepicker.language(),
        container: document.getElementsByClassName('page-modal-container')[0],
        onOpen: this.onDatepickerOpen.bind(this),
        onSelect: this.onDatepickerSelect.bind(this),
        onDraw: this.onDatepickerDraw.bind(this)
      });

      this.dateOfBirthPickerLoaded = true;
    }
  }

  initFormSelects() {
    const { genderSelectLoaded, maritalStatusSelectLoaded } = this;
    const { genderSelectRef, maritalStatusSelectRef }       = this;
    const { shouldReset }                                   = this.props;

    if (shouldReset || (!genderSelectLoaded && genderSelectRef.current)) {
      window.M.FormSelect.init(genderSelectRef.current);
      this.genderSelectLoaded = true;
    }

    if (shouldReset || (!maritalStatusSelectLoaded && maritalStatusSelectRef.current)) {
      window.M.FormSelect.init(maritalStatusSelectRef.current);
      this.maritalStatusSelectLoaded = true;
    }
  }

  fixDateDisplay() {
    const element = document.querySelector('.datepicker-date-display .date-text');

    if (element) {
      let [ , date ] = element.innerHTML.split(',');

      if (date) {
        let [ first, second ] = date.split(' ').filter(part => !!part);

        if (parseInt(second)) {
          first = Datepicker.getMonthFromMonthShort(first);
          element.innerHTML = `${second} de ${first}`;
        }
      }
    }
  }

  fixYearsSelect() {
    const select = window.$('.selects-container .select-year .datepicker-select');

    if (select) {
      let options = select.find('option');
      options = [].slice.call(options).reverse();
      select.empty();

      window.$.each(options, (i, el) => {
        select.append(window.$(el));
      });

      window.M.FormSelect.init(select);
    }
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

Form = Connect(
  mapStateToProps
)(Form);

export default Form;
