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

  componentDidUpdate() {
    this.props.callback(this.state.value);
  }

  onSearchBarChange({ target: { value } }) {
    this.setState({ value });
  }

  onSearchBarFocus() {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }

  onSearchBarBlur() {
    if (this.state.value === '') {
      this.setState({ active: false });
    }
  }

  onCloseButtonClick() {
    this.setState(INITIAL_STATE);
  }
}

export default SearchBar;
