import React, { Component }   from 'react';
import ReactDOM               from 'react-dom';
import { connect as Connect } from 'react-redux';
import { Link }               from 'react-router-dom';
import { fetchUsers }         from '../../../actions';
import _                      from 'lodash';
import Article                from '../common/Article/Article';
import SearchBar              from '../common/SearchBar/SearchBar';
import * as BrowserChecks     from '../../../checks/Browser.js';
import * as DataTable         from '../../../common/DataTable';

class UsersIndex extends Component {
  render() {
    const { users } = this.props;
    let content;

    if (!users || Object.keys(users).length < 1) {
      content = this.emptyJSX();
    } else {
      content = this.tableJSXWith(users);
    }

    return (
      <Article
        uniqueClass="users-index"
        header="Usuários"
        newButtonPath="/usuarios/novo"
        newButtonTooltip="usuário"
      >
        { content }
      </Article>
    );
  }

  emptyJSX() {
    return (
      <p>Não foi encontrado nenhum usuário.</p>
    );
  }

  tableJSXWith(users) {
    const rows = _.map(users, user => {
      const { id, name, username, typeName, imageUrl } = user;
      // const refEdit = React.createRef();
      // const refShow = React.createRef();
      // const refDestroy = React.createRef();

      // this.tooltipRefs.push(...[refShow, refEdit, refDestroy]);

      return (
        <tr
          key={ `user-${id}` }
          // data-position="top"
          // data-tooltip={ `Ver ${name}` }
          // ref={ refShow }
          onClick={ event => this.onUserClick(event, id) }
        >
          <td className="photo">
            <img
              src={ imageUrl ? imageUrl : '' }
              alt={ `Foto de ${name}` }
              onError={ this.onImageError }
            />
          </td>
          <td>{ name }</td>
          <td className="hide-on-med-and-down">{ username }</td>
          <td className="hide-on-small-only">{ typeName }</td>
          <td className="actions">
            <ul>
              <li>
                <Link
                  to={ `/usuarios/${id}/editar` }
                  className="btn-floating btn-small bg-warning waves-effect waves-light"
                  // data-position="left"
                  // data-tooltip="Editar"
                  // ref={ refEdit }
                  onClick={ event => event.stopPropagation() }
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
              </li>
              <li>
                <Link
                  to={ `/usuarios/${id}/remover` }
                  className="btn-floating btn-small bg-error waves-effect waves-light"
                  // data-position="left"
                  // data-tooltip="Remover"
                  // ref={ refDestroy }
                  onClick={ event => event.stopPropagation() }
                >
                  <i className="fas fa-trash-alt" />
                </Link>
              </li>
            </ul>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <SearchBar
          callback={ this.onSearchBarChange.bind(this) }
        />
        <table ref={ this.tableRef }>
          <thead>
            <tr>
              <th className="photo"></th>
              <th>Nome</th>
              <th className="hide-on-med-and-down">Usuário</th>
              <th className="hide-on-small-only">Tipo</th>
              <th className="actions"></th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.tooltipRefs = [];
    this.tableRef    = React.createRef();
    this.lastPage    = 0;
  }

  componentDidMount() {
    const { params } = this.props.match;

    if (Object.keys(this.props.users).length > 0) {
      this.addDataTable();
      // this.initTooltips();
    } else {
      this.props.fetchUsers();
    }

    this.mapSearchToParams();

    if (params.p && this.table) {
      this.table.page(params.p).draw('page');
    }
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.users, nextProps.users)) {
      this.removeDataTable();
      // this.removeTooltips();
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;

    if (!_.isEqual(prevProps.users, this.props.users)) {
      this.addDataTable();
    }

    // this.initTooltips();
    this.mapSearchToParams();

    if (this.table && params.p && parseInt(this.table.page()) !== parseInt(params.p)) {
      this.table.page(parseInt(params.p) - 1).draw('page');
    }
  }

  componentWillUnmount() {
    // this.removeTooltips();
    this.removeDataTable();
  }

  onUserClick(event, id) {
    this.props.history.push(`/usuarios/${id}`);
  }

  onImageError({ target }) {
    target.src = 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png';
  }

  initTooltips() {
    if (!BrowserChecks.hasTouch()) {
      this.tooltipRefs.filter(({ current }) => !!current).forEach(({ current }) => {
        const button = ReactDOM.findDOMNode(current);
        window.M.Tooltip.init(button);
      });
    }
  }

  removeTooltips() {
    if (!BrowserChecks.hasTouch()) {
      this.tooltipRefs.filter(({ current }) => !!current).forEach(({ current }) => {
        const button = ReactDOM.findDOMNode(current);
        const instance = window.M.Tooltip.getInstance(button);

        if (instance) {
          instance.destroy();
        }
      });
    }

    this.tooltipRefs = [];
  }

  addDataTable() {
    const { current } = this.tableRef;

    this.table = window.$(current).DataTable({
      autoWidth: false,
      columnDefs: [{
        targets: [0, 4],
        searchable: false,
        orderable: false
      }],
      destroy: true,
      dom: 't<"row"<"col s12 m12 l6"i><"col s12 m12 l6"p>>',
      language: {
        ...DataTable.language(),
        emptyTable: 'Não há nenhum usuário',
        info: 'Mostrando _START_ - _END_ de _TOTAL_ usuários',
        infoEmpty: 'Mostrando 0 usuários',
        infoFiltered: '(filtrados de um total de _MAX_ usuários)',
        lengthMenu: '_MENU_ usuários por página',
        zeroRecords: 'Não foi encontrado nenhum usuário para esta pesquisa.',
      },
      order: [[1, 'asc']],
      pageLength: 10,
      pagingType: 'simple_numbers',
      drawCallback: this.onTableDraw.bind(this)
    });
  }

  removeDataTable() {
    if (this.table) {
      this.table.destroy();
      this.table = null;
    }
  }

  onTableDraw() {
    const { params, path } = this.props.match;

    if (this.table) {
      params.p = this.table.page() + 1;

      if (params.p !== this.lastPage) {
        let paramsArray = _.map(params, (val, key) => {
          if (val && (key === 'p' || key === 'q') && (key === 'p' ? val > 1 : true)) {
            return `${key}=${encodeURI(val).replace(/%20/g, '+')}`;
          } else {
            return null;
          }
        });

        paramsArray = paramsArray.filter(i => !!i);

        this.lastPage = params.p;
        this.props.history.push(`${path}?${paramsArray.join('&')}`);
      }
    }
  }

  onSearchBarChange(string) {
    const { users } = this.props;

    if (users && Object.keys(users).length > 0) {
      window.$(this.tableRef.current).DataTable().search(string).draw();
    }
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

function mapStateToProps({ users }) {
  return { users };
}

UsersIndex = Connect(
   mapStateToProps,
   { fetchUsers }
)(UsersIndex);

export default UsersIndex;
