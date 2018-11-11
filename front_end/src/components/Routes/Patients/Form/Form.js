import React, { Component }   from 'react';
import { Field }              from 'redux-form';
import { connect as Connect } from 'react-redux';
import * as Datepicker        from '../../../../common/Datepicker';
import * as Patient           from '../../../../constants/Patient';
import * as Regex             from '../../../../constants/Regex';
import { cepSearch }          from '../../../../services/apis/Cep';

const INITIAL_STATE = {
  showRgIssuingAgency: false,
  showNationalityOther: false,
  showPlaceOfBirthOther: false,
  shouldResetSelects: false
}

class Form extends Component {
  render() {
    const { showNationalityOther, showPlaceOfBirthOther } = this.state;
    const { showRgIssuingAgency }                         = this.state;

    return (
      <form>
        <h5 className="session">Informações pessoais</h5>
        <div className="row">
          <Field
            id="name"
            name="name"
            type="text"
            label="Nome"
            className="col s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.nameInputRef }
            component={ this.renderField }
          />
          <Field
            id="gender"
            name="gender"
            label="Gênero"
            className="col xl3 l4 m6 s12"
            reference={ this.genderSelectRef }
            component={ this.renderSelect }
          >
            { this.renderGenderOptions() }
          </Field>
          <Field
            id="maritalStatus"
            name="maritalStatus"
            label="Estado civil"
            className="col xl3 l4 m6 s12"
            reference={ this.maritalStatusSelectRef }
            component={ this.renderSelect }
          >
            { this.renderMaritalStatusOptions() }
          </Field>
          <Field
            id="dateOfBirth"
            name="dateOfBirth"
            type="text"
            label="Data de nascimento"
            className="col xl3 l4 m6 s12"
            autoComplete="off"
            reference={ this.dateOfBirthInputRef }
            component={ this.renderField }
          />
          <Field
            id="occupation"
            name="occupation"
            type="text"
            label="Profissão"
            className="col xl3 l8 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.occupationInputRef }
            component={ this.renderField }
          />
          <Field
            id="cpf"
            name="cpf"
            type="text"
            label="CPF"
            className="col xl4 l4 m6 s12"
            autoComplete="off"
            reference={ this.cpfInputRef }
            component={ this.renderField }
          />
          <Field
            id="rg"
            name="rg"
            type="text"
            label="RG"
            className={ showRgIssuingAgency ? 'col xl4 l3 m6 s12' : 'col xl8 l6 m6 s12' }
            autoComplete="off"
            maxLength="50"
            reference={ this.rgInputRef }
            component={ this.renderField }
            onChange={ event => this.onRgChange(event) }
          />
          <Field
            id="rgIssuingAgency"
            name="rgIssuingAgency"
            type="text"
            label="Órgão emissor"
            className="col xl4 l3 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.rgIssuingAgencyInputRef }
            component={ this.renderField }
            style={{ display: showRgIssuingAgency ? 'block' : 'none' }}
          />
          <Field
            id="nationality"
            name="nationality"
            label="Nacionalidade"
            className={ showNationalityOther ? 'col l3 m6 s12' : 'col l6 s12' }
            reference={ this.nationalitySelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onNationalityChange(event) }
          >
            { this.renderNationalityOptions() }
          </Field>
          <Field
            id="nationalityOther"
            name="nationalityOther"
            type="text"
            label="Qual nacionalidade?"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.nationalityOtherInputRef }
            component={ this.renderField }
            style={{ display: showNationalityOther ? 'block' : 'none' }}
          />
          <Field
            id="placeOfBirth"
            name="placeOfBirth"
            label="Naturalidade"
            className={ showPlaceOfBirthOther ? 'col l3 m6 s12' : 'col l6 s12' }
            reference={ this.placeOfBirthSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onPlaceOfBirthChange(event) }
          >
            { this.renderPlaceOfBirthOptions() }
          </Field>
          <Field
            id="placeOfBirthOther"
            name="placeOfBirthOther"
            type="text"
            label="Qual naturalidade?"
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.placeOfBirthOtherInputRef }
            component={ this.renderField }
            style={{ display: showPlaceOfBirthOther ? 'block' : 'none' }}
          />
        </div>
        <h5 className="session">Contato</h5>
        <div className="row">
          <Field
            id="landline"
            name="landline"
            type="text"
            label="Telefone"
            className="col m6 s12"
            autoComplete="off"
            reference={ this.landlineInputRef }
            component={ this.renderField }
          />
          <Field
            id="cellPhone"
            name="cellPhone"
            type="text"
            label="Celular"
            className="col m6 s12"
            autoComplete="off"
            reference={ this.cellPhoneInputRef }
            component={ this.renderField }
          />
          <Field
            id="workPhone"
            name="workPhone"
            type="text"
            label="Trabalho"
            className="col m6 s12"
            autoComplete="off"
            reference={ this.workPhoneInputRef }
            component={ this.renderField }
          />
          <Field
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className="col m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.emailInputRef }
            component={ this.renderField }
          />
        </div>
        <h5 className="session">Endereço</h5>
        <div className="row">
          <Field
            id="cep"
            name="cep"
            type="text"
            label="CEP"
            className="col l4 m6 s12"
            autoComplete="off"
            reference={ this.cepInputRef }
            component={ this.renderField }
            onChange={ event => this.onCepChange(event) }
          />
          <Field
            id="state"
            name="state"
            label="Estado"
            className="col l4 m6 s12"
            reference={ this.stateSelectRef }
            component={ this.renderSelect }
          >
            { this.renderStateOptions() }
          </Field>
          <Field
            id="city"
            name="city"
            type="text"
            label="Cidade"
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.cityInputRef }
            component={ this.renderField }
          />
          <Field
            id="neighborhood"
            name="neighborhood"
            type="text"
            label="Bairro"
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.neighborhoodInputRef }
            component={ this.renderField }
          />
          <Field
            id="address"
            name="address"
            type="text"
            label="Endereço"
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.addressInputRef }
            component={ this.renderField }
          />
          <Field
            id="complement"
            name="complement"
            type="text"
            label="Complemento"
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.complementInputRef }
            component={ this.renderField }
          />
        </div>
        <h5 className="session">Histórico pessoal</h5>
        <div className="row">
        </div>
        <h5 className="session">Hábitos</h5>
        <div className="row">
        </div>
        <h5 className="session">Histórico familiar</h5>
        <div className="row">
        </div>
      </form>
    );
  }

  renderField(field) {
    const { input, id, type, label, className, disabled } = field;
    const { reference, style, maxLength }                 = field;
    const { touched, active, error }                      = field.meta;

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
          ref={ reference }
          maxLength={ maxLength }
          data-length={ maxLength }
          disabled={ disabled }
        />
        <label htmlFor={ id }>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  renderSelect(field) {
    const { input, id, label, className, children, reference } = field;
    const { disabled, multiple, style }                        = field;
    const { touched, active, error }                           = field.meta;

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

  renderGenderOptions() {
    return Patient.GENDERS.map((gender, index) => {
      const value = Patient.GENDER_VALUES[index];
      return <option key={ value } value={ value }>{ gender }</option>;
    });
  }

  renderMaritalStatusOptions() {
    return Patient.MARITAL_STATUSES.map((maritalStatus, index) => {
      const value = Patient.MARITAL_STATUS_VALUES[index];
      return <option key={ value } value={ value }>{ maritalStatus }</option>;
    });
  }

  renderNationalityOptions() {
    return Patient.NATIONALITIES.map((nationality, index) => {
      const value = Patient.NATIONALITY_VALUES[index];
      return <option key={ value } value={ value }>{ nationality }</option>;
    });
  }

  renderPlaceOfBirthOptions() {
    return Patient.STATES.map((state, index) => {
      const value = Patient.STATE_VALUES[index];
      return <option key={ value } value={ value }>{ state }</option>;
    });
  }

  renderStateOptions() {
    return Patient.STATES.map((state, index) => {
      const value = Patient.STATE_VALUES[index];
      return <option key={ value } value={ value }>{ state }</option>;
    });
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.nameInputRef              = React.createRef();
    this.genderSelectRef           = React.createRef();
    this.maritalStatusSelectRef    = React.createRef();
    this.dateOfBirthInputRef       = React.createRef();
    this.occupationInputRef        = React.createRef();
    this.cpfInputRef               = React.createRef();
    this.rgInputRef                = React.createRef();
    this.rgIssuingAgencyInputRef   = React.createRef();
    this.nationalitySelectRef      = React.createRef();
    this.nationalityOtherInputRef  = React.createRef();
    this.placeOfBirthSelectRef     = React.createRef();
    this.placeOfBirthOtherInputRef = React.createRef();
    this.genderSelectLoaded        = false;
    this.maritalStatusSelectLoaded = false;
    this.nationalitySelectLoaded   = false;
    this.placeOfBirthSelectLoaded  = false;

    this.landlineInputRef          = React.createRef();
    this.cellPhoneInputRef         = React.createRef();
    this.workPhoneInputRef         = React.createRef();
    this.emailInputRef             = React.createRef();

    this.cepInputRef               = React.createRef();
    this.stateSelectRef            = React.createRef();
    this.cityInputRef              = React.createRef();
    this.neighborhoodInputRef      = React.createRef();
    this.addressInputRef           = React.createRef();
    this.complementInputRef        = React.createRef();
    this.stateSelectLoaded         = false;
  }

  componentDidMount() {
    this.initFormCounters();
    this.initFormMasks();
    this.initFormPickers();
    this.initFormSelects();
  }

  componentDidUpdate() {
    this.initFormSelects();
    window.M.updateTextFields();
    this.updateFields();

    if (this.state.shouldResetSelects) {
      this.setState({ shouldResetSelects: false });
    }
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

  onNationalityChange({ target: { options } }) {
    if (options[options.selectedIndex].value === 'other' && this.state.showNationalityOther === false) {
      this.setState({ showNationalityOther: true });
    } else if (options[options.selectedIndex].value !== 'other' && this.state.showNationalityOther === true) {
      this.props.resetField('nationalityOther');
      this.setState({ showNationalityOther: false });
    }
  }

  onPlaceOfBirthChange({ target: { options } }) {
    if (options[options.selectedIndex].value === 'other' && this.state.showPlaceOfBirthOther === false) {
      this.setState({ showPlaceOfBirthOther: true });
    } else if (options[options.selectedIndex].value !== 'other' && this.state.showPlaceOfBirthOther === true) {
      this.props.resetField('placeOfBirthOther');
      this.setState({ showPlaceOfBirthOther: false });
    }
  }

  onRgChange({ target: { value } }) {
    if (value && this.state.showRgIssuingAgency === false) {
      this.setState({ showRgIssuingAgency: true });
    } else if (!value && this.state.showRgIssuingAgency === true) {
      this.props.resetField('rgIssuingAgency');
      this.setState({ showRgIssuingAgency: false });
    }
  }

  onCepChange({ target: { value } }) {
    if (value.match(Regex.CEP)) {
      this.disableAddressFields();

      cepSearch(value)
        .then(({ data }) => {
          if (data.erro) {
            throw(new Error('CEP not found'));
          }

          const { bairro, localidade, logradouro, uf } = data;

          this.props.changeFieldValue('state', uf);
          this.props.changeFieldValue('city', localidade);
          this.props.changeFieldValue('neighborhood', bairro);
          this.props.changeFieldValue('address', logradouro);
        })
        .catch(error => {
          this.props.resetField('state');
          this.props.resetField('city');
          this.props.resetField('neighborhood');
          this.props.resetField('address');
        })
        .then(() => {
          this.enableAddressFields();
        });
    }
  }

  initFormCounters() {
    const elements = [
      this.nameInputRef.current,
      this.occupationInputRef.current,
      this.rgInputRef.current,
      this.rgIssuingAgencyInputRef.current,
      this.nationalityOtherInputRef.current,
      this.placeOfBirthOtherInputRef.current,
      this.emailInputRef.current,
      this.cityInputRef.current,
      this.neighborhoodInputRef.current,
      this.addressInputRef.current,
      this.complementInputRef.current
    ];

    elements.forEach(element => {
      if (element) {
        window.M.CharacterCounter.init(element);
      }
    });
  }

  initFormMasks() {
    const elements = [
      {
        element: this.dateOfBirthInputRef.current,
        mask:    '99/99/9999'
      }, {
        element: this.cpfInputRef.current,
        mask:    '999.999.999-99'
      }, {
        element: this.landlineInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.cellPhoneInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.workPhoneInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.cepInputRef.current,
        mask:    '99999-999'
      }
    ];

    elements.forEach(element => {
      if (element.element) {
        window.Inputmask({
          mask: element.mask,
          showMaskOnHover: false
        }).mask(element.element);
      }
    });
  }

  initFormPickers() {
    const { dateOfBirthInputRef } = this;

    if (dateOfBirthInputRef.current) {
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
    }
  }

  initFormSelects() {
    const { genderSelectLoaded, maritalStatusSelectLoaded }     = this;
    const { nationalitySelectLoaded, placeOfBirthSelectLoaded } = this;
    const { stateSelectLoaded }                                 = this;
    const { genderSelectRef, maritalStatusSelectRef }           = this;
    const { nationalitySelectRef, placeOfBirthSelectRef }       = this;
    const { stateSelectRef }                                    = this;
    const { shouldReset }                                       = this.props;
    const { shouldResetSelects }                                = this.state;

    if (shouldReset || shouldResetSelects || (!genderSelectLoaded && genderSelectRef.current)) {
      window.M.FormSelect.init(genderSelectRef.current);
      this.genderSelectLoaded = true;
    }

    if (shouldReset || shouldResetSelects || (!maritalStatusSelectLoaded && maritalStatusSelectRef.current)) {
      window.M.FormSelect.init(maritalStatusSelectRef.current);
      this.maritalStatusSelectLoaded = true;
    }

    if (shouldReset || shouldResetSelects || (!nationalitySelectLoaded && nationalitySelectRef.current)) {
      window.M.FormSelect.init(nationalitySelectRef.current);
      this.nationalitySelectLoaded = true;
    }

    if (shouldReset || shouldResetSelects || (!placeOfBirthSelectLoaded && placeOfBirthSelectRef.current)) {
      window.M.FormSelect.init(placeOfBirthSelectRef.current);
      this.placeOfBirthSelectLoaded = true;
    }

    if (shouldReset || shouldResetSelects || (!stateSelectLoaded && stateSelectRef.current)) {
      window.M.FormSelect.init(stateSelectRef.current);
      this.stateSelectLoaded = true;
    }
  }

  updateFields() {
    this.onRgChange({ target: { value: this.rgInputRef.current.value } });
    this.onNationalityChange({ target: { options: this.nationalitySelectRef.current.options } });
    this.onPlaceOfBirthChange({ target: { options: this.placeOfBirthSelectRef.current.options } });
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

  disableAddressFields() {
    const { cepInputRef, stateSelectRef, cityInputRef } = this;
    const { neighborhoodInputRef, addressInputRef }     = this;

    cepInputRef.current.disabled          = true;
    stateSelectRef.current.disabled       = true;
    cityInputRef.current.disabled         = true;
    neighborhoodInputRef.current.disabled = true;
    addressInputRef.current.disabled      = true;
    this.setState({ shouldResetSelects: true });
  }

  enableAddressFields() {
    const { cepInputRef, stateSelectRef, cityInputRef } = this;
    const { neighborhoodInputRef, addressInputRef }     = this;

    cepInputRef.current.disabled          = false;
    stateSelectRef.current.disabled       = false;
    cityInputRef.current.disabled         = false;
    neighborhoodInputRef.current.disabled = false;
    addressInputRef.current.disabled      = false;
    this.setState({ shouldResetSelects: true });
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

Form = Connect(
  mapStateToProps
)(Form);

export default Form;
