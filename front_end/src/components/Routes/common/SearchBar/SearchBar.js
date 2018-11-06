import React, { Component } from 'react';
import posed                from 'react-pose';
import { withRouter }       from 'react-router-dom';
import _                    from 'lodash';
import                           './SearchBar.scss';

const INITIAL_STATE = {
  active: false,
  shouldUpdate: true,
  searchChanged: false,
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

  componentDidMount() {
    const { params } = this.props.match;

    this.mapSearchToParams();

    if (params.q) {
      const value = this.treatString(decodeURI(params.q.replace(/\+/g, '%20')));
      this.setState({ value, active: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { params, path }                       = this.props.match;
    const { value, shouldUpdate, searchChanged } = this.state;

    this.mapSearchToParams();

    if (prevProps.match.params.q && prevProps.match.params.q.replace(/\s/g, '+') !== params.q) {
      if (params.q) {
        this.setState({ value: decodeURI(params.q.replace(/\+/g, '%20')), shouldUpdate: false });
      } else {
        this.setState({ value: '' });
      }
    }

    if (prevState.value !== value && (path === '/usuarios' || path === '/pacientes')) {
      if (shouldUpdate) {
        params.q = value;

        let paramsArray = _.map(params, (val, key) => {
          if (val && (key === 'p' || key === 'q') && (searchChanged ? key !== 'p' : true)) {
            return `${key}=${encodeURI(val).replace(/%20/g, '+')}`;
          } else {
            return null;
          }
        });

        paramsArray = paramsArray.filter(i => !!i);

        this.props.history.push(`${path}?${paramsArray.join('&')}`);
      }

      this.props.callback(value);
      this.setState({ shouldUpdate: true, searchChanged: false });
    }
  }

  onSearchBarChange({ target: { value } }) {
    this.setState({ value: this.treatString(value), searchChanged: true });
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
    this.setState({
      ...INITIAL_STATE,
      searchChanged: true
    });
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

  mapSearchToParams() {
    const { location: { search }, match: { params } } = this.props;

    if (search) {
      search
        .substr(1, search.length - 1)
        .split('&')
        .filter(param => param.length > 0)
        .forEach(param => {
          const [ key, value ] = param.split('=');

          if (key === 'q' || key === 'p') {
            params[key] = value;
          }
        });
    }
  }
}

SearchBar = withRouter(SearchBar);

export default SearchBar;
