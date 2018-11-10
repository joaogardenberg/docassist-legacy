import React, { Component } from 'react';
import posed                from 'react-pose';
import                           './SearchBar.scss';

const INITIAL_STATE = {
  active: false,
  value: ''
};

const Container = posed.div({
  closed: {
    transition: { duration: 200 },
    width: '50%'
  },
  open: {
    transition: { duration: 200 },
    width: '100%'
  }

});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  render() {
    const { active } = this.state;

    return (
      <Container
        className={ `search-bar bottom-shadow${active ? ' active' : ''}` }
        data-position="top"
        data-tooltip="Pesquisar usuários"
        pose={ active ? 'open' : 'closed' }
      >
        <label
          className="search-label"
          htmlFor="search"
          onClick={ this.onCloseButtonClick.bind(this) }
        >
          <i className="fas fa-search" />
        </label>
        <input
          id="search"
          className="search-input"
          type="search"
          autoComplete="off"
          value={ this.state.value }
          onChange={ this.onSearchBarChange.bind(this) }
          onFocus={ this.onSearchBarFocus.bind(this) }
          onBlur={ this.onSearchBarBlur.bind(this) }
        />
        <i
          className="close-button fas fa-times"
          onClick={ this.onCloseButtonClick.bind(this) }
        />
      </Container>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;

    if (prevState.value !== value) {
      this.props.callback(value);
    }
  }

  onSearchBarChange({ target: { value } }) {
    this.setState({ value: this.treatString(value) });
  }

  onSearchBarFocus() {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }

  onSearchBarBlur() {
    if (this.state.value === '' && this.state.active) {
      this.setState({ active: false });
    }
  }

  onCloseButtonClick() {
    this.setState(INITIAL_STATE);
  }

  treatString(string) {
    return string
             .toLowerCase()
             .replace(/[áàãâä]/g, 'a')
             .replace(/[éèẽê]/g, 'e')
             .replace(/[íìĩî]/g, 'i')
             .replace(/[óòõôö]/g, 'o')
             .replace(/[úùũûü]/g, 'u')
             .replace(/[ç]/g, 'c')
             .replace(/[ñ]/g, 'n')
             .replace(/[^a-z0-9\s]/g, '');
  }
}

export default SearchBar;
